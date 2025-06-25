import React, { useEffect, useState } from 'react';
import useAuthentication from '../../hooks/useLogin';
import { Link } from 'react-router-dom';

import useFetchTopics from '../../hooks/fetchMyTopics';
import { useDispatch } from 'react-redux';
import { setTopic } from '../../redux/topicSlice';
import fetchAllTopics from '../../hooks/fetchAllTopics';
import NotLoggedIn from '../Utility/NotLoggedIn';


function MyTopics() {
 
  const {loggedIn}= useAuthentication();
  const dispatch = useDispatch();
  const {allTopics}= loggedIn&&fetchAllTopics()
  const {topics} =loggedIn&&useFetchTopics();
  dispatch(setTopic(topics))
  return (

    !loggedIn?<NotLoggedIn/> :
    <div className="p-6">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Topics:</h2>

  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {topics.map((topic) => (
      <Link  key={topic.topicId} to={`/topic/${topic.topicId}`}><div
        className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out"
      >
        <h3 className="text-xl text-center font-semibold font-serif text-slate-800 mb-2">{topic.topicName}</h3>
        <p className="text-gray-600 mb-2">{topic.topicDescription}</p>
        <p className="text-sm text-gray-500">Rooms: {topic.room }</p>
        <p className="text-sm text-gray-800 mt-2">Created by:{topic.createdBy}</p>
      </div>
      </Link>
    ))}
  </div>
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Topics you can join:</h2>
    <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {allTopics.map((topic)=>
     <Link to={`/topic/${topic.topicId}`} ><div
        key={topic.topicId}
        className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out"
      >
        <h3 className="text-xl text-center font-semibold font-serif text-slate-800 mb-2">{topic.topicName}</h3>
        <p className="text-gray-600 mb-2">{topic.topicDescription}</p>
        <p className="text-sm text-gray-500">Rooms: {topic.room }</p>
        <p className="text-sm text-gray-800 mt-2">Created by:{topic.createdBy}</p>
      </div>
      </Link>
     )}
     </div>
     <Link to={"/create-topic"} >
          <button className='flex flex-row justify-center items-center w-28 h-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' type='button'>create topic</button></Link>
</div>
  );
}

export default MyTopics;
