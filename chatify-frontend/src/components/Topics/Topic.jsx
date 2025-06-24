import React from 'react'
import { useParams } from 'react-router-dom'

function Topic() {
const topicId = useParams();


  return (

    <div>
        <h1>Topic</h1>
        <div>rooms</div>
        
        </div>
    
  )
}

export default Topic