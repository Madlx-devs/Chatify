import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const SOCKET_URL = 'http://localhost:8080/ws';

function ChatRoom({ roomId, username }) {
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected');

        // Subscribe to the room topic
        stompClient.current.subscribe(`/topic/room.${roomId}`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prev) => [...prev, msg]);
        });

        // Join room broadcast
        stompClient.current.publish({
          destination: `/app/chat/join`,
          body: JSON.stringify({
            type: 'JOIN',
            sender: username,
            roomId,
          }),
        });
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, [roomId, username]);

  const sendMessage = (text) => {
    stompClient.current.publish({
      destination: `/app/chat/send`,
      body: JSON.stringify({
        type: 'CHAT',
        sender: username,
        content: text,
        roomId,
      }),
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Room #{roomId}</h2>
      <div className="border h-64 overflow-y-scroll mb-2 p-2 bg-white text-black rounded">
        {messages.map((msg, index) => (
          <div key={index}><strong>{msg.sender}:</strong> {msg.content}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === 'Enter' && sendMessage(e.target.value)}
        className="border p-2 w-full rounded"
      />
    </div>
  );
}

export default ChatRoom;
