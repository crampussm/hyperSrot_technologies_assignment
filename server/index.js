const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const getUser = require('./middleware/getuser');

const PORT = 5000;
const JWT_SECRET = "secrettosign";
let tasks = [];
let spaces = [];
let users = [];
var GLOBAL_ID = 0;

// function to get task by task id
const getTask = (taskid)=>{
    for(let task of tasks){
        if(task.taskid == taskid){
            return task;
        }
    }
}

// function to get space by spacename
const getSpace = (spacename)=>{
    for(let space of spaces){
        if(space.spacename == spacename){
            return space;
        }
    }
}

// function to verify if the task bleongs to a specific user and space
const verifyTaskname = (taskname, username, spacename)=>{
    for(let task of tasks){
        if(task.taskname == taskname && task.username == username && task.taskSpace == spacename){
            return false;
        }
    }
    return true;
}
const app = express();
app.use(express.json());
app.use(cors());

// Login method
app.post('/createorlogin', (req, res)=>{
    let success = false;
    try {
        const {username} = req.body;
        if(users.indexOf(username)==-1){
            users.push(username);
        }    
        const data = {
            user:{
                id: username
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({success, authToken});
    } catch (error) {
        console.log(error);
    }
});

// Method to create task
app.post('/createTask', getUser, (req, res)=>{
    let success = false;
    try {
        const {taskSpace, taskname, description, assignees, priority, status, startDate, endDate} = req.body;
        if(!verifyTaskname(taskname, req.username, taskSpace)){
            return res.send({success, error: "duplicate task name not allowed"});
        }
        let space = getSpace(taskSpace);
        if(!space){
            return res.send({success, error: "space not found"});
        }
        if(space.userId != req.id){
            return res.send({success, error: "access denied"});
        }
        tasks.push({
            taskid: GLOBAL_ID++,
            taskSpace,
            taskname,
            description,
            username: req.username,
            assignees,
            priority,
            status,
            startDate,
            endDate,
        });
        let newtasks = tasks.filter((task)=>{
            return task.username == req.username;
        })
        success = true;
        res.json({success, newtasks});
    } catch (error) {
        console.log(error);
    }
});

// Method to update tasks
app.put('/updateTask/:taskid', getUser, (req, res)=>{
    let success = false;
    try {
        let task = getTask(req.params.taskid);
        if(!task){
            return res.send({success, error: "task not found"});
        }
        if(task.username != req.username){
            return res.send({success, error: "access denied"});
        }
        const {priority, status} = req.body;
        if(priority){ task.priority = priority }
        if(status){ task.status = status }
        success = true;
        res.json({success, tasks});
    } catch (error) {
        console.log(error);
    }
});

// Method to delete task
app.delete('/deleteTask/:taskid', getUser, (req, res)=>{
    let success = false;
    try {
        let task = getTask(req.params.taskid);
        if(!task){
            return res.send({success, error: "task not found"});
        }
        if(task.username != req.username){
            return res.send({success, error: "access denied"});
        }
        if(task.status == 'Completed'){
            return res.send({success, error: "Completed task can not be deleted"});
        }
        let index = tasks.indexOf(task);
        if(index>-1){
            tasks.splice(index, 1);
        }
        success = true;
        res.json({success, tasks});
    } catch (error) {
        console.log(error);
    }
});

// Method to get all tasks
app.get('/getallTasks/:spacename', getUser, (req, res)=>{
    let success = false;
    try {
        // const {spacename} = req.body
        const spacename = req.params.spacename;
        success = true;
        let newtasks = tasks.filter((task)=>{
            return task.taskSpace == spacename;
        }).filter((task)=>{
            return task.username == req.username;
        })
        res.json({success, newtasks});
    } catch (error) {
        console.log(error);
    }
});

// Method to create Space
app.post('/createSpace', getUser, (req, res)=>{
    let success = false;
    try {
        const {spacename} = req.body;
        if(spaces.includes(spacename)){
            return res.send({success, error: "duplicate space name not allowed"});
        }
        const userName = req.username;
        spaces.push({spacename, userName});
        let requiredSpaces = [];
        for(let space of spaces){
            if(space.userName == req.username){
                requiredSpaces.push(space);
            }
        }
        success = true;
        res.json({requiredSpaces, success});
    } catch (error) {
        console.log(error);
    }
});

// Method to get all spaces
app.get('/getallSpaces', getUser, (req, res)=>{
    let success = false;
    try {
        let requiredSpaces = [];
        for(let space of spaces){
            if(space.userName == req.username){
                requiredSpaces.push(space);
            }
        }
        success = true;
        res.json({success, requiredSpaces});
    } catch (error) {
        console.log(error);
    }
});

// Method to delete space
app.delete('/deleteSpace', (req, res)=>{
    let success = false;
    try {
        const {spacename} = req.body;
        let space = getSpace(spacename);
        if(!space){
            return res.send({success, error: "space not found"});
        }
        if(space.username != req.username){
            return res.send({success, error: "access denied"});
        }
        for(let task of tasks){
            if(task.taskSpace == spacename){
                if(tasks.indexOf(task)>-1){
                    tasks.splice(tasks.indexOf(task), 1);
                }
            }
        }
        if(spaces.indexOf(space)>-1){
            spaces.splice(spaces.indexOf(space), 1);
        }
        success = true;
        res.json({success, spaces, tasks});
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, ()=>{
    console.log(`Server Listening on PORT: ${PORT}`);
});