
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'


function Layout() {

  return (
    <section className='flex flex-col min-h-screen'>
    <nav>
        <Navbar/>
        </nav>
    <main  className=' bg-black text-white flex-grow '>
      <Outlet/>
    </main>
    <Footer/>

    
    </section>
  )
    
}

export default Layout