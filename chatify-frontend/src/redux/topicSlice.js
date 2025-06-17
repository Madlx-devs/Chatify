import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    topics:[]
}

const topicSlice = createSlice({
    name:"topic",
    initialState,
    reducers:{
    setTopic:(state,action)=>{
        state.topics=[action.payload]
    }
    }
})

export const {setTopic} = topicSlice.actions
export  default topicSlice.reducer