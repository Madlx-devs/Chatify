import axios from "axios"
import useAuthentication from "./useLogin"
import { useState ,useEffect} from "react";


const useRoomFetch=({topicId})=>{
const {token,loggedIn}=useAuthentication();
const [rooms, setRooms]=useState([])

useEffect(()=>{
   loggedIn&&(async()=>{
    try{

        const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/topic/allRooms?topicId=${topicId}`,
            {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setRooms(response.data)
    }

 catch(err){
    console.log(err)
 }    
})()
},[loggedIn, topicId])
return rooms;
} 

export default useRoomFetch;