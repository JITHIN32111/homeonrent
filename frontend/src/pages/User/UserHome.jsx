import React from 'react'
import Hero  from '../../components/UserHome/Hero'
import NewestDeals from '../../components/UserHome/NewestDeals'
import AboutUs from '../../components/UserHome/AboutUs'
import BestDeals from '../../components/UserHome/BestDeals'
import Footer from '../../components/UserHome/Footer'
function UserHome() {
  return (
    <>
    <div className="App  w-11/12 md:w-4/5 m-auto">
      <Hero/>
      <NewestDeals/>
      <AboutUs/>
      <BestDeals/>
    </div>
      <Footer/>
    </>
  )
}

export default UserHome
