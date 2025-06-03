import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });

      const data = response.data;

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="border rounded p-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="block w-full border p-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="block w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Log In
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        <br />
        <a href="/signup">
        new user? click here to sign up</a>
      </form>
    </div>
  );
}

export default Login;
