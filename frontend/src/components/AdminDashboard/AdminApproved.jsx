import React, { useEffect, useState } from "react";
import "./AdminPropertyTable.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { propertyAPI } from "../../api/api";
const { getAllProperty } = propertyAPI();
const AdminApproved = () => {
  const { user } = useSelector((state) => state.auth);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProperty();

        const data = response.data;
        setDetails(data);
      } catch (error) {
        console.log(error);
        // Handle the error condition appropriately
      }
    };

    fetchData();
  }, []);
  const filteredDetails = details.filter((data) => data.status == "approved");

  return (
    <div className="mr-4">
      <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-black-200">
          <tr className="bg-gray-100   flex flex-col flex-no wrap sm:table-row hidden rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="p-7 text-left ">Title</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">type</th>

            <th className="p-3 text-left" width="110px">
              Provider
            </th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {filteredDetails.length > 0 ? (
            filteredDetails.map((data) => (
              <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  <img
                    className="w-14 h-14 mx-auto"
                    src={data.img[0].location}
                    alt=""
                  />
                  <h1 className="text-center">{data.title}</h1>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {data.location.formattedAddress}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  ₹{data.price}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {data.type}
                </td>

                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {data.name}
                </td>
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

export default AdminApproved;
