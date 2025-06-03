import { useState, useContext } from 'react';
import RoomContext from '../utils/RoomContext';
import axios from 'axios';

const SendMessage = ({ onMessageSent }) => {
  const [message, setMessage] = useState('');
  const { roomId } = useContext(RoomContext);
  const token = localStorage.getItem('token');

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/message/send',
        { content: message,
          roomId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        onMessageSent?.(); 
        setMessage('');

      } else {
        console.error('Message not sent');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessage;
