import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RoomCreate() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomDesc, setRoomDesc] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/topic/getall', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopics(response.data);
        console.log(selectedTopic)
      } catch (err) {
        console.error('Error fetching topics:', err);
      }
    };

    if (token) {
      fetchTopics();
    }
  }, [token ,selectedTopic]);

  const createRoom = async () => {
    if (!selectedTopic || !roomName || !roomDesc) {
      alert('Please fill in all fields');
      return;
    }

    try {
     const resp= await axios.post(
        'http://localhost:8080/api/v1/rooms/create',
        {
          topicId: selectedTopic,
          roomName,
          roomDescription: roomDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(resp)
      alert('Room created successfully!');
      // Reset form
      setSelectedTopic('');
      setRoomName('');
      setRoomDesc('');
      
    } catch (err) {
      console.error('Error creating room:', err);
      alert('Failed to create room. Check console for details.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Create a Room</h2>

      <select
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      >
        <option value="">-- Select a Topic --</option>
        {topics.map((topic) => (
          <option key={topic.topicId} value={topic.topicId}>
            {topic.topicName}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <textarea
        placeholder="Room Description"
        value={roomDesc}
        onChange={(e) => setRoomDesc(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
        rows="3"
      />

      <button
        onClick={createRoom}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
      >
        Create Room
      </button>
    </div>
  );
}

export default RoomCreate;
