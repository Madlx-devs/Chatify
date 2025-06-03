import { useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Don't forget to import useEffect

const useLoginNav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);
} 

export default useLoginNav;