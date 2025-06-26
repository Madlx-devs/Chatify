import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useAuthentication from '../../hooks/useLogin'
import NotLoggedIn from '../Utility/NotLoggedIn'
import useRoomFetch from '../../hooks/FetchRoomsTopicWise'
import Rooms from '../Rooms/Rooms'

function Topic() {
const topicId = useParams();
const {token , loggedIn}= useAuthentication();

const rooms=token&&loggedIn&&useRoomFetch(topicId);
console.log(rooms)
  return (
  !loggedIn?<NotLoggedIn/>:
    <div>
        <h1>Topic</h1>
        <div>rooms</div>
        <h1> rooms in this topic {rooms.length!==0?rooms.length:0}</h1>
        {rooms.map((room)=>(
          <Link  key={room.uuid}to={`/room/${room.uuid}`}>
            <div className='bg-white text-black p-4 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition-colors'>
              {room.roomName}
            </div>
          </Link>
        ))}
        </div>
       
  )
}

export default Topic