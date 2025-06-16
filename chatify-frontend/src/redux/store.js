import { configureStore } from "@reduxjs/toolkit";
import  LoginReducer from "./loginSlice";

export const store = configureStore({
    reducer :{
        login :LoginReducer
    }
});