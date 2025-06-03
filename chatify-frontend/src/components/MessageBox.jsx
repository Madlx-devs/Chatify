import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import RoomContext from '../utils/RoomContext';
import SendMessage from './SendMessage'; // Assuming SendMessage is properly defined

function MessageBox() {
  const [messages, setMessages] = useState([]);
  const { roomId } = useContext(RoomContext); 
  const token = localStorage.getItem('token')
  const fetchMessages = useCallback(async () => {
    if (!roomId || !token) {
      console.log("Waiting for roomId or token to fetch messages.");
      return;
    }

    try {
      const resp = await axios.get(
        `http://localhost:8080/api/v1/message/getAll/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if the response status is 200 before proceeding
      if (resp.status === 200) {
        setMessages(resp.data);
      } else {
        console.warn('Received non-200 status when fetching messages:', resp.status, resp.data);
        // You might want to handle other statuses specifically, e.g., show a warning
      }
    } catch (error) {
      console.error('Error fetching messages:', error.response?.data || error.message);
      
    }
  }, [roomId, token]); 

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]); 

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-4 bg-gray-100 flex-1 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2 p-2 bg-white rounded shadow">
             
              <p className="text-sm font-semibold">{msg.sentBy}</p>
              <p className="text-gray-800">{msg.message}</p> 
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages in this room.</p>
        )}
      </div>
      <SendMessage onMessageSent={fetchMessages} />
    </div>
  );
}

export default MessageBox;