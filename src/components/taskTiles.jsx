import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus, deleteTask } from '../state/taskSlice';
import {moment} from 'moment';

function TaskTiles({taskName,taskStatus,taskTime}) {
    const [newTaskStatus,setNewTaskStatus]=useState(taskStatus);
    const dispatch=useDispatch();
    const changeCompStatus=(e)=>{
        setNewTaskStatus(e?.target?.value);
    }
    const updateTask=()=>{
        dispatch(changeStatus(
            {
                "name":taskName,
                "time":taskTime,
                "status":newTaskStatus
            }
        ))
    }
    const deleteCompTask=()=>{
        dispatch(deleteTask(taskTime));
    }
    
   
  return (
    <div className={`${taskStatus==="COMPLETE"?"border-green-600":"border-red-600"} border rounded-xl p-2 ${taskStatus==="COMPLETE"?"bg-green-50":"bg-red-50"}`}>
        <div className='flex-row flex justify-between'>
        <span className={`font-bold text-xl ${taskStatus==="COMPLETE"?"line-through":""} `}>{taskName}</span>
        <select name="status" id="status" onChange={changeCompStatus} className={`outline-none ${taskStatus==="PENDING"? "bg-red-300" : "bg-green-300"} rounded-xl py-1 px-2`} >
            <option value="PENDING"> Pending</option>
            <option value="COMPLETE"> Complete</option>
        </select>
        </div>
        <div className=' flex flex-row justify-end'>
            
            <button key={`delete${taskTime}`} onClick={deleteCompTask} className={`bg-red-600 mt-2  rounded-xl py-1 px-2 text-white `}>Delete</button>
        <button key={taskTime} onClick={updateTask} className={`bg-blue-600 mt-2 ml-2 rounded-xl py-1 px-2 text-white ${taskStatus===newTaskStatus? "hidden": "block"}`}>Save</button>
        </div>
    </div>
  )
}

export default TaskTiles