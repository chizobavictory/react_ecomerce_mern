import React from 'react'
import Announcement from '../components/Announcement'
import Carousel from '../components/Carousel'
import Categories from '../components/Categories'

import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement/>
      <Carousel />
      <Categories />
    </div>
  )
}

export default Home