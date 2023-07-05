import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { signUpSchema } from "../../schemas/index";
import Swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import gif from "../../assets/img/housegif.gif";
import  {authAPI}  from "../../api/api";
const {doSignup}=authAPI()

const initialValues = {
  sellername: "",
  email: "",
  phone: "",
  password: "",
};

const Signup = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(
          "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
          values
        );
        action.resetForm();
      },
    });
  console.log(
    "🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors",
    errors
  );

  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(":::::::");
console.log({...state});

   try{
    const res=await doSignup({...state})
    toast.success("please check your email", {
           position: toast.POSITION.TOP_CENTER,
           });  
   }
 
   catch(err){
    toast.error(err.response.data.msg, {
               position: toast.POSITION.TOP_CENTER,
           });  
           }


    // try {
    //   await axios
    //     .post("http://localhost:5000/auth/register", { ...state })
    //     .then((response) => {
    //       toast.success("please check your email", {
    //         position: toast.POSITION.TOP_CENTER,
    //       });        })
    //     .catch((error) => {
    //       console.log(error.response.data);
    //       toast.error(error.response.data.msg, {
    //         position: toast.POSITION.TOP_CENTER,
    //       });
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <section className="bg-white-50 min-h-screen flex items-center justify-center  ">
        <ToastContainer />

        <div className="bg-white-100 flex bg-gray-50 rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:block hidden w-1/2">
            <div className="flex justify-center ">
              {/* <img src={logo} className="w-40" alt="logo" /> */}
            </div>
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/home-quotes-v25-1659710362.jpg"
              alt=""
              srcset=""
            />
          </div>

          <div className="md:w-1/2 px-8 md:px-16">
            <div className="w-full mb-4 flex justify-center">
              <img src={gif} className="w-36 md:hidden " alt="logo" />
            </div>
            <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>
            <p className="text-xs mt-4 mb-4 text-[#002D74]">
              If you dont have an account ! then create one
            </p>

            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                handleRegister(event);
                handleSubmit(event);
              }}
            >
              <ToastContainer />

              <div className="relative">
                <input
                  className="peer p-2  rounded-xl border w-full placeholder-transparent text-gray-500 focus:outline-none"
                  type="name"
                  name="sellername"
                  placeholder="Email"
                  value={values.sellername}
                  onChange={(event) => {
                    handleState(event);
                    handleChange(event);
                  }}
                  onBlur={handleBlur}
                />
                {errors.sellername && touched.sellername ? (
                  <p className="form-error text-red-700">{errors.sellername}</p>
                ) : null}
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-3  text-gray-500 transition-all   
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  className="peer p-2  rounded-xl border w-full placeholder-transparent text-gray-500 focus:outline-none"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={(event) => {
                    handleState(event);
                    handleChange(event);
                  }}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error text-red-700">{errors.email}</p>
                ) : null}
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-3  text-gray-500 transition-all   
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border  w-full placeholder-transparent text-gray-500 focus:outline-none"
                  autoComplete="off"
                  type="number"
                  name="phone"
                  placeholder="phone"
                  value={values.phone}
                  onChange={(event) => {
                    handleState(event);
                    handleChange(event);
                  }}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone ? (
                  <p className="form-error text-red-700">{errors.phone}</p>
                ) : null}
                <label
                  htmlFor="password"
                  className="absolute -top-3 left-4  text-gray-500 transition-all  
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  Phone number
                </label>
              </div>

              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border  w-full placeholder-transparent text-gray-500 focus:outline-none"
                  autoComplete="off"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={(event) => {
                    handleState(event);
                    handleChange(event);
                  }}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="form-error text-red-700">{errors.password}</p>
                ) : null}
                <label
                  htmlFor="password"
                  className="absolute -top-3 left-4  text-gray-500 transition-all  
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Register
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

         

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Already have an account?</p>
              <Link to={"/signin"}>
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
