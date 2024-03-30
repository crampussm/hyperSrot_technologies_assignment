import React from 'react';
import { Plus} from 'lucide-react';
import { GetContext } from '../context/ThemeProvider';

function DeleteTaskPop(){
    const { theme, selectedTask, popDeleteTask, deleteTask } = GetContext();
    const callDeleteTask = (e)=> {
        e.preventDefault();
        deleteTask();
    }
  return (
    <div className={`z-10 absolute top-36 right-96 w-[30%] rounded-md flex flex-col items-center ${theme === 'dark' ? 'bg-tmpBlack' : 'bg-blue-50'}`} style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}>
        <div className='w-full flex justify-end p-2'>
            <Plus className={`rotate-45 text-gray-50 cursor-pointer ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} onClick={popDeleteTask}/>
        </div>
        <div className='w-full flex flex-col items-center my-4'>
            <p className={`text-lg my-2 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-800'}`}>Do you want to delete this task ?</p>
            <p className={`text-sm my-2 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-800'}`}>"{selectedTask.taskname}"</p>
            <div className='flex w-[50%] justify-around items-center my-4'>
                <button className='text-white bg-tmpBlue px-4 py-2 rounded-3xl font-tmpfont' onClick={popDeleteTask}>Cancel</button>
                <button className='text-white bg-tmpBlue px-4 py-2 rounded-3xl font-tmpfont' onClick={callDeleteTask}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteTaskPop