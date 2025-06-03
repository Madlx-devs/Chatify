import axios from "axios"
import { useEffect } from "react"

 
 const useTopic =()=>{

  useEffect(()=>{
    const token = localStorage.getItem('token')
  const  fetchTopics= async ()=>{

    try{
        const res = await axios.get("http://localhost:8080/ap1/v1/topic/getall",{
            headers:{Authorization:`bearer ${token}`,
        "Content-Type":'application/json'}
        })
    }catch(err){
        console.log(err);
    }
  }
  },[token])
 } 