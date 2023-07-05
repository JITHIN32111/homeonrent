import React, { useEffect, useState } from 'react';
import './AdminPropertyTable.css';
import Swal from 'sweetalert';

import {propertyAPI} from "../../api/api";
const {getAllProperty,adminApproval}=propertyAPI()
const AdminRequests = () => {
  const [details, setDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const handleModalOpen = (data) => {
    setSelectedData(data); // Update selectedData with the clicked row's data
    setShowModal(true);
  };

  const changeStatus = async () => {
    if (selectedData) {
      try {
        const  title  = selectedData.data.title;
        console.log(title);
          await adminApproval(title).then((msg)=>{
          Swal("Updated!", "status updated as approved", "success")
          setDetails((prevDetails) => prevDetails.filter((data) => data.title !== title));
        });
        // Handle success or further actions after changing the status
      } catch (error) {
        console.log(error);
        // Handle error condition appropriately
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
          await getAllProperty().then((response)=>{
             const data = response.data;
           setDetails(data);
          });
       
      } catch (error) {
        console.log(error);
        // Handle the error condition appropriately
      }
    };

    fetchData();
  }, []);
  const filteredDetails = details.filter((data) => data.status !== 'approved');

  return (
    <div className="mr-4">
        {/* <Helmet>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
        </Helmet> */}
      <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-black-200">
          <tr className="bg-gray-100 flex flex-col flex-no wrap sm:table-row hidden rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="p-7 text-left">Title</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Provider</th>
            <th className="p-3 text-left" width="110px">Status</th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {filteredDetails.length > 0 ? (
            filteredDetails.map((data, index) => (
              <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0" key={index}>
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  <img className="w-14 h-14 mx-auto" src={data.img[0].location} alt="" />
                  <h1 className='text-center'>{data.title}</h1>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{data.location.formattedAddress}</td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">₹{data.price}</td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{data.name}</td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                  <button onClick={() =>  handleModalOpen({data})} className="bg-transparent my-auto mx-auto mt-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Approve
                  </button>
                  {showModal ? (
        <>
          <div
            className="justify-center text-lg  font-medium text-gray-900 dark:text-white items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-0 w-full flex-auto">
                <section className="py-1 bg-blueGray-50 w-full mt-16">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form className=''>
                <h6 className="text-blueGray-400 text-sm mt-2 mb-6 font-bold uppercase">
                    Owner Details
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Owner name
                      </label>
                      <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={selectedData.data.name} />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Email address
                      </label>
                      <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={selectedData.data.email} />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Phone Number
                      </label>
                      <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={selectedData.data.phone} />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    
                  </div>
                </div>


                <h6 className="text-blueGray-400 text-sm mt-0 mb-6 font-bold uppercase">
                  Property Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Address
                      </label>
                      <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={selectedData.data.location.formattedAddress} />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        City
                      </label>
                      <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={selectedData.data.location.city} />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Type
                      </label>
                      <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={selectedData.data.type}/>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Price
                      </label>
                      <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={selectedData.data.price} />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                
              </form>
            </div>
          </div>
  
        </div>
      </section>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      changeStatus()
                    }}
                  
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                <h1>No interdict properties</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequests;






