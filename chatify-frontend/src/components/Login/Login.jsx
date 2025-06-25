import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/loginSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem('user')

  useEffect(()=>{
    user &&navigate('/profile')
  },[user])
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const token = response.data.token
      localStorage.setItem("token", token)
      const user1 = JSON.stringify(response.data.user)

      localStorage.setItem("user", user1)
      dispatch(login(token))
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 0,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });
      navigate('/profile')

    } catch (err) {
      Swal.fire({
        icon:"error",
        text:err.response.data
      })
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>
        <form>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="text-black w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="text-black w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            autoComplete='true'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
