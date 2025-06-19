import axios from "axios";
import { useEffect, useState } from "react";

const useFetchMessage = (roomId) => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token || !roomId) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/message/getAll/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [roomId]);

  return { messages, setMessages };
};

export default useFetchMessage;
