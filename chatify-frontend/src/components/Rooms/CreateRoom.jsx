import React, { useEffect, useState } from 'react';
import useAuthentication from '../../hooks/useLogin';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import useFetchTopics from '../../hooks/fetchMyTopics';
import NotLoggedIn from '../Utility/NotLoggedIn';

function CreateRoom() {

  const {loggedIn} = useAuthentication();
  const {topics}= loggedIn&& useFetchTopics();
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [topicId, setTopicId] = useState('');
  const [error, setError] = useState('');


  const handleRoomCreate = async () => {
    if (!roomName || !roomDescription || !topicId) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/rooms/create`,
        {
          topicId,
          roomName,
          roomDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Room created:', response.data);
      Swal.fire({
        icon:"success",
        title:"room created"
      })
      //reset room form after creating a room
      setRoomName('');
      setRoomDescription('');
      setTopicId('');
      setError('');
    } catch (err) {
      console.error('Room creation failed:', err);
      Swal.fire(
      { icon:'error',
        title:'Failed to create room. Please try again.',
      });
    }
  };

  return (
    !loggedIn ?<NotLoggedIn/>:
    <section  p-0 className='bg-black text-white'>
    <div className="flex flex-col bg-black text-white p-6 rounded-md max-w-md mx-auto shadow-lg  border-1 border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Room</h2>

      {error && <p className="text-red-300 mb-4">{error}</p>}
      <select
        className="p-3 mb-6 rounded  text-black"
        onChange={(e) => setTopicId(e.target.value)}
        value={topicId}
      >
        <option value="">-- Select a topic --</option>
        {topics.map((topic) => (
          <option key={topic.topicId} value={topic.topicId}>
            {topic.topicName}
          </option>
        ))}
      </select>
      <label className="mb-2 font-medium text-black">Room Name</label>
      <input
        type="text"
        className="p-3 mb-4 rounded text-black"
        onChange={(e) => setRoomName(e.target.value)}
        value={roomName}
        placeholder="Enter room name"
      />

      <label className="mb-2 font-medium text-black">Room Description</label>
      <input
        type="text"
        className="p-3 mb-4 rounded text-black"
        onChange={(e) => setRoomDescription(e.target.value)}
        value={roomDescription}
        placeholder="Enter room description"
      />

      <label className="mb-2 font-medium text-black">Select Topic</label>
      

      <button
        onClick={handleRoomCreate}
        className="w-28  h-12 rounded-md hover:border-2 text-white border border-blue-400 transition ease-out hover:border-blue-600 "
      >
        Create Room
      </button>
    </div>
  </section>
  );
}

export default CreateRoom;
