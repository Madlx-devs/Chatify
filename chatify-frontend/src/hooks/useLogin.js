import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const useAuthentication =()=>{
const token = localStorage.getItem('token')
const loggedIn = useSelector((state)=>state.login.loggedIn)
const navigate = useNavigate();

 useEffect(()=>{
    if(!loggedIn && token == null){
        navigate('/login')
    }
 },[ token , loggedIn])
}
export default useAuthentication;