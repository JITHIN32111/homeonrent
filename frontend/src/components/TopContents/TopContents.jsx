import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Charts from "../chart/Charts";
import {
  BsHousesFill,
  BsFillHouseCheckFill,
  BsFillHouseExclamationFill,
  FaCity,
} from "react-icons/all";
import { useSelector } from "react-redux";
import axios from "axios";
import {propertyAPI} from "../../api/api";

const { getProperty } = propertyAPI();
function TopContents() {
  const { user } = useSelector((state) => state.auth);
  const [propertyCount, setPropertyCount] = useState(0);
  
  const [pendingPropertyCount, setPendingPropertyCount] = useState(0);
  const [approvedPropertyCount, setApprovedPropertyCount] = useState(0);
  const [type4BHKCount, settype4BHKCount] = useState(0);
  const [type3BHKCount, settype3BHKCount] = useState(0);
  const [type2BHKCount, settype2BHKCount] = useState(0);

  useEffect(() => {
    (async () => {
      const data =
      //  await axios.get(
      //   `http://localhost:5000/property/getProperty/${user.email}`
      // );
      await getProperty(user.email)

        const propertyCount = data.data.length;
        const properties = data.data;
        const pendingProperties = properties.filter(
        (property) => property.status === "pending"
      );
      const type4BHK = properties.filter(
        (property) => property.type === "4BHK"
      );

      const type3BHK = properties.filter(
        (property) => property.type === "3BHK"
      );
      const type2BHK = properties.filter(
        (property) => property.type === "2BHK"
      );
      const type4BHKCount=type4BHK.length
      const type3BHKCount=type3BHK.length
      const type2BHKCount=type2BHK.length

      settype4BHKCount(type4BHKCount)
      settype3BHKCount(type3BHKCount)
      settype2BHKCount(type2BHKCount)

      const pendingPropertyCount = pendingProperties.length;
      const approvedProperties = properties.filter(
        (property) => property.status === "approved"
      );
      const approvedPropertyCount = approvedProperties.length;
      setApprovedPropertyCount(approvedPropertyCount);
      setPropertyCount(propertyCount);
      setPendingPropertyCount(pendingPropertyCount);
    })();
  }, [user.email]);

  return (
    <div class="flex flex-wrap ">
      <div class="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">
                  {" "}
                  Total Properties
                </h5>
                <span class="font-semibold text-xl text-blueGray-700">
                  <CountUp end={propertyCount} duration={1} />
                </span>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-gray-400">
                  {/* <i class="fas fa-chart-bar"></i> */}

                  <BsHousesFill />
                </div>
              </div>
            </div>
            <p class="text-sm text-blueGray-400 mt-4">
              <span class="text-emerald-500 mr-2">
                <i class="fas fa-arrow-up"></i> 2,99%{" "}
              </span>
              <span class="whitespace-nowrap"> Since last month </span>
            </p>
          </div>
        </div>
      </div>

      <div class=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">
                  Approved properties
                </h5>
                <span class="font-semibold text-xl text-blueGray-700">
                  <CountUp end={approvedPropertyCount} duration={1} />
                </span>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-gray-400">
                  <BsFillHouseCheckFill />
                </div>
              </div>
            </div>
            <p class="text-sm text-blueGray-400 mt-4">
              <span class="text-red-500 mr-2">
                <i class="fas fa-arrow-down"></i> 4,01%
              </span>
              <span class="whitespace-nowrap"> Since last week </span>
            </p>
          </div>
        </div>
      </div>

      <div class="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">
                  Pending Properties
                </h5>
                <span class="font-semibold text-xl text-blueGray-700">
                  <CountUp end={pendingPropertyCount} duration={1} />
                </span>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-gray-400">
                  <BsFillHouseExclamationFill />
                </div>
              </div>
            </div>
            <p class="text-sm text-blueGray-400 mt-4">
              <span class="text-red-500 mr-2">
                <i class="fas fa-arrow-down"></i> 1,25%{" "}
              </span>
              <span class="whitespace-nowrap"> Since yesterday </span>
            </p>
          </div>
        </div>
      </div>

      <div class="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">
                  Total <br /> Cities
                </h5>
                <span class="font-semibold text-xl text-blueGray-700">
                  <CountUp end={propertyCount} duration={1} />{" "}
                </span>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-gray-400">
                  <FaCity />
                </div>
              </div>
            </div>
            <p class="text-sm text-blueGray-400 mt-4">
              <span class="text-emerald-500 mr-2">
                <i class="fas fa-arrow-up"></i> 12%{" "}
              </span>
              <span class="whitespace-nowrap"> Since last mounth </span>
            </p>
          </div>
        </div>
      </div>
      <Charts   
  approvedPropertyCount={approvedPropertyCount}
  pendingPropertyCount={pendingPropertyCount}
  type4BHKCount={type4BHKCount}
  type3BHKCount={type3BHKCount}
  type2BHKCount={type2BHKCount}

  />

    </div>
  );
}

export default TopContents;
