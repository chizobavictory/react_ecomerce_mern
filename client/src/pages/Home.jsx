import React from 'react'
import Announcement from '../components/Announcement'
import Carousel from '../components/Carousel'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <Carousel />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home