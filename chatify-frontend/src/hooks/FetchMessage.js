import axios from "axios";
import { useEffect, useState } from "react";

const useFetchMessage = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);
  

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/rooms/isParticipant?roomId=${roomId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJoined(res.data)
      }
      catch(err){
        console.error("Error checking participant status:", err);
      }
    })()
  },[roomId]);
  
  
  useEffect(() => {
    const fetchMessages = async () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!user || !token || !roomId || !joined) return;

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
  }, [roomId, joined]);


  return { messages, setMessages ,setJoined, joined};
}

export default useFetchMessage;
