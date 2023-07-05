

import React, { useEffect, useState } from 'react';
import './AdminPropertyTable.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {authAPI} from '../../api/api'
const {getOwnerDetails}=authAPI()

const SellersList = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/auth/getAllSellers`);
        // const data = response.data;
        // console.log(data);
         const res=await getOwnerDetails()
         setDetails(res.data);
      } catch (error) {
        console.log(error);
        // Handle the error condition appropriately
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mr-4">
      <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-black-200">
          <tr className="bg-gray-100   flex flex-col flex-no wrap sm:table-row hidden rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="p-7 text-left ">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            {/* <th className="p-3 text-left">type</th> */}

            <th className="p-3 text-left" width="110px">Total Properties</th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {details.length > 0 ? (
            details.map((data) => (
              <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0" >
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                 
                   {data.sellername}

                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{data.email}</td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{data.phone}</td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">2</td>

                {/* <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{data.name}</td>  */}

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                <h1>No Approved properties</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellersList;
