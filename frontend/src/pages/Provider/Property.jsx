import React from 'react'
import Aside from '../../components/dashboard/Aside'
import PropertyTable from '../../components/ProperyTable/PropertyTable'
import DashboardNav from '../../components/DashboardNav/DashboardNav'

function Property() {
  return (
    <div className="">
    <DashboardNav className='bg-slate-700' />
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex overflow-hidden">
        <Aside className="w-1/4 bg-white" />
        <div className="w-3/4 flex flex-col">
          <div className="flex-1 overflow-y-auto">
          <PropertyTable/>

          </div>
        </div>
      </div>
    </div>
  </div>
   
  )
}

export default Property
