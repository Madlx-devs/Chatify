import axios from 'axios';
import React, { useState } from 'react';
import { Send } from 'lucide-react';

function TextBox() {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/message/send',
        { content: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('');
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center border-t border-gray-300 p-3 bg-white">
      <textarea
        rows="1"
        className="flex-1 resize-none border rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center"
      >
        <Send size={18} className="mr-1" />
        Send
      </button>
    </div>
  );
}

export default TextBox;
