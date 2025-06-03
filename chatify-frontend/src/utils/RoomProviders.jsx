import React, { useState } from 'react';
import RoomContext from './RoomContext';

const RoomProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(null);

  return (
    <RoomContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
