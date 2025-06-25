import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/Home/Layout.jsx'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import About from './components/About/About.jsx'
import HomePage from './components/Home/HomePage.jsx'
import Signup from './components/Login/Signup.jsx'
import Login from './components/login/Login.jsx'
import Profile from './components/Profile/Profile.jsx'
import { Provider, useSelector } from 'react-redux'
import { store } from './redux/store.js'
import ErrorPage from './components/Utility/ErrorPage.jsx'
import CreateRoom from './components/Rooms/CreateRoom.jsx'
import CreateTopics from './components/Topics/CreateTopics.jsx'
import EditProfile from './components/Profile/EditProfile.jsx'
import MyTopics from './components/Topics/MyTopics.jsx'
import Rooms from './components/Rooms/Rooms.jsx'
import Topic from './components/Topics/Topic.jsx'
import Myrooms from './components/rooms/Myrooms.jsx'

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
        <Route path ='/topic/:topicId' element={<Topic/>} />
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
