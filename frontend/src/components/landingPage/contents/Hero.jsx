import React,{useState} from 'react'

//import data
import {aboutdata,herodata} from './data'
import Header from './Header'
import ListProperty from '../../listProperty/ListProperty'
import { useNavigate, Link } from "react-router-dom";
function Hero() {
  // destructure hero data 
  const {title,subtitle,btnText,image}=herodata ;
  
  return (
    <section  className='lg:h-[700px] py-12   '>
       
      <div className='container mx-auto   h-full relative '>
        <div className='flex flex-col xl:flex-row items-center  h-full md:py-24'>
        {/*Text*/}
         <div className='text-center xl:text-left xl:absolute' >
          <h1 className='h1 xl:max-w-[700px]  mb-6 lg:mb-12 ' data-aos='fade-down' data-aos-delay='400'>{title}</h1>
          <p className='lead xl:max-w-[380px] mb-6 lg:mb-12' data-aos='fade-down' data-aos-delay='500'>{subtitle}</p>
          <button className='h-12 px-4 btn bg-blue-300 text-white mb-8 xl:mb-0' data-aos='fade-down'  data-aos-delay='600'> <Link to='/Subscriptionpage '>{btnText}</Link></button>
         </div>
         <div>
          {/*image*/}
          <div className='xl:absolute   xl:-right-12 xl:bottom-16 max-w-[580px]  ' data-aos='fade-up' data-aos-delay='700'>
            <img src={image}  alt="" />
          </div>
         </div>
        </div>
      

      </div>

    </section>
  )
}

export default Hero
