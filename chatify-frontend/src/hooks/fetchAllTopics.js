import { useEffect, useState } from "react";
import axios from "axios";



const fetchAllTopics=()=>{ 
const token = localStorage.getItem('token')
const [allTopics ,setAllTopics]=useState([])
const [error ,setError]=useState('')
  
    useEffect(() => {
    const fetchAllTopics = async () => {
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
        setAllTopics(response.data)
        console.log(response.data)
        //dispatch(setTopics(response.data))
      
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError(err);
      }
    };
    fetchAllTopics();
  }, []);
  return {allTopics,error}
}

export default fetchAllTopics
