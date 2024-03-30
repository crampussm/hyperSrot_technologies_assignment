import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';
import Topnav from './Topnav';
import CreateSpacePop from './CreateSpacePop';
import { GetContext } from '../context/ThemeProvider';
import { Plus, Ellipsis } from 'lucide-react';
import TaskList from './TaskList';
import AddTaskPop from './AddTaskPop';
import EditTaskPop from './EditTaskPop';
import DeleteTaskPop from './DeleteTaskPop';
import FilterPop from './FilterPop';

function Dashboard() {
  const { createSpacePop, selectedSpace, theme, addTaskPop, popAddTask, editTaskPop, deleteTaskPop, filterPop, spaceActions, popSpaceActions, deleteSpace } = GetContext();
  const navigate = useNavigate();
  const callDeleteSpace = () => {
    console.log('selected spacename - ', selectedSpace[0]);
    deleteSpace(selectedSpace[0]);
  }
  useEffect(()=>{
    const authToken = localStorage.getItem('taskmanager-authtoken');
    if(!authToken){
      navigate('/');
    }
  }, []);
  return (
    <div className='w-full'>
      <SideNav/>
      <Topnav/>
      {
        createSpacePop &&
        <CreateSpacePop/>
      }
      <div className="tasks-board w-[82%] absolute right-0 top-20">
        {
            selectedSpace !== '' &&
            <>
              <div className="upper w-full flex items-center justify-between px-4">
                <span className={`cursor-pointer ${theme === 'dark' ? 'text-gray-50' : 'text-gray-800'}`} onClick={popSpaceActions}>
                  <Ellipsis/>
                </span>
                {
                    spaceActions &&
                    <div className={`font-tmpfont absolute mt-[4rem] py-2 rounded-md ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'bg-blue-200 text-gray-800'}`}>
                        <ul className='flex flex-col w-full'>
                            <li className={`cursor-pointer px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={callDeleteSpace}>Delete</li>
                        </ul>
                    </div>
                }
                <span className={`w-[15%] flex items-center justify-around rounded-md py-2 px-4 cursor-pointer text-gray-50 ${theme === 'dark' ? 'bg-tmplightBlack' : 'bg-tmpBlue'}`} onClick={popAddTask}>
                  <Plus/>
                  <p>Add new task</p>
                </span>
              </div>
              <div className="lower w-full flex mt-10 justify-center">
                <TaskList categoty={'Pending'}/>
                <TaskList categoty={'In Progress'}/>
                <TaskList categoty={'Completed'}/>
                <TaskList categoty={'Deployed'}/>
                <TaskList categoty={'Deffered'}/>
              </div>
            </>
        }
      </div>
      {
        addTaskPop &&
        <AddTaskPop/>
      }
      {
        editTaskPop &&
        <EditTaskPop/>
      }
      {
        deleteTaskPop &&
        <DeleteTaskPop/>
      }
      {
        filterPop &&
        <FilterPop/>
      }
    </div>
  )
}

export default Dashboard