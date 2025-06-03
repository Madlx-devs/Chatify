import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TopicCreate from '../components/TopicCreateForm'

function CreateTopic() {

  return (
    <>
    <Navbar/>
    <TopicCreate/>
    <Footer/>
    </>
  )
}

export default CreateTopic