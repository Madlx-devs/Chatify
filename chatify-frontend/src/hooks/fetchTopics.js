import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchTopics = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch =useDispatch()

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
        //dispatch(setTopics(response.data))
      
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError(err);
      }
    };

    fetchTopics();
  }, []);

  return { topics, error};
};

export default useFetchTopics;
