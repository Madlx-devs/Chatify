import axios from 'axios';
import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async () => {
    if (!firstname || !lastname || !username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Email format validation
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password strength check
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        { firstname, lastname, username, email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data)
      alert(response.data.message ||"maja aa gaiya ");
    } catch (err) {
      alert(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Sign Up</h1>

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <input
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
          type="submit"
          value="Sign Up"
          onClick={handleSignup}
        />
      </div>
    </div>
  );
}

export default Signup;
