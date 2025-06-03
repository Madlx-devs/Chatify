import React, { useEffect, useState } from 'react';
import Home from '../components/Home';
import Footer from '../components/Footer';
import HomeLogged from '../components/Home2';
import JoinRoom from './JoinRoom';

function HomePage() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [roomSelected, setRoomSelected]= useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token); 
  }, []);

  return (
    <>
      {loggedIn ?
      <>
      <HomeLogged /> 
      </>
      : <Home />
      }
      
      <Footer />
    </>
  );
}

export default HomePage;
