import React from "react";
import { footerData } from "./data";
import {FaYoutube,FaInstagram,FaTwitter} from 'react-icons/fa'
import Copyright from'./Copyright'
function Footer() {
  const { logo, address, email, phone, list1, list2, socialList } = footerData;
  return (
    <div className="" data-aos='fade-up '>
      <div className="container mx-auto ">
        <div className="flex flex-col xl:flex-row text-center xl:text-left gap-y-12">
          <div className="w-[45%] mx-auto flex flex-col items-center xl:items-start ">
            
          {/*Logo*/}
          <a href="">
            {/* <img className="mb-[65px]" src={logo} alt="" /> */}
          </a>
          {/*Address*/}
          <div className="max-w-[260px] mb-5 text-primary font-bold">{address}</div>
          {/*email*/}
          <div className="font-light  italic">{email}</div>
          {/*phone*/}
          <div className="font-light  italic">{phone}</div>
       
        </div>

        {/*Lists*/}
        <div className="flex flex-1 flex-col gap-y-14 xl:flex-row justify-between">
          {/*List1*/}

          <div>
            <div className="font-extrabold text-primary mb-8">About</div>
          
            <ul className="flex flex-col gap-y-4 ">
              {list1.map((item, index) => {
                return (
                  <li key={index}>
                    <a className="text-primary" href={item.href}>
                      {item.name}{" "}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/*List2*/}
          <div>
            <div className="font-extrabold text-primary mb-8">Help</div>
            <ul className="flex flex-col gap-y-4 ">
              {list2.map((item,index)=>{
                return(
                  <li key={index}>
                    <a className="text-primary" href={item.href}>{item.name}</a>
                  </li>
                )
              })}
            </ul>
          </div>
            {/*socailmedia*/}
            <div>
              <div className="font-extrabold text-primary mb-8">
                social media
              </div>
              <ul className="flex gap-x-4 justify-center">
           
                    <li><a href='#'> <FaYoutube/></a></li>
                    <li><a href='#'> <FaTwitter/></a></li>
                    <li><a href='#'> <FaInstagram/></a></li>

               
              </ul>
              </div>
        </div>
        
        </div>
      </div>
      <Copyright/>
    </div>
  );
}

export default Footer;
