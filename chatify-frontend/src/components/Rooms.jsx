import { useParams } from 'react-router-dom';
import useFetchMessage from '../hooks/FetchMessage';
import MessageBox from './MessageBox';

function Rooms() {
  const user = localStorage.getItem('user');
  const { roomId } = useParams();
  const { messages, setMessages } = useFetchMessage(roomId);


  if (!user || !messages) return <p>You must be logged in to view this room.</p>;

  return (
    <>
      <MessageBox message={messages}/>
    </>
  );
}

export default Rooms;
