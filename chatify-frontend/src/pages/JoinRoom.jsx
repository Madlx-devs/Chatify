import { useContext, useState } from 'react';
import RoomContext from '../utils/RoomContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinRoom = ({onJoinSuccess} ) => {
  const { roomId } = useContext(RoomContext);
  const token = localStorage.getItem('token');
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  const fetchAndJoin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/rooms/join/${roomId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setRoomData(response.data);
        alert("you have joined the room");
        onJoinSuccess();        
      } else {
        console.log('❌ Does not work');
      }

    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <p className="mb-4 text-gray-600">You haven't joined this room yet.</p>
      <button
        onClick={fetchAndJoin}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
