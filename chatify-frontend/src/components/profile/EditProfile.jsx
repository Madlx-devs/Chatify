import React, { useState } from 'react'
import useAuthentication from '../../hooks/useLogin';

function EditProfile() {
useAuthentication();
const user = JSON.parse(localStorage.getItem('user'));
const [userdetails, setUserDetails]= useState(user)
console.log("editing is called")

const handleEdit=()=>{
 let editable = document.getElementById('name').getAttribute('readOnly')
 editable= false
 console.log(editable)
 
}
  return (
    <div>
        <input type="text" name="name" id = "name" readOnly={true} value={userdetails&& userdetails.firstName +' '+userdetails.lastName} onChange={(e)=>value=e.target.value} />
        <button onClick={handleEdit}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg> </button>
    </div>
  )
}

export default EditProfile