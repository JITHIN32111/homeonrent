import React from 'react'
import {featuredata} from './data'
import {BsArrowRight}   from 'react-icons/bs'
function Feature1() {
  const{title,subtitle,list}=featuredata
  return (
    <section className='my-[70px] xl:my-[150px]'>
      <div className='container mx-auto '>
        {/*text*/}
        <div className='text-center '>
          <h2 className='h2 mb-6'
          data-aos='fade-down'
          data-aos-delay='100'>{title}</h2>


           <p className='lead max-w-[585px] mx-auto mb-16 xl:mb-24'
            data-aos='fade-down'
            data-aos-delay='200'>{subtitle}</p>
        </div>


        {/*feature list*/}
        <div className='grid grid-cols-1 gap-[50px] xl:grid-cols-2 '>
         {list.map((feature,index)=>{
                   {/*feature structure*/}
          const {image,bg,title,describtion,linktext,delay}=feature
      return(
        <div className='w-ful max-w-[530px] h-[360px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto' key={index} data-aos='zoom-in' data-aos-offset='100' data-aos-delay={delay}>
                  {/*backgrong image*/}
        <div className='hidden xl:flex absolute top-0 right-0 -z-10 bg-white'>
          {/* <img src={bg} alt=""  /> */}
          </div>
                  {/*image icons*/}
         <div className='max-w-[320px] xl:mr-7 xl:max-w-[330px]'><img src={image} alt="" /></div>
                  {/*text*/}
         <div className='max-w-[220px]'>
          <h3 className='h3 mb-4'>{title}</h3>
          <p  className='font-light italic gap-x-2 group'>{describtion}</p>
          <div className='flex items-center gap-x-2 group mt-2' >
            <a className='text-primary font-bold ' href="">{linktext}</a>
            <BsArrowRight className='text-xl text-accent-primary group-hover:ml-[5px] transition-all: '/>
          </div>
          </div>        

        </div>
      )
    })}
        </div>

      </div>

    </section>
  )
}

export default Feature1
