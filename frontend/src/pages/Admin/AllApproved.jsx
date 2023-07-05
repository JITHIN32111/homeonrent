import React from 'react'
import AdminApproved from '../../components/AdminDashboard/AdminApproved'
import AdminAside from '../../components/AdminDashboard/AdminAside'
import AdminNav from '../../components/AdminDashboard/AdminNav'
function AllApproved() {
  return (
    <div className="">
    <AdminNav className='bg-slate-700' />
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex overflow-hidden">
        <AdminAside className="w-1/4 bg-white" />
        <div className="w-3/4 flex flex-col">
          <div className="flex-1 overflow-y-auto">
          <AdminApproved/>
        
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AllApproved
