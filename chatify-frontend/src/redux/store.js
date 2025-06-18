import { configureStore } from "@reduxjs/toolkit";
import  LoginReducer from "./loginSlice";
import TopicReducer from "./topicSlice"

export const store = configureStore({
    reducer :{
        login :LoginReducer,
        topic :TopicReducer
    }
});