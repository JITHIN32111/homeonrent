// import {useState} from 'react'
// import { useSelector,useDispatch } from 'react-redux';
// import {houseDetails} from '../../redux/propertySlice'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import {sellerDetails} from '../../redux/ownerSlice'
// function OwnerDetials() {
//   const propertyDetails = useSelector((state) => state.property.details);
//   console.log(propertyDetails);


//   const [state, setState] = useState({});
  
//   const dispatch = useDispatch();
//   const navigate=useNavigate()
//   const handleState = (e) => {
   
//     setState((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//     };
    
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
     
//       dispatch(sellerDetails({...state}))
//       let details={...state,...propertyDetails}
//      await axios.post('http://localhost:5000/property/listProperty',{details}).then(response => {
//      navigate("/dashboard")

// })
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   return (
//    <>
//    <div class="flex justify-center items-center w-screen min-h-[600px]  bg-white">
// 	<div class="container mx-auto my-2  px-4 lg:px-20">

// 		<div class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
// 			<div class="flex">
// 				<h1 class="font-bold uppercase text-5xl"> Owner Details</h1>
// 			</div>
//       <form  onSubmit={(event) => {
//                     event.preventDefault();
//                     handleRegister(event);
//                   }}>
//       <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
// 				<input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//             type="text" name='name' placeholder="Owner name*"  onChange={(event) => {
//               handleState(event);
//             }} />
// 				<input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//             type="phone" name='phone' placeholder="phone*"   onChange={(event) => {
//               handleState(event);
//             }}/>
// 				<input class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
//             type="email" name='email' placeholder="Email*"   onChange={(event) => {
//               handleState(event);
//             }} />
//             <div>

//             </div>
// 					<button type='submit' class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
//                       focus:outline-none focus:shadow-outline" >
//          Submit
//           </button>

		
//         </div>


       
				
//       </form>
			
		
// 			</div>

// 			<div
// 				class="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
// 				<div class="flex flex-col text-white">
// 					<h1 class="font-bold uppercase text-4xl my-4">Drop in our office</h1>
// 					<p class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
// 						tincidunt arcu diam,
// 						eu feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed, scelerisque ex.
// 					</p>

          
       
//         </div>
//       </div>
//     </div>
// </div>
//    </>
//   )
// }

// export default OwnerDetials
import React from 'react'

function OwnerDetials() {
  return (
    <div>
      
    </div>
  )
}

export default OwnerDetials
