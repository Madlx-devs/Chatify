import axios from "axios";
import { useState, useEffect } from "react";

const useFetchTopics = () => {
  const [topics, setTopics] = useState([]);
  const [data, setData]=useState('')
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/topic/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTopics(response.data);
       setData(response.data)
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError(err);
      }
    };

    fetchTopics();
  }, []);

  return { topics, error ,data};
};

export default useFetchTopics;
