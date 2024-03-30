import React, {useState} from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { GetContext } from '../context/ThemeProvider';

function FilterPop() {
    const { theme, popFilter, toggleSort, applyFilters, filter, setFilter, isFiltered, removeFilter, sort } = GetContext();
    const [priorityDropdown, setPriorityDropdown] = useState(false);
    const handlePriorityDropdown = () => {
        if(priorityDropdown){
            setPriorityDropdown(false);
        }else{
            setPriorityDropdown(true);
        }
    }
    const setPriority = (priorityValue)=> {
        setPriorityDropdown(false);
        setFilter({...filter, priority: priorityValue});
    }
    const onchange = (e)=> {
        setFilter({...filter, [e.target.name]: e.target.value});
    }
    const sortOnchange = () => {
        toggleSort();
    }
    const callApplyFilter = (e) => {
        e.preventDefault();
        applyFilters();
    }
  return (
    <div className={`z-10 absolute top-16 right-96 w-[40%] rounded-md flex flex-col items-center ${theme === 'dark' ? 'bg-tmpBlack' : 'bg-blue-50'}`} style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}>
        <div className='w-full flex justify-end p-2'>
            <Plus className={`rotate-45 text-gray-50 cursor-pointer ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} onClick={popFilter}/>
        </div>
        <form action="" className='w-full flex items-center flex-col' onSubmit={callApplyFilter}>
            <div className='flex items-center justify-start w-[80%] my-1'>
                <h2 className='font-bold text-gray-50'>Filters</h2>
            </div>
            <div className='filter-area flex flex-col w-[80%] items-center py-4'>
                <div className='flex justify-between items-center w-[75%]'>
                    <div className='flex flex-col mt-2'>
                        <label className={` my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} htmlFor="spacename-create">Task assignees</label>
                        <input type="text" id='spacename-create' className={` px-2 py-1 rounded-md font-tmpfont border-2 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50 border-gray-600' : 'bg-white text-gray-600 border-gray-300'}`} name='assignee' value={filter.assignee} onChange={onchange}/>
                    </div>
                    <div className='flex flex-col '>
                        <p className='text-gray-50 font-tmpfont my-2 font-semibold'>Priority</p>
                        <span className={`font-tmpfont px-4 py-1 rounded-md flex items-center justify-center cursor-pointer w-full ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'bg-blue-200 text-gray-800'}`} onClick={handlePriorityDropdown}>
                            {filter.priority}
                            <ChevronDown className={`size-4 mx-2 ${priorityDropdown ? 'rotate-180' : ''}`}/>
                        </span>
                        {
                            priorityDropdown &&
                            <div className={`absolute rounded-md w-[19%] py-1 top-44 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50' : 'bg-blue-200 text-gray-800'}`}>
                                <ul className='w-full'>
                                    <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setPriority('P0')}>P0</li>
                                    <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setPriority('P1')}>P1</li>
                                    <li className={`cursor-pointer w-full flex justify-center px-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-300'}`} onClick={e => setPriority('P2')}>P2</li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex flex-col items-center justify-between w-[75%]'>
                    <div className='flex mt-4 justify-between w-full px-2'>
                        <label htmlFor="start-date" className={` my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>Start Date</label>
                        <label htmlFor="deadline" className={` my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>End Date</label>
                    </div>
                    <div className='flex mt-2 justify-between w-full'>
                        <input id='start-date' type="date" className={`cursor-pointer px-2 py-1 rounded-md font-tmpfont border-2 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50 border-gray-600' : 'bg-white text-gray-600 border-gray-300'}`} name='startDate' value={filter.startDate} onChange={onchange}/>
                        <p className='text-gray-50'>to</p>
                        <input type="date" className={`cursor-pointer px-2 py-1 rounded-md font-tmpfont border-2 ${theme === 'dark' ? 'bg-tmplightBlack text-gray-50 border-gray-600' : 'bg-white text-gray-600 border-gray-300'}`} name='endDate' value={filter.endDate} onChange={onchange}/>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-start w-[80%] my-1'>
                <h2 className='font-bold text-gray-50'>Sort</h2>
            </div>
            <div className='filter-area flex flex-col w-[80%] items-center py-4'>
                <div className='flex justify-start items-center w-[75%]'>
                    <input id='sort-by-priority' type="checkbox" className='size-4 ' onChange={sortOnchange} />
                    <label htmlFor="sort-by-priority" className={`mx-2 my-2 font-semibold font-tmpfont ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>Sort by priority</label>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex justify-center items-center mt-10 mx-4'>
                    <button className='text-white bg-tmpBlue px-6 py-2 rounded-3xl font-tmpfont mb-10'>Apply</button>
                </div>
                {
                    isFiltered &&
                    <div className='flex justify-center items-center mt-10 mx-4'>
                        <button className='text-white bg-tmpBlue px-6 py-2 rounded-3xl font-tmpfont mb-10' onClick={removeFilter}>Remove</button>
                    </div>
                }
            </div>
        </form>
    </div>
  )
}

export default FilterPop