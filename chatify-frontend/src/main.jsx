import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/Layout.jsx'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import About from './components/About.jsx'
import HomePage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Profile from './components/profile/Profile.jsx'
import { Provider, useSelector } from 'react-redux'
import { store } from './redux/store.js'
import ErrorPage from './components/ErrorPage.jsx'
import Myrooms from './components/Myrooms.jsx'
import CreateRoom from './components/CreateRoom.jsx'
import CreateTopics from './components/CreateTopics.jsx'
import EditProfile from './components/profile/EditProfile.jsx'
import MyTopics from './components/MyTopics.jsx'
import Rooms from './components/Rooms.jsx'

function AppRoutes() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='edit-profile' element={<EditProfile/>}></Route>
        <Route path="*" element={<ErrorPage/>} />
        <Route path='/my-room' element={<Myrooms/>}/>
        <Route path='/room/:roomId' element={<Rooms/>}/> 
        <Route path='/create-topic' element={<CreateTopics/>}/> 
        <Route path='/my-topic' element={<MyTopics/>}/>
        <Route path='/create-room' element={<CreateRoom/>}/>
      </Route>
    </Routes>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
