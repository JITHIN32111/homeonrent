import axios from 'axios'
import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import emailVerified from '../../assets/200w.gif'
function Email() {
    const [validUrl,setvalidUrl]=useState(false)
    const param = useParams()
    useEffect(()=>{
     const verifyEmail=async ()=>{
        try{
            const url=`http://localhost:5000/auth/users/${param.id}/verify/${param.token}`
            console.log(url);
            const {data} = await axios.get(url);   
            console.log(data);        
            setvalidUrl(true)
              }catch(err){
              console.log(err , "Erro reached");
              setvalidUrl(false)
              }
     }
     verifyEmail()

    })
  return (
  <Fragment>
    {validUrl?(<div className='my-auto text-center'>
       <img className='lg:w-[300px] mx-auto my-16' src={emailVerified } alt="" />
        <Link to='/signin'>
          <h1 className='text-2xl '>please go back to login page</h1>
            <button> click here</button>

        </Link>
    </div>):(<h1>404 not found</h1>)}
  </Fragment>
  )
}

export default Email
