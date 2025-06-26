import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';

const WEBSOCKET_URL = 'http://localhost:8080/ws';

const socketConnection = () => {
  const socket = new SockJS(WEBSOCKET_URL);

  const stompClient = new Client({
    webSocketFactory: () => socket,

    debug: (str) => {
      console.log(str);
    },

    onConnect: () => {
      console.log('✅ Connected to WebSocket');
    },

    onStompError: (frame) => {
      console.error(' STOMP error:', frame.headers['message']);
      console.error('Details:', frame.body);
    },

    onWebSocketError: (error) => {
      console.error(' WebSocket error:', error);
    },

    onWebSocketClose: () => {
      console.warn('⚠️ WebSocket connection closed');
    },
  });

  stompClient.activate();
  return stompClient;
};

export default socketConnection;
