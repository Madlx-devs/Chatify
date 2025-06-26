import React, { useEffect } from 'react'
import useFetchMessage from '../../hooks/FetchMessage'
import axios from 'axios'
import useAuthentication from '../../hooks/useLogin'
import stompClient from '../../utils/webSocket.js'
function JoinRoom() {
const {token} = useAuthentication();
const roomId = window.location.pathname.split('/').pop(); 

  const join = async () => {
      try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/rooms/join/${roomId}`,{},{
      headers:{
        Authorization: `Bearer ${token}`,
        "content-type": "application/json"
      }
    })
      }
      
  catch (error) {
        console.error('Error joining room:', error);
  }
}

  return (
    <div className='flex justify-center align-center items-center pt-4 mt-4'>
      <h1 className='text-3xl block'> click to join the room</h1>
      <div className=''>
        <button className='block border border-blue-400 p-2 m-2 rounded-lg hover:border-blue-600'onClick={join}>
        join room
        </button>
      </div></div>
  )
}

export default JoinRoom