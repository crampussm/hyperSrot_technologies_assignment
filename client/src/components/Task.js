import React, { useState } from 'react';
import { Flag, Ellipsis } from 'lucide-react';
import {GetContext} from '../context/ThemeProvider';

function Task(props) {
    const { theme, popEditTask, setSelectedTask, popDeleteTask } = GetContext(); 
    const [taskActions, setTaskActions] = useState(false);
    const priorityColorMap = new Map([
        ['P0', 'bg-green-200 text-green-950'],
        ['P1', 'bg-yellow-200 text-yellow-600'],
        ['P2', 'bg-red-300 text-red-800']
    ]);
    const handleTaskActionPop = ()=> {
        if(taskActions){
            setTaskActions(false);
        }else{
            setTaskActions(true);
        }
        setSelectedTask(props.task);
    }
    const callEditTaskPop = () => {
        setTaskActions(false);
        popEditTask();
    }
    const callDeleteTaskPop = () => {
        setTaskActions(false);
        popDeleteTask();
    }
  return (
    <div className={`rounded-md my-4 px-4 py-2 ${theme === 'dark' ? 'bg-tmpBlack' : 'bg-blue-50 border-2'}`} style={{boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"}}>
        <div className="activity flex justify-between items-center my-2">
            <span className={`rounded-md flex justify-evenly items-center p-1 ${priorityColorMap.get(props.task.priority)}`}>
                <Flag className='size-3'/>
                <p className='text-xs mx-1'>{props.task.priority}</p>
            </span>
            <span className={` flex items-center ${theme === 'dark' ? 'text-gray-50' : 'text-gray-800'}`}>
                <Ellipsis className='size-5 cursor-pointer' name={props.task.taskname}  onClick={handleTaskActionPop}/>
                {
                    taskActions &&
                    <div className={`font-tmpfont absolute mt-[5rem] py-2 rounded-md ${ props.task.status === 'Deffered' ? 'right-4' : ''} ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'text-gray-800 bg-blue-200'}`}>
                        <ul className='flex flex-col w-full'>
                            <li className={`cursor-pointer px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={callEditTaskPop}>Edit</li>
                            {
                                props.task.status !== 'Completed' &&
                                <li className={`cursor-pointer px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={callDeleteTaskPop}>Delete</li>
                            }
                        </ul>
                    </div>
                }
            </span>
        </div>
        
        <div className={`headanddes font-tmpfont py-2 border-b-2 ${theme === 'dark' ? 'border-gray-800' : 'border-blue-200'}`}>
            <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-50' : 'text-gray-800'}`}>{props.task.taskname}</h2>
            <p className={`text-sm my-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{props.task.description}</p>
        </div>
        <div className='status flex justify-between items-center my-2'>
            <span className={`assignee font-tmpfont text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>@{props.task.assignees}</p>
            </span>
            <span className={`  rounded-md text-sm px-4 py-1 font-semibold font-tmpfont cursor-pointer ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'bg-blue-200 text-gray-800'}`}>
                {props.task.status === 'Pending' ? 'Assign' : props.task.status}
            </span>
        </div>
        <div className={`w-full flex justify-between items-center py-2 border-t-2 ${theme === 'dark' ? 'border-gray-800' : 'border-blue-200'}`}>
            <span className='text-xs text-gray-600'>Due Date:</span>
            <span className='text-xs text-gray-600'>{props.task.endDate}</span>
        </div>
    </div>
  )
}

export default Task