import React, { useEffect, useState } from 'react';
import Task from './Task';
import { GetContext } from '../context/ThemeProvider';

function TaskList(props) {
    const { theme, getAllTasks, tasks, filter, isFiltered, selectedSpace } = GetContext();
    useEffect(()=>{
        getAllTasks();
    }, [selectedSpace]);
  return (
    <div className='flex flex-col w-[19%] ml-3'>
        <div className={`task-categoty-heading rounded-md border-t-4 border-tmpBlue font-tmpfont p-2 font-semibold flex justify-center ${theme === 'dark' ? 'bg-tmpBlack text-gray-50' : 'bg-blue-50 border-2 text-gray-600'}`}>
            {props.categoty}
        </div>
        <div className='my-2 px-1 overflow-y-scroll max-h-[68vh]'>
            {
                props.categoty === 'Pending' &&
                tasks.filter((task)=>{
                    return task.taskSpace === selectedSpace[0];
                }).filter((task) => {
                    if(isFiltered && filter.priority !== "Priority"){
                        console.log('priority - ', filter.priority);
                        return task.priority === filter.priority;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.assignee !== ""){
                        console.log('assignees - ', filter.assignee);
                        return task.assignees === filter.assignee;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.startDate !== '' && filter.endDate !== ''){
                        console.log('date filter from - ', filter.startDate);
                        console.log('date filter to - ', filter.endDate);
                        return task.endDate > filter.startDate && task.endDate < filter.endDate;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    return task.status === 'Pending'
                }).map((task)=>{
                    return <Task task={task}/>
                })
            }
            {
                props.categoty === 'In Progress' &&
                tasks.filter((task)=>{
                    return task.taskSpace === selectedSpace[0];
                }).filter((task) => {
                    if(isFiltered && filter.priority !== "Priority"){
                        return task.priority === filter.priority;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.assignee !== ""){
                        return task.assignees === filter.assignee;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.startDate !== '' && filter.endDate !== ''){
                        return task.endDate > filter.startDate && task.endDate < filter.endDate;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    return task.status === 'In Progress'
                }).map((task)=>{
                    return <Task task={task}/>
                })
            }
            {
                props.categoty === 'Completed' &&
                tasks.filter((task)=>{
                    return task.taskSpace === selectedSpace[0];
                }).filter((task) => {
                    if(isFiltered && filter.priority !== "Priority"){
                        return task.priority === filter.priority;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.assignee !== ""){
                        return task.assignees === filter.assignee;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.startDate !== '' && filter.endDate !== ''){
                        return task.endDate > filter.startDate && task.endDate < filter.endDate;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    return task.status === 'Completed'
                }).map((task)=>{
                    return <Task task={task}/>
                })
            }
            {
                props.categoty === 'Deployed' &&
                tasks.filter((task)=>{
                    return task.taskSpace === selectedSpace[0];
                }).filter((task) => {
                    if(isFiltered && filter.priority !== "Priority"){
                        return task.priority === filter.priority;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.assignee !== ""){
                        return task.assignees === filter.assignee;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.startDate !== '' && filter.endDate !== ''){
                        return task.endDate > filter.startDate && task.endDate < filter.endDate;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    return task.status === 'Deployed'
                }).map((task)=>{
                    return <Task task={task}/>
                })
            }
            {
                props.categoty === 'Deffered' &&
                tasks.filter((task)=>{
                    return task.taskSpace === selectedSpace[0];
                }).filter((task) => {
                    if(isFiltered && filter.priority !== "Priority"){
                        return task.priority === filter.priority;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.assignee !== ""){
                        return task.assignees === filter.assignee;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    if(isFiltered && filter.startDate !== '' && filter.endDate !== ''){
                        return task.endDate > filter.startDate && task.endDate < filter.endDate;
                    }else{
                        return task;
                    }
                }).filter((task)=>{
                    return task.status === 'Deffered'
                }).map((task)=>{
                    return <Task task={task}/>
                })
            }
        </div>
    </div>
  )
}

export default TaskList