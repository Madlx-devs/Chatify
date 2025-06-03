import { createContext } from 'react';

const RoomContext = createContext({
  roomId: null,
  setRoomId: () => {},
});

export default RoomContext;
