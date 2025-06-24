import axios from 'axios';
import React, { useState } from 'react'
import useFetchMessage from '../../hooks/FetchMessage';
import useAuthentication from '../../hooks/useLogin';

function SendChat({roomId}) {
  const [message , setMessage]=useState('');
  const {token}= useAuthentication();
  const [error ,setError]=useState('')

  const sendMessage=async ()=>{
    if(!message){
      setError("message cannot be empty")
    }
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/message/send`,{
        content:message,
        roomId,
      },{
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"application/json"
        }
      })

    }
    catch(err){
      console.log(err)
    }

  }
    
  return (
   <div className="flex flex-col items-start w-full max-w-md  mt-4">
  <div className="flex w-full">
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Enter your message"
      className="flex-grow px-4 py-2 rounded-l-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400"
    />
    <button
      onClick={sendMessage}
      type="submit"
      className="px-4 py-2 rounded-r-md bg-black text-white border border-blue-400  hover:border-blue-600 transition-colors duration-200"
    >
      Send
    </button>
  </div>
  {error && <p className="text-red-400 text-sm">{error}</p>}
</div>

  )
}

export default SendChat