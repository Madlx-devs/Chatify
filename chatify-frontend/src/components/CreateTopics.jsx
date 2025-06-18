import React, { useEffect, useState } from 'react'
import useAuthentication from '../hooks/useLogin'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setTopic } from '../redux/topicSlice';

function CreateTopics() {
const dispatch =useDispatch()
const [topicName , setTopicName] =useState('')
const [topicDescription , SetTopicDescription] = useState('')
useAuthentication();
const handleRoomCreation= async()=>{
  if(topicName==''|| topicDescription=='')
  {
    Swal.fire({
      icon:"error",
      text:"fill all details please"
    })
    return
  }
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/topic/create`,{
            topicName,
            topicDescription
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = response.data;
        Swal.fire({
            icon:"success",
            title:"topic created"
        })
     dispatch(setTopic(data))
    setTopicName('')
    SetTopicDescription('')
    }catch(err){
        Swal.fire({
            icon:"error",
            title:"topic cannot be created",
        })

    }
}
  return (
  <div className=" min-h flex flex-col items-center bg-gradient-to-br from-slate-900 to-gray-800 text-white p-4 m-4 text-center border-4">
  <h1 className="text-black text-3xl mb-4">Create Topic</h1>

  <input
    type="text"
    className="p-3 mb-4 w-80 text-black rounded"
    placeholder="Enter your topic name"
    value={topicName}
    onChange={(e) => setTopicName(e.target.value)}
  />

  <input
    type="text"
    className="p-3 mb-4 w-80 text-black rounded"
    placeholder="Enter your topic description"
    value={topicDescription}
    onChange={(e) => SetTopicDescription(e.target.value)}
  />


  <button
    onClick={handleRoomCreation}
    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
  >
    Create Topic
  </button>
</div>
  )
}

export default CreateTopics