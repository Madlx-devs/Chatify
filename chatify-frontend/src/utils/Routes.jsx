import CreateRoom from '../pages/CreateRoom';
import CreateTopic from '../pages/CreateTopic';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Rooms from '../pages/Rooms';
import Myrooms from '../pages/Myrooms';
import Signup from '../pages/Signup';
import joinRoom from '../pages/JoinRoom';

const AppRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path:'/signup',
    element:<Signup/>
  }
  ,
  {
    path : '/rooms/:id',
    element: <Rooms/>
  }
  ,
   {
    path :'create-topic',
    element: <CreateTopic/>
   },
   {path:'create-room',
    element:<CreateRoom/>
   }
   ,
   {
    path:'my-rooms',
    element:<Myrooms/>
   }
   ,
  {
    path : 'join-rooms/:id',
    element: <joinRoom/>
  }
];

export default AppRoutes;
