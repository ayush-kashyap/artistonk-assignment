import { configureStore } from "@reduxjs/toolkit";
import  taskSlice  from "./taskSlice";


const TaskStore= configureStore(
    {
        reducer: {
            task:taskSlice
        }
    },
)

export default TaskStore