import { useFetcher, useParams } from 'react-router-dom';
import useFetchMessage from '../../hooks/FetchMessage';
import MessageBox from '../message/MessageBox';
import useAuthentication from '../../hooks/useLogin';
import { useEffect } from 'react';
import JoinRoom from './JoinRoom';

function Rooms() {
  const {token , loggedIn}= useAuthentication();
  const { roomId } = useParams();
  const { messages, setMessages ,joined} = useFetchMessage(roomId);
  useEffect(()=>{
    ()=>{useFetchMessage(roomId)
    }
  },[roomId]);


  if (!loggedIn || !token) return <p>You must be logged in to view this room.</p>;
  return (
    <>
    {joined?<MessageBox message={messages} roomId={roomId}/>:
    <JoinRoom/>
    }
    </>
  );
  
}

export default Rooms;
