
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Navigate, useNavigate} from 'react-router-dom'
// import aos
import Aos from 'aos';  
// import aos css
import 'aos/dist/aos.css';
import axios from 'axios';

import Header from './contents/Header'
import Hero from './contents/Hero'
import About from './contents/About'
import Feature from './contents/Feature';
import Footer from './contents/Footer'
import {logout} from '../../redux/authSlice'

function landing () {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user}=useSelector((state)=>state.auth)
  useEffect(() => {
  
    (async () => {
      const data= await axios.get(`http://localhost:5000/property/getProperty/${user.email}`);
 
        const isExist = data.data.length === 0 ? false : true;
      
        if (isExist) {
          navigate('/dashboard')
        }

    })
    ();
  },[user.email]);


  // initialize aos
  Aos.init({
    duration: 1800,
    offset: 0,
  });
  return (
    <div className='overflow-hidden'>
     {/* <h1 onClick={handleLogout}>logout</h1> */}
     <Header/>
      <Hero/>
      <About/>
      <Feature/>
      <Footer/>
      {/* <div className='h-[4000px]'></div> */}
    </div>
  );
};

export default landing
