import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Topic({ id, name }) {
  const token = localStorage.getItem('token');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/topic/allrooms", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          params: {
            topicId: id
          }
        });
        console.log("Rooms fetched:", response.data);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    if (id && token) {
      fetchRooms();
    }
  }, [id, token]);

  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-1">{name}</h4>
      <select className="w-full p-2 border rounded">
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Topic;
