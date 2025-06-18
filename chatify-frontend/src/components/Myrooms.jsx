import axios from 'axios';
import useAuthentication from '../hooks/useLogin';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Myrooms() {
  const [rooms, setRooms] = useState([]);
  useAuthentication();

  useEffect(() => {
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
    <div>
      <h1 className="bg-slate-500 text-white text-center justify-center">rooms</h1>
      {rooms.map((room) => (
        <div  key={room.roomId} className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
          <div className="p-4">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
              {room.roomName}
            </h6>
            <p className="text-slate-600 leading-normal font-light">
              {room.roomDescription}
            </p>
          </div>
          <div className="px-4 pb-4 pt-0 mt-2">
             <button  className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              open room
            </button>
          </div>
        </div>))}
    </div>
  );
}

export default Myrooms;
