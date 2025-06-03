import { useEffect, useState } from "react"


const useAuthHook = ()=>{

    const [token , setToken]= useState(null)
    useEffect(()=>{
        const stored = localStorage.getItem('token');
        if(stored!==null){
            setToken(stored)
        }
    },
    [token])
}