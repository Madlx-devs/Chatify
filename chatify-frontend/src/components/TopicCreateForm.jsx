import axios from 'axios';
import React, { useState } from 'react';

function TopicCreate() {
  const token = localStorage.getItem('token');
  const [topicName, setTopicName] = useState('');
  const [topicDesc, setTopicDesc] = useState('');
  const [message, setMessage] = useState('');

  const create = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/topic/create',
        {
          topicName: topicName,
          topicDescription: topicDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('Topic created successfully!');
    } catch (err) {
      console.error('Topic creation failed:', err);
      setMessage(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <input
          type="text"
          placeholder="Topic Name"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          className="block w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={topicDesc}
          onChange={(e) => setTopicDesc(e.target.value)}
          className="block w-full border rounded p-2"
        />
        <button
          type="button"
          onClick={create}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Topic
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default TopicCreate;
