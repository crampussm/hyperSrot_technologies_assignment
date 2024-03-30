import React from 'react';
import { ListFilter } from 'lucide-react';
import { GetContext } from '../context/ThemeProvider';

function Topnav() {
    const { theme, selectedSpace, popFilter } = GetContext();
  return (
    <div className={`flex w-[82%] absolute right-0 top-0 justify-between px-6 py-5 border-b-2 ${theme === 'dark' ? 'bg-tmpBlack border-gray-800' : 'bg-blue-50'}`}>
        <span className={`text-gray-50 text-xl font-tmpfont font-semibold ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>
            {selectedSpace}
        </span>
        <div className={`flex text-lg font-tmpfont font-semibold justify-evenly items-center w-[8%] cursor-pointer ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} onClick={popFilter}>
            <ListFilter/>
            <p>Filter</p>
        </div>
    </div>
  )
}

export default Topnav