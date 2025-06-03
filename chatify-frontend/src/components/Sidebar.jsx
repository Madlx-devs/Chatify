import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import RoomContext from '../utils/RoomContext';
import { Link } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
function Sidebar() {
  const [topics, setTopics] = useState([]);
  const [openTopics, setOpenTopics] = useState({});
  const { setRoomId } = useContext(RoomContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTopicsAndRooms = async () => {
      try {
        const topicRes = await axios.get('http://localhost:8080/api/v1/topic/getall', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const topicsData = topicRes.data;
        const roomRequests = topicsData.map((topic) =>
          axios.get('http://localhost:8080/api/v1/topic/allrooms', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            params: { topicId: topic.topicId },
          })
        );

        const roomResponses = await Promise.all(roomRequests);

        const topicsWithRooms = topicsData.map((topic, index) => ({
          ...topic,
          rooms: roomResponses[index].data,
        }));

        setTopics(topicsWithRooms);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    };

    if (token) {
      fetchTopicsAndRooms();
    }
  }, [token]);

  const toggleTopic = (topicId) => {
    setOpenTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handleRoomClick = (uuid) => {
  if (uuidValidate(uuid)) {
    setRoomId(uuid);
    console.log(uuid)
  } else {
    console.error('Invalid UUID from API:', uuid);
  }
}

  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-4 overflow-y-auto shadow-md">
      <h2 className="text-lg font-bold mb-4 text-center">Topics</h2>

      {topics.map((topic) => (
        <div key={topic.topicId} className="mb-3">
          <button
            className="w-full flex justify-between items-center px-3 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
            onClick={() => toggleTopic(topic.topicId)}
          >
            <span>{topic.topicName}</span>
            <span>{openTopics[topic.topicId] ? '▲' : '▼'}</span>
          </button>

          {openTopics[topic.topicId] && (
            <ul className="ml-4 mt-2 space-y-1">
              {topic.rooms && topic.rooms.length > 0 ? (
                topic.rooms.map((room) => (
                  <li
                    key={room.roomId}
                    className="text-sm px-3 py-1 hover:bg-gray-700 rounded cursor-pointer transition flex justify-between items-center"
                  >
                    <span onClick={() => handleRoomClick(room.uuid)}>
                      # {room.roomName}</span>
                  
                  </li>
                ))
              ) : (
                <li className="text-xs text-gray-400 italic px-3">No rooms</li>
              )}
              <Link
                to="/create-room"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Create room
              </Link>
            </ul>
          )}
        </div>
      ))}
      <Link
        to="/create-topic"
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Create Topic
      </Link>
    </div>
  );
}

export default Sidebar;
