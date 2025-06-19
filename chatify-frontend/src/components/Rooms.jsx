
import { useParams } from 'react-router-dom';
import useFetchMessage from '../hooks/FetchMessage';
import MessageBox from './MessageBox';

function Rooms() {
  const user = localStorage.getItem('user');
  const { roomId } = useParams();
  const { messages, setMessages } = useFetchMessage(roomId);


  if (!user) return <p>You must be logged in to view this room.</p>;

  return (
    <>
      <h1>This is my room</h1>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))
      )}
    </>
  );
}

export default Rooms;
