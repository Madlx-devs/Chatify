import React, { useEffect, useState } from 'react';
import useAuthentication from '../hooks/useLogin';

import useFetchTopics from '../hooks/fetchMyTopics';
import { useDispatch } from 'react-redux';
import { setTopic } from '../redux/topicSlice';
import fetchAllTopics from '../hooks/fetchAllTopics';


function MyTopics() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useAuthentication();
  const {allTopics}= fetchAllTopics()
  const {topics} = useFetchTopics();
  dispatch(setTopic(topics))
  return (
    <div className="p-6">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Topics:</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {topics.map((topic) => (
      <div
        key={topic.topicId}
        className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out"
      >
        <h3 className="text-xl text-center font-semibold font-serif text-slate-800 mb-2">{topic.topicName}</h3>
        <p className="text-gray-600 mb-2">{topic.topicDescription}</p>
        <p className="text-sm text-gray-500">Rooms: {topic.room }</p>
        <p className="text-sm text-gray-800 mt-2">Created by:{topic.createdBy}</p>
      </div>
    ))}
  </div>
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Topics you can join:</h2>
    {allTopics.map((topic)=>
     <div
        key={topic.topicId}
        className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out"
      >
        <h3 className="text-xl text-center font-semibold font-serif text-slate-800 mb-2">{topic.topicName}</h3>
        <p className="text-gray-600 mb-2">{topic.topicDescription}</p>
        <p className="text-sm text-gray-500">Rooms: {topic.room }</p>
        <p className="text-sm text-gray-800 mt-2">Created by:{topic.createdBy}</p>
      </div>
     )}
</div>
  );
}

export default MyTopics;
