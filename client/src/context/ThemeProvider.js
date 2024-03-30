import React, { createContext, useContext, useEffect, useState} from "react";

const AppContext = createContext(null);

export const GetContext = () => {
  const themeContext = useContext(AppContext);
  return themeContext;
};

export const AppProvider = (props) => {
  const priorityValueMap = new Map([
    ['P0', 0],
    ['P1', 1],
    ['P2', 2]
  ]);
  const authToken = localStorage.getItem('taskmanager-authtoken');
  const [createSpacePop, setCreateSpacePop] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState('');
  const [addTaskPop, setAddTaskPop] = useState(false);
  const [editTaskPop, setEditTaskPop] = useState(false);
  const [deleteTaskPop, setDeleteTaskPop] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [theme, setTheme] = useState();
  const [filterPop, setFilterPop] = useState(false);
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState({priority: "Priority", assignee: "", startDate: "", endDate: ""});
  const [isFiltered, setIsFiltered] = useState(false);
  const [spaceActions, setSpaceActions] = useState(false);
  const [taskNameErrMsg, settaskNameErrMsg] = useState('');
  
  const popCreateSpace = () => {
    if(createSpacePop){
      setCreateSpacePop(false);
    }else{
      setCreateSpacePop(true);
    }
  }
  const popAddTask = () => {
    if(addTaskPop){
      setAddTaskPop(false);
      settaskNameErrMsg('');
    }else{
      setAddTaskPop(true);
    }
  }
  const popEditTask = ()=> {
    if(editTaskPop){
      setEditTaskPop(false);
    }else{
      setEditTaskPop(true);
    }
  }
  const popDeleteTask = () => {
    if(deleteTaskPop){
      setDeleteTaskPop(false);
    }else{
      setDeleteTaskPop(true);
    }
  }
  const popFilter = () => {
    if(filterPop){
      setFilterPop(false);
    }else{
      setFilterPop(true);
    }
  }
  const popSpaceActions = () => {
      if(spaceActions){
        setSpaceActions(false);
      }else{
        setSpaceActions(true);
      }
  }
  const toggleTheme = (mode)=>{
    console.log(mode);
    setTheme(mode);
    sessionStorage.setItem('tmp-theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }
  const sortByPriority = () => {
    return tasks.sort((a, b) => priorityValueMap.get(a.priority) - priorityValueMap.get(b.priority));
  }
  const toggleSort = () => {
    if(sort){
      setSort(false);
    }else{
      setSort(true);
    }
  }
  const applyFilters = () => {
    if(sort){
      let sortedTask = sortByPriority();
      setTasks(sortedTask);
    }
    setIsFiltered(true);
    setFilterPop(false);
  }
  const removeFilter = () => {
    setIsFiltered(false);
  }
  const getSpaces = async()=>{
      const response = await fetch(`http://localhost:5000/getallSpaces`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              'taskmanager-authtoken': authToken,
          }
      });
      let json = await response.json();
      if(json.success){
          console.log("spaces fetched");
          let recievedSpaces = [];
          for(let reqSpace of json.requiredSpaces){
              recievedSpaces.push(reqSpace);
          }
          setSpaces(recievedSpaces);
      }else{
          console.log('failed to fetch spaces');
      }
  }
  const createSpace = async(spacename) => {
      const response = await fetch(`http://localhost:5000/createSpace`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              'taskmanager-authtoken': authToken,
          },
          body: JSON.stringify({spacename: spacename}),
      });
      let json = await response.json();
      if(json.success){
          console.log("space created");
          let recievedSpaces = [];
          for(let requiredSpace of json.requiredSpaces){
              recievedSpaces.push(requiredSpace);
          }
          setSpaces(recievedSpaces);
          setCreateSpacePop(false);
      }else{
          console.log('failed to create space');
      }
  }
  const getAllTasks = async()=>{
      const response = await fetch(`http://localhost:5000/getallTasks/${selectedSpace[0]}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              'taskmanager-authtoken': authToken,
          }
      });
      let json = await response.json();
      console.log(json);
      if(json.success){
          console.log("tasks fetched");
          let recievedTasks = [];
          for(let reqTask  of json.newtasks){
              recievedTasks.push(reqTask);
          }
          setTasks(recievedTasks);
      }else{
          console.log('failed to fetch tasks');
      }
  }
  const createTask = async(taskDetails)=> {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    const response = await fetch(`http://localhost:5000/createTask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'taskmanager-authtoken': authToken,
        },
        body: JSON.stringify({
          taskname: taskDetails.taskname,
          taskSpace: selectedSpace[0],
          description: taskDetails.description,
          assignees: taskDetails.assignees,
          priority: taskDetails.priority,
          status: taskDetails.status,
          startDate: currentDate,
          endDate: taskDetails.endDate
        }),
    });
    let json = await response.json();
    console.log(selectedSpace[0]);
    console.log(json);
    if(json.success){
        console.log("task created");
        let recievedTasks = [];
        for(let newTask of json.newtasks){
          recievedTasks.push(newTask);
        }
        setTasks(recievedTasks);
        setAddTaskPop(false);
    }else{
        console.log('failed to create task');
        settaskNameErrMsg(json.error);
    }
  }
  const updateTask = async(taskDetails) => {
    const response = await fetch(`http://localhost:5000/updateTask/${selectedTask.taskid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'taskmanager-authtoken': authToken,
        },
        body: JSON.stringify({
          priority: taskDetails.priority,
          status: taskDetails.status,
        }),
    });
    let json = await response.json();
    console.log(json);
    if(json.success){
        console.log("task created");
        let recievedTasks = [];
        for(let task of json.tasks){
          recievedTasks.push(task);
        }
        setTasks(recievedTasks);
        setEditTaskPop(false);
    }else{
        console.log('failed to create task');
    }
  }
  const deleteTask = async() => {
    const response = await fetch(`http://localhost:5000/deleteTask/${selectedTask.taskid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'taskmanager-authtoken': authToken,
        },
    });
    let json = await response.json();
    console.log(json);
    if(json.success){
        console.log("task created");
        let recievedTasks = [];
        for(let task of json.tasks){
          recievedTasks.push(task);
        }
        setTasks(recievedTasks);
        setDeleteTaskPop(false);
    }else{
        console.log('failed to create task');
    }
  }
  const deleteSpace = async(givenSpaceName) => {
    const response = await fetch(`http://localhost:5000/deleteSpace`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'taskmanager-authtoken': authToken,
        },
        body: JSON.stringify({spacename: givenSpaceName}),
    });
    let json = await response.json();
    console.log(json);
    if(json.success){
        console.log("task created");
        let recievedSpaces = [];
        for(let space of json.spaces){
          recievedSpaces.push(space);
        }
        setSpaces(recievedSpaces);
        setSpaceActions(false);
        setSelectedSpace('');
    }else{
        console.log('failed to create task');
    }
  }
  useEffect(()=>{
    const theme = sessionStorage.getItem('tmp-theme');
    setTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [])
  return (
    <AppContext.Provider value={{toggleTheme, theme, selectedSpace, setSelectedSpace, createSpacePop, popCreateSpace, spaces, getSpaces, createSpace, popAddTask, addTaskPop, getAllTasks, tasks, createTask, editTaskPop, popEditTask, selectedTask, setSelectedTask, updateTask, deleteTaskPop, popDeleteTask, deleteTask, filterPop, popFilter, toggleSort, sort, applyFilters, filter, setFilter, isFiltered, removeFilter, spaceActions, popSpaceActions, deleteSpace, taskNameErrMsg}}>
      {props.children}
    </AppContext.Provider>
  );
};
