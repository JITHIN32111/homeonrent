import React from 'react'
import { BsSuitHeart } from 'react-icons/bs';
import { IoBedOutline, IoLocationOutline } from 'react-icons/io5';
import { GiBathtub, GiHomeGarage } from 'react-icons/gi';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function ListFilterProperties({filterProperties}) {
  const navigate=useNavigate()
  const viewDetails = (id) => {
    navigate(`/user/propertyDetails?id=${id}`);
  };
  console.log(filterProperties);
  return (
    <div className="py-10">
      <p className="px-4 py-1 text-xs bg-yellow-100 w-28 rounded-lg">Your properties</p>
      {/* <h1 className="text-4xl font-bold">NEWEST DEALS</h1> */}
      <div className="deals grid 2xl:grid-cols-5 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10">
        {filterProperties.map((image) => (
          <div key={image._id} className="deal h-[350px] bg-white drop-shadow-2xl rounded-xl">
            <div className="relative h-[60%]" onClick={() => viewDetails(image._id)}>
                
              <img src={image.img[0].location} alt="" className="w-full h-full object-cover rounded-t-xl" />
              <div className="absolute top-0 right-0 p-4">
                <BsSuitHeart size="1.5rem" className="text-white" />
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex space-x-5 items-center">
                <div className="flex items-center space-x-1">
                  <IoBedOutline />
                  <p className="text-sm text-gray-400">4 bed</p>
                </div>
                <div className="flex items-center space-x-1">
                  <GiBathtub />
                  <p className="text-sm text-gray-400">2 bat</p>
                </div>
                <div className="flex items-center space-x-1">
                  <GiHomeGarage />
                  <p className="text-sm text-gray-400">1 gar</p>
                </div>
              </div>
              <h1 className="text-2xl font-semibold">{image.price}</h1>
              <div className="flex items-center space-x-2">
                <IoLocationOutline />
                <p className="text-sm text-gray-600">{image.location.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center py-5">
        <button className="bg-yellow-200 px-5 py-2 rounded-md text-xl flex items-center space-x-2">
          <span>View More</span> <AiOutlineDoubleRight />
        </button>
      </div>
    </div>
  )
}

export default ListFilterProperties
