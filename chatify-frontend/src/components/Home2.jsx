import React, { useContext , useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MessageBox from './MessageBox';
import RoomContext from '../utils/RoomContext';
import NoRoomJoined from './NoRoomJoined';
import JoinRoom from '../pages/JoinRoom';

function HomeLogged() {
  const {roomId} = useContext(RoomContext);
   const [roomJoined, setRoomJoined] = useState(false);
  
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Body: Sidebar + Main chat */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-[#1E1F25] text-white p-4 overflow-y-auto">
          <Sidebar />
        </aside>
        {/* Main content */}
        <main className="flex-1 bg-white p-6 overflow-y-auto">
         {!roomId ? (
            <NoRoomJoined />
          ) : roomJoined ? (
            <MessageBox />
          ) : (
            <JoinRoom onJoinSuccess={() => setRoomJoined(true)} />
          )}
        </main>
      </div>
    </div>
  );
}

export default HomeLogged;
