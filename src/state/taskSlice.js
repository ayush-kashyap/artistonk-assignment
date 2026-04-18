import { createSlice } from "@reduxjs/toolkit";

const taskSlice= createSlice(
    {
        name:"task",
        initialState:{
            tasks:[]
        },
        reducers:{
            taskAdd(state,actions){
                state.tasks.push(actions.payload);
            },
            changeStatus(state,actions){
                console.log(actions.payload)
                let taskEdited=state.tasks.filter(item=>item.time ===actions.payload.time);
                if(taskEdited.length!=0){
                    let newTask=taskEdited[0];
                    newTask.status=actions.payload.status;
                    state.tasks=state.tasks.filter(items=>items.time!=actions.payload.time)
                    state.tasks=[...state.tasks, newTask];
                }
                
            },
            deleteTask(state,actions){
                state.tasks=state.tasks.filter(items=>items.time!=actions.payload)
            }
            

        }
    }
)

export const {taskAdd, changeStatus,deleteTask} = taskSlice.actions;

export default taskSlice.reducer;