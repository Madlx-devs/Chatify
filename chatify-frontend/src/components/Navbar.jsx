import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import boy from '../assets/boy.png';
import logo from '../assets/logo.png';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [loggedIn , setLoggedIn]=useState(true)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false)
    alert("you have been looged out")
   if(loggedIn){
    location.reload()
   }
    navigate('/');
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 text-white py-4 mt-10 flex justify-between items-center px-6 shadow-md">
      {/* Logo (static) */}
      <div className="text-xl font-bold text-white">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20 h-auto" />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="space-x-6 text-white font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/rooms" className="hover:text-blue-600">My Rooms</Link>
        <Link to="/explore" className="hover:text-blue-600">Explore</Link>
      </div>

      {/* Profile Image with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
            <img src={boy} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
