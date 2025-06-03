import React from 'react'

function Popup(props) {
  return (
    <div>
        <p>{props.message}</p>
        <p>{props.username}</p>
    </div>
  )
}

export default Popup