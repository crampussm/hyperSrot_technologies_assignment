import React, { useEffect, useState } from 'react';
import { LayoutTemplate, Hexagon, Plus, Sun, Moon } from 'lucide-react';
import { GetContext } from '../context/ThemeProvider';

function SideNav() {
    let Key = 0;
    const { toggleTheme, theme, selectedSpace, setSelectedSpace, popCreateSpace, spaces, getSpaces } = GetContext(); 
    const selectSpace = (spaceToSelect)=>{
        setSelectedSpace(spaceToSelect);
    }
    useEffect(()=>{
        getSpaces();
    }, [])
  return (
    <div className={`${theme === 'dark' ? 'bg-tmpBlack border-gray-800' : 'bg-blue-50'}  border-r-2 w-[18%] h-[100vh]`}>
        <div className="logo-section w-full py-4 px-4">
            <img className='w-[80%]' src="./images/tm_logo.png" alt="" />
        </div>
        <div className="space-item flex flex-col items-center mt-10 h-[60vh] mb-5">
            <div className={`myspaceIcon flex w-[80%] px-5 py-4  justify-around ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>
                <LayoutTemplate className='w-[40%] rotate-90'/>
                <span className='font-tmpfont font-semibold flex items-start w-[60%]'>My Space</span>
            </div>
            <div className='w-full flex flex-col items-center overflow-y-scroll h-full'>
                {
                    spaces.map((space)=>{
                        return  <div key={Key++} className={`myspaceIcon flex w-[80%] justify-around px-5 py-4 rounded-3xl cursor-pointer ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'} ${selectedSpace === space.spacename && theme === 'dark' ? 'bg-tmplightBlack text-tmpBlue' : 'text-gray-50'} ${selectedSpace === space.spacename && theme === 'light' ? 'bg-blue-200 text-tmpBlue' : 'text-gray-50'}`} onClick={ e => selectSpace(space.spacename) }>
                                    <Hexagon className={`w-[40%] ${selectedSpace === space.spacename ? 'fill-tmpBlue' : ''}`}/>
                                    <span className='font-tmpfont font-semibold flex items-start w-[60%]'>{space.spacename}</span>
                                </div>
                    })
                }
            </div>
        </div>
        <div className='flex flex-col items-center my-2'>
            <div className={`flex w-[80%] justify-around rounded-3xl  px-5 py-4 font-semibold cursor-pointer ${theme === 'dark' ? 'text-gray-50 bg-tmplightBlack' : 'text-gray-600 bg-blue-200'}`} onClick={popCreateSpace}>
                <Plus/>
                <p>Create Space</p>
            </div>
            <div className='flex justify-around items-center w-[90%] my-4'>
                <p className={`text-gray-50 text-sm font-semibold ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>Light</p>
                <div className={`rounded-3xl px-1 py-1 flex justify-between w-[40%] ${theme === 'dark' ? 'bg-tmplightBlack' : 'bg-gray-200'} `}>
                    <div className={`${theme === 'light' ? 'bg-tmpBlue' : ''} w-fit rounded-full p-2 flex justify-center items-center cursor-pointer`} onClick={e => toggleTheme('light')}>
                        <Sun className={`${theme === 'light' ? 'text-white' : 'text-gray-400'} `} />
                    </div>
                    <div className={`${theme === 'dark' ? 'bg-tmpBlue' : ''} w-fit rounded-full p-2 flex justify-center items-center cursor-pointer`} onClick={e => toggleTheme('dark')}>
                        <Moon className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`} />
                    </div>
                </div>
                <p  className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>Dark</p>
            </div>
        </div>
    </div>
  )
}

export default SideNav