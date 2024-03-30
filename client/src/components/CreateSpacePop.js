import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {GetContext} from '../context/ThemeProvider';

function CreateSpacePop() {
    const {popCreateSpace, theme, createSpace} = GetContext();
    const [space, setSpace] = useState({spacename: ""});
    const onchange = (e) => {
        setSpace({...space, spacename: [e.target.value]});
    }
    const callCreateSpace = (e) => {
        e.preventDefault();
        createSpace(space.spacename);
    }
  return (
    <div className={`z-10 absolute top-52 right-96 w-[40%] rounded-md flex flex-col items-center ${theme === 'dark' ? 'bg-tmpBlack' : 'bg-blue-50'}`} style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}>
        <div className='w-full flex justify-end p-2'>
            <Plus className={`rotate-45 text-gray-50 cursor-pointer ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} onClick={popCreateSpace}/>
        </div>
        <form action="" className='w-full px-20 py-14' onSubmit={callCreateSpace}>
            <div className='flex flex-col'>
                <label className={` my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} htmlFor="spacename-create">Space Name</label>
                <input type="text" id='spacename-create' className={` px-2 py-1 rounded-md font-tmpfont border-2 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50 border-gray-600' : 'bg-white text-gray-600 border-gray-300'}`} value={space.spacename} onChange={onchange}/>
            </div>
            <div className='flex justify-center items-center mt-10'>
                <button className='text-white bg-tmpBlue px-6 py-2 rounded-3xl font-tmpfont'>Create</button>
            </div>
        </form>
    </div>
  )
}

export default CreateSpacePop