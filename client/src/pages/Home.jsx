import React from 'react'
import Announcement from '../components/Announcement'
import Carousel from '../components/Carousel'

import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement/>
      <Carousel />
    </div>
  )
}

export default Home