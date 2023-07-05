import React from "react";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {propertyAPI} from "../../api/api";

const { getSubscription,checkSubscription} = propertyAPI();
function DashboardNav() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signup");
  };
  const checkStatus = async () => {
    console.log(user._id);
    const response =  await getSubscription(user._id)
    //  await axios.get(
    //   `http://localhost:5000/property/getSubscription/${user._id}`
    // )
    console.log(response.data);
    const count=response.data
    // const propertyCount=response.data.length
    // console.log(response.data.length);
    // const res = await axios.get(
    //   `http://localhost:5000/property/checkOwnerInSubscription/${user._id}`
    // );
    // const check = res.data;
    // console.log(check.status);
    // await axios
    //   .post(`http://localhost:5000/property/checkSubscription/${user.email}`)
      await checkSubscription(user.email)
      .then((response) => {
        // if (response.data == 2 && check.status == false ||response.data == 5 && check.status == true ) {
          if(response.data==count){
          console.log("add");
          navigate("/Subscriptionpage");
        } else {
          console.log("less");
          navigate("/listproperty");
        }
      });
  };

  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full bh-white bg-blue-50 shadow-lg">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="javascript:void(0)">
              <h2 className="text-2xl font-bold text-black">HomeOnRent</h2>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-indigo-200">
                <a href="javascript:void(0)">Properties</a>
              </li>
              <li className="text-white hover:text-indigo-200">
                <a href="javascript:void(0)">Schedules</a>
              </li>
              <li className="text-white hover:text-indigo-200">
                <a href="javascript:void(0)">Reviews</a>
              </li>
              <li className="text-white hover:text-indigo-200">
                <a href="javascript:void(0)">Contact US</a>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              <a
                href="javascript:void(0)"
                className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </a>
              <a
                onClick={checkStatus}
                href="javascript:void(0)"
                className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
              >
                Add Property
              </a>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          <a
            href="javascript:void(0)"
            className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </a>
          <a
            href="javascript:void(0)"
            className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
            onClick={checkStatus}
          >
            Add Property
          </a>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
