import React, { useState } from 'react'

function EditProfile() {
const user = JSON.parse(localStorage.getItem('user'));
const [userdetails, setUserDetails]= useState(user)

const handleEdit = async ()=>{


}
  return (
    <div>
        <input type="text" name="name" id="" value={userdetails.fistName +''+userdetails.lastName} />
        <button> edit </button>
    </div>
  )
}

export default EditProfile