import React, { useState } from 'react';
import useAuthentication from '../hooks/useLogin';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateRoom() {
  const topics = useSelector((state) => state.topic.topics);
  useAuthentication();

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
    <div className="flex flex-col bg-cyan-800 text-white p-6 rounded-md max-w-md mx-auto shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Room</h2>

      {error && <p className="text-red-300 mb-4">{error}</p>}

      <label className="mb-2 font-medium">Room Name</label>
      <input
        type="text"
        className="p-3 mb-4 rounded text-black"
        onChange={(e) => setRoomName(e.target.value)}
        value={roomName}
        placeholder="Enter room name"
      />

      <label className="mb-2 font-medium">Room Description</label>
      <input
        type="text"
        className="p-3 mb-4 rounded text-black"
        onChange={(e) => setRoomDescription(e.target.value)}
        value={roomDescription}
        placeholder="Enter room description"
      />

      <label className="mb-2 font-medium">Select Topic</label>
      <select
        className="p-3 mb-6 rounded text-black"
        onChange={(e) => setTopicId(e.target.value)}
        value={topicId}
      >
        <option value="">-- Select a topic --</option>
        {topics.map((topic) => (
          <option key={topic.topicId} value={topic.topicName}>
            {topic.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleRoomCreate}
        className="bg-green-500 hover:bg-green-600 transition duration-200 text-white font-semibold py-2 px-4 rounded"
      >
        Create Room
      </button>
    </div>
  );
}

export default CreateRoom;
