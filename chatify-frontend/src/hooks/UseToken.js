import { X } from "@mui/icons-material"
import axios from "axios"
import { useEffect, useState } from "react"
import useAuthentication from "./useLogin"


const useToken =()=>{
const loggedIn = useAuthentication();
const [validity , setValidity]=useState(false)
const token = localStorage.getItem('token')
useEffect (()=>{
 (async()=>{
    if(token!==null && loggedIn){
    try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/checkToken`,{
            headers:{
             Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"}
    })
        setValidity(res.data.object)

    }
    catch(err){
        console.log(err)
    }
}
 })()
},[loggedIn , token])
return validity;
}
   
export default useToken;