import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <>
    <nav>
        <Navbar/>
        </nav>
    <main>
      <Outlet/>
    </main>
    <footer>
        <Footer/>
    </footer>
    
    </>
  )
    
}

export default Layout