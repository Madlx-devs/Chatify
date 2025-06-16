import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'


function FirstPage() {
  return (
     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center p-6">
      
      <div className="mb-10 flex items-center space-x-3">
        <img src={logo} alt="chatify-logo"/>
      </div>

      <h2 className="text-4xl md:text-6xl font-extrabold text-center leading-tight mb-6 max-w-4xl">
        Connect with people seamlessly
      </h2>

  
      <p className="text-lg md:text-xl text-center text-gray-300 mb-10 max-w-2xl">
        Create chat rooms and engage in real-time discussions on a wide range of topics.
      </p>

    <a href='login' ><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
  Get started
</button></a>
    </div>
   
  )
}

export default FirstPage