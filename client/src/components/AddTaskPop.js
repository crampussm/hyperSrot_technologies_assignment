import React, { useState } from 'react';
import { GetContext } from '../context/ThemeProvider';
import { Plus, ChevronDown } from 'lucide-react';

function AddTaskPop() {
    const { theme, popAddTask, createTask, taskNameErrMsg } = GetContext();
    const [priorityDropdown, setPriorityDropdown] = useState(false);
    const [statusDropdown, setStatusDropdown] = useState(false);
    const [taskDetails, setTaskDetails] = useState({taskname: "", description: "", assignees: "", priority: "P0", status: "Pending", endDate: ""});
    const onchange = (e)=> {
        setTaskDetails({...taskDetails, [e.target.name]: e.target.value});
    }
    const setPriority = (priorityValue)=> {
        setPriorityDropdown(false);
        setTaskDetails({...taskDetails, priority: priorityValue});
    }
    const setStatus = (statusValue) => {
        setStatusDropdown(false);
        setTaskDetails({...taskDetails, status: statusValue});
    }
    const handleStatusDropdown = () => {
        if(statusDropdown){
            setStatusDropdown(false);
        }else{
            setStatusDropdown(true);
        }
    }
    const handlePriorityDropdown = () => {
        if(priorityDropdown){
            setPriorityDropdown(false);
        }else{
            setPriorityDropdown(true);
        }
    }
    const callCreateTask = (e)=>{
        e.preventDefault();
        createTask(taskDetails);
    }
  return (
    <div className={`z-10 absolute top-16 right-96 w-[40%] rounded-md flex flex-col items-center ${theme === 'dark' ? 'bg-tmpBlack' : 'bg-blue-50'}`} style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}>
        <div className='w-full flex justify-end p-2'>
            <Plus className={`rotate-45 text-gray-50 cursor-pointer ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} onClick={popAddTask}/>
        </div>
        <form action="" className='w-full px-20 py-14' onSubmit={callCreateTask}>
            <div className='flex flex-col mt-2'>
                <label className={` my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} htmlFor="spacename-create">Task name</label>
                <input type="text" id='spacename-create' className={` px-2 py-1 rounded-md font-tmpfont border-2 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50 border-gray-600' : 'bg-white text-gray-600 border-gray-300'}`} name='taskname' value={taskDetails.taskname} onChange={onchange} required/>
                <span className='text-red-600 text-xs font-semibold my-1 mx-2'>{taskNameErrMsg}</span>
            </div>
            <div className='flex flex-col mt-2'>
                <label className={` my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} htmlFor="spacename-create">Task description</label>
                <input type="text" id='spacename-create' className={` px-2 py-1 rounded-md font-tmpfont border-2 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50 border-gray-600' : 'bg-white text-gray-600 border-gray-300'}`} name='description' value={taskDetails.description} onChange={onchange} required/>
            </div>
            <div className='flex flex-col mt-2'>
                <label className={` my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} htmlFor="spacename-create">Task assignees</label>
                <input type="text" id='spacename-create' className={` px-2 py-1 rounded-md font-tmpfont border-2 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50 border-gray-600' : 'bg-white text-gray-600 border-gray-300'}`} name='assignees' value={taskDetails.assignees} onChange={onchange} required/>
            </div>
            <div className='flex justify-between mt-4'>
                <div className='flex flex-col items-center'>
                    <p className='text-gray-50 font-tmpfont my-1'>Priority</p>
                    <span className={`w-fit font-tmpfont px-4 py-1 rounded-md flex items-center justify-center cursor-pointer ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'bg-blue-200 text-gray-800'}`} onClick={handlePriorityDropdown}>
                        {taskDetails.priority}
                        <ChevronDown className={`size-4 mx-2 ${priorityDropdown ? 'rotate-180' : ''}`}/>
                    </span>
                    {
                        priorityDropdown &&
                        <div className={`absolute rounded-md w-[13.3%] py-1 bottom-36 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'bg-blue-200 text-gray-800'}`}>
                            <ul className='w-full'>
                                <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setPriority('P0')}>P0</li>
                                <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setPriority('P1')}>P1</li>
                                <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setPriority('P2')}>P2</li>
                            </ul>
                        </div>
                    }
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-gray-50 font-tmpfont my-1'>Status</p>
                    <span className={` w-fit font-tmpfont px-4 py-1 rounded-md flex items-center justify-center cursor-pointer ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'bg-blue-200 text-gray-800'}`} onClick={handleStatusDropdown}>
                        {taskDetails.status}
                        <ChevronDown className={`size-4 mx-2 ${statusDropdown ? 'rotate-180' : ''}`}/>
                    </span>
                    {
                        statusDropdown &&
                        <div className={`absolute rounded-md w-[20%] py-1 bottom-24 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'bg-blue-200 text-gray-800'}`}>
                            <ul className='w-full'>
                                <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setStatus('Pending')}>Pending</li>
                                <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setStatus('In Progress')}>In Progress</li>
                                <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setStatus('Completed')}>Completed</li>
                                <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setStatus('Deployed')}>Deployed</li>
                                <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setStatus('Deffered')}>Deffered</li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="deadline" className={` my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>Task Deadline</label>
                <input type="date" className={`cursor-pointer px-2 py-1 rounded-md font-tmpfont border-2 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50 border-gray-600' : 'bg-white text-gray-600 border-gray-300'}`} name='endDate' value={taskDetails.endDate} onChange={onchange} required/>
            </div>
            <div className='flex justify-center items-center mt-10'>
                <button className='text-white bg-tmpBlue px-6 py-2 rounded-3xl font-tmpfont'>Create</button>
            </div>
        </form>
    </div>
  )
}

export default AddTaskPop