import { use, useEffect } from 'react';
import { Link, Links, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/loginSlice';
import Swal from 'sweetalert2';;

function ProfilePage() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const token =localStorage.getItem('token')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
    if(!loggedIn && token=='' || !user){
      navigate("/login")
    }
  },[loggedIn , token, user])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    dispatch(logout())
    Swal.fire({
      icon:'success',
      title:"you have been logged out"
    })
  };
  const editProfile =()=>{
     navigate('/edit-profile')
  }

  if(!user) return null
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center p-4">
      <section className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center transition-all duration-300">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
          {user.firstName + ' ' + user.lastName}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{user.username}</p>

        <p className="mt-4 text-gray-700 dark:text-gray-400">
          Passionate about building full-stack apps, learning new tech, and creating impact through code.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button onClick={editProfile} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow transition-all">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-xl shadow transition-all"
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
