import { useState } from 'react';
import './App.css';
import Navbar from './pages/Navbar';
import Register from './pages/Register';
import LoginForm from './pages/LoginForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div>
      {loggedIn ? <LoginForm/> : <Register />}
    </div>
  );
}

export default App;

