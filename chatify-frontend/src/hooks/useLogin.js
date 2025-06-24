import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const useAuthentication =()=>{
const token = localStorage.getItem('token')
let loggedIn =false
const navigate = useNavigate();
if(token){
    loggedIn =true;

}
return {loggedIn , token};
}
export default useAuthentication;