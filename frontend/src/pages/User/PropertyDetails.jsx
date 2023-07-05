import React from 'react'
import DetailsPage from '../../components/DetailsOfProperty/DetailsPage'
import Nav from '../../components/UserHome/Nav'
import BestDeals from '../../components/UserHome/BestDeals'
import Footer from '../../components/UserHome/Footer'
function PropertyDetails() {
  return (
      <>
      <Nav/>
      <div className='pt-14'>
      <DetailsPage/>
      <div className="App  w-11/12 md:w-4/5 m-auto">
      <BestDeals/>

      </div>
      </div>
     <Footer/>
      </>
  )
}

export default PropertyDetails
