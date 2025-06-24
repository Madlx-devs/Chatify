import axios from 'axios';
import useAuthentication from '../../hooks/useLogin';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotLoggedIn from '../Utility/NotLoggedIn';

function Myrooms() {
  const {loggedIn} = useAuthentication();
  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {
    loggedIn&&
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/rooms/getRooms`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setRooms(response.data.object);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    !loggedIn?<NotLoggedIn/>:
    <div>
      <h1 className="bg-inherit text-2xl font-semibold text-white text-center justify-center">rooms</h1>
      {rooms.map((room) => (
        <div  key={room.roomId} className=" text-white bg-inherit cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-blue-400 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
          <div className="p-4">
            <h6 className="mb-2 text-white text-xl font-semibold">
              {room.roomName}
            </h6>
            <p className="text-white leading-normal font-light">
              {room.roomDescription}
            </p>
          </div>
          <div className="px-4 pb-4 pt-0 mt-2">
             <Link to= {`/room/${room.roomId}`}>
             <button  className="rounded-md bg-slate-800 py-2 px-4 border border-blue-400 hover:border-blue-600  border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  active:bg-slate-700  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              open room
            </button></Link>
          </div>
          <Link to={"/create-room"} >
          <button className='flex flex-row justify-center items-center w-28 h-auto rounded-md bg-slate-800  border border-blue-400 hover:border-blue-600 py-2 px-4  border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' type='button'>create room</button></Link>
        </div>))}
    </div>
  );
}

export default Myrooms;
