import React from 'react'

function Footer() {
  return (
    <p className= "h-min bg-black border-t-blue-400 border text-center text-white py-2">
      Copyright | admtech @{new Date().getFullYear()}
    </p>
  )
}

export default Footer