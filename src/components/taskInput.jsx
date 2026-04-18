import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { taskAdd } from '../state/taskSlice';
import TaskTiles from './taskTiles';
import moment from 'moment';

function TaskInput() {
    const dispatch= useDispatch();
    const tasksAdded=useSelector((state)=>state.task.tasks);
    const [text, setText] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [tasks,setTasks]=useState([]);
    const [responseText, setResponseText] = useState("");
    const [addStatus, setAddStatus] = useState(false);
    const handleChange=(e)=>{
        setText(e.target.value);
    }
    const filterStatusWise=(e)=>{
        if(e.target.value==="ALL"){
            setFilterStatus("");
        }else{
            setFilterStatus(e.target.value);
        }
    }
    const saveTask=()=>{
        if(text.trim() !=""){
            dispatch(taskAdd({"name":text, "status":"PENDING", "time": moment.now()}))
            console.log(tasksAdded);
            setText("");
            setAddStatus(true);
            setResponseText("Task Saved Successfully!");
        }else{
            setAddStatus(false);
            setResponseText("Unable to save empty task!");
            
        }
        setTimeout(()=>{
                setResponseText("");
            },2000)
    }
  return (
    <div className='m-2'>
    <div >
        <div className='flex flex-col justify-between'>
    <input value={text} type="text"  onChange={handleChange} className=' border-black-100 border mb-2 rounded-xl outline-none px-4 py-2' placeholder='Enter task name'/>
    </div>
    <button className={`bg-blue-500 py-2 px-4 rounded-xl text-white mr-2 `} onClick={saveTask}> Save Task</button>
    
    
    
        <select name="status" id="status" onChange={filterStatusWise} className={`outline-none border rounded-xl py-2 px-3`} >
            <option value="PENDING"> Pending</option>
            <option value="COMPLETE"> Complete</option>
            <option value="ALL"> All</option>
        </select>
    </div>
    {responseText.trim() !="" && <span className={ addStatus ? "text-green-600": "text-red-600"} >{responseText}</span>}

    <div className='grid grid-flow-row gap-4 mt-2'>
        {tasksAdded?.map((item)=>
        
        (filterStatus=="" ||  item?.status===filterStatus) && <TaskTiles key={item?.time} taskName={item?.name} taskStatus={item?.status} taskTime={item?.time}/> 
    )}
    </div>
    </div>
  )
}

export default TaskInput