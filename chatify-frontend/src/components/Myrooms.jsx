import axios from 'axios'
import useAuthentication from '../hooks/useLogin';
import { useEffect, useState } from 'react';
function Myrooms() {

const [rooms , setRooms]= useState([]);

useAuthentication();

const getRooms = async()=>{

    try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/rooms/getRooms`)
       setRooms((prev)=>prev.push(response.data));
        
    }
    catch(error)
    {
        console.log(error)
    }
}
  return (
    <div>
    <h1 className='bg-slate-500 text-center justify-center'> rooms</h1>
    {
    rooms.map((room)=><li>{room.name}</li>)}
    </div>
  )
}

export default Myrooms