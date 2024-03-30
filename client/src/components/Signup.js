import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { GetContext } from '../context/ThemeProvider';

function Signup() {
  const { toggleTheme, theme } = GetContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({username: ""});
  const handleLoginSignup = async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/createorlogin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: credentials.username }),
    });
    let json = await response.json();
    console.log(json);
    if(json.success){
      console.log("success");
      localStorage.setItem('taskmanager-authtoken', json.authToken);
      navigate('/dashboard');
    }else{
      console.log("failed to login/signup");
    }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
  useEffect(()=>{
    const authToken = localStorage.getItem('taskmanager-authtoken');
    if(authToken){
      navigate('/dashboard');
    }
  }, []);
  return (
    <div className='w-[95%]'>
      <div className="logo w-full py-4 px-4">
        <img className='w-[12%]' src="./images/tm_logo.png" alt="" />
      </div>
      <div className="signupsection w-full flex justify-center items-center h-[60vh] flex-col">
        <div className='flex justify-center items-center my-8 font-semibold'>
          <h1 className='text-4xl text-gray-600 mr-4 font-tmpfont'>Manage You Task</h1>
          <h1 className='typewriter overflow-hidden whitespace-nowrap mx-auto font-tmpfont text-4xl text-gray-600'>Smartly </h1>
        </div>
        <form action="" className={`flex flex-col justify-center w-[35%] items-center py-8 px-8 rounded-md ${theme === 'dark' ? 'bg-tmpBlack' : ''}`} style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
          <div className='flex flex-col w-full'>
            <label className={`font-tmpfont my-2 text-lg ${theme === 'dark' ? 'text-white' : ''}`} htmlFor="username">Enter username</label>
            <input className={`font-tmpfont border-2 px-2 py-1 rounded-md ${theme === 'dark' ? 'bg-tmplightBlack border-gray-600 text-white' : ''}`} id='username' name='username' type="text" value={credentials.username} onChange={onChange}/>
          </div>
          <button className='font-tmpfont bg-tmpBlue w-[25%] my-6 text-white py-2 rounded-3xl' onClick={handleLoginSignup}>Continue &rarr;</button>
        </form>
      </div>
      <div className="changeTheme flex justify-center">
          <div className={`rounded-3xl px-2 py-1 flex justify-between w-[7%] ${theme === 'dark' ? 'bg-tmplightBlack' : 'bg-gray-200'} `}>
            <div className={`${theme === 'light' ? 'bg-tmpBlue' : ''} w-fit rounded-full p-2 flex justify-center items-center cursor-pointer`} onClick={e => toggleTheme('light')}>
              <Sun className={`${theme === 'light' ? 'text-white' : 'text-gray-400'} `} />
            </div>
            <div className={`${theme === 'dark' ? 'bg-tmpBlue' : ''} w-fit rounded-full p-2 flex justify-center items-center cursor-pointer`} onClick={e => toggleTheme('dark')}>
              <Moon className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`} />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Signup