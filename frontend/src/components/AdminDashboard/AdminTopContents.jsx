import { useEffect,useState } from 'react'
import axios from 'axios';
import AdminCharts from '../../components/AdminDashboard/AdminCharts'
import  {propertyAPI,authAPI}  from "../../api/api";
const {getAllPropertyToAdmin}=propertyAPI()
const {getAllSellers}=authAPI()
function AdminTopContents() {
  const [propertyCount, setPropertyCount] = useState(0);
  
  const [pendingPropertyCount, setPendingPropertyCount] = useState(0);
  const [approvedPropertyCount, setApprovedPropertyCount] = useState(0);
  const [type4BHKCount, settype4BHKCount] = useState(0);
  const [type3BHKCount, settype3BHKCount] = useState(0);
  const [type2BHKCount, settype2BHKCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);

  
  console.log(propertyCount,pendingPropertyCount,approvedPropertyCount,type4BHKCount,type3BHKCount,type2BHKCount);
  useEffect(async()=>{
    // await axios.get(`http://localhost:5000/property/getAllPropertyToAdmin`)
    await getAllPropertyToAdmin()
    .then((data)=>{
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
    })
    const response =await getAllSellers()
    //  await axios.get(`http://localhost:5000/auth/getAllSellers`);
    
    setSellerCount(response.data.length)
  },[])
  return (
    
    <div>
      <div class="container items-center px-4 py-8 m-auto mt-5">
  <div class="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
    
    <div class="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        class="flex flex-col px-6 py-0 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div class="flex flex-row justify-between items-center">
          <div class="px-4 py-4 bg-gray-300 mt-2 rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
              <path fill-rule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            12%
          </div>
        </div>
        <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-2 mx-auto group-hover:text-gray-50">{propertyCount}</h1>
        <div class="flex flex-row justify-between mb-2 group-hover:text-gray-200">
          <p>Total Properties</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        class="flex flex-col px-6 py-0 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div class="flex flex-row justify-between items-center">
          <div class="px-4 py-4 bg-gray-300 mt-2 rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </div>
          <div class="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            12%
          </div>
        </div>
        <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-2 mx-auto group-hover:text-gray-50">{approvedPropertyCount}</h1>
        <div class="flex flex-row justify-between mb-2 group-hover:text-gray-200">
          <p>Approved Properties</p>

          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        class="flex flex-col px-6 py-0 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div class="flex flex-row justify-between items-center">
          <div class="px-4 py-4 bg-gray-300 mt-2 rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            12%
          </div>
        </div>
        <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-2 mx-auto group-hover:text-gray-50">{sellerCount}</h1>
        <div class="flex flex-row justify-between mt-2 group-hover:text-gray-200">
          <p>Total Providers</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        class="flex flex-col px-6 py-0 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div class="flex flex-row justify-between items-center">
          <div class="px-4 py-4 bg-gray-300 mt-2 rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            12%
          </div>
        </div>
        <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-2 group-hover:text-gray-50">3
        </h1>
        <div class="flex flex-row justify-between mt-2 group-hover:text-gray-200">
          <p>Total Users</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
  <AdminCharts   
  approvedPropertyCount={approvedPropertyCount}
  pendingPropertyCount={pendingPropertyCount}
  type4BHKCount={type4BHKCount}
  type3BHKCount={type3BHKCount}
  type2BHKCount={type2BHKCount}
  sellerCount={sellerCount}
  />
</div>


    </div>
  )
}

export default AdminTopContents
