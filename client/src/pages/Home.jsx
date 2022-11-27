import React from 'react'
import Announcement from '../components/Announcement'
import Carousel from '../components/Carousel'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <Carousel />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home