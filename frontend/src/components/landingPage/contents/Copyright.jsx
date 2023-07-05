import React from 'react'
import { copyrightData } from './data'
function Copyright() {
  const{text,icon}=copyrightData
  return (
    <div className='mt-24 pb-12'>
      
      <div className='container mx-auto'>
        <div className='flex flex-col items-center text-center md:text-left'>
          {/*text*/}
          <div>{text}</div>
            {/*text*/}
            <div>{icon}</div>
        </div>
      </div>
    </div>
  )
}

export default Copyright
