import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loggedIn: false,
    token :''
};
const  loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
    login:(state ,action)=>{
        state.loggedIn=true;
        state.token=action.payload.token;
    },
    logout:(state )=>{
        state.loggedIn=false;
        state.token=null;
    }
    },
});
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
