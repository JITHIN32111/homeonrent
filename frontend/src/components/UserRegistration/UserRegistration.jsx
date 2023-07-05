import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import gif from "../../assets/img/housegif.gif";
import { useState } from "react";
import { useFormik } from "formik";
import { UserSignup } from "../../schemas/index";
import axios from 'axios'
import {userAPI} from "../../api/api";

const { userSignup } = userAPI();
const initialValues = {
  email: "",
  phone: "",
  password: "",
};
function UserRegistration() {
  const navigate=useNavigate()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: UserSignup,
      onSubmit: (values, action) => {
   
        action.resetForm();
      },
    });

  const [state, setState] = useState({});
  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(state);

    
    try {
      
          const maxAge = 3 * 24 * 60 * 60;
          // await axios.post('http://localhost:5000/user/register',{...state})
          await userSignup({...state})
          .then(response => {
          // Swal("Good job!", "go and check your email!", "success")
          const token=response.data.token 
          // localStorage.setItem('jwt', token);
          document.cookie = `jwt=${token}; path=/; max-age=${maxAge};`;
          navigate('/user/login')
      })
    
      .catch(error => {
        console.log(error.response.data);
      toast.error(error.response.data.msg,{
      position:toast.POSITION.TOP_CENTER
      })
    })
      
        
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.msg,{
          position:toast.POSITION.TOP_CENTER
          })
      }
  };
  return (
    <div>
      < >
        <section className="bg-white-50 min-h-screen flex items-center justify-center  ">
        <ToastContainer/>

          <div className="bg-white-100 flex bg-gray-50 rounded-2xl shadow-lg max-w-3xl p-5 items-center">
            <div className="md:block hidden w-1/2">
              <div className="flex justify-center ">
                {/* <img src={logo} className="w-40" alt="logo" /> */}
              </div>
              <img src={gif} alt="" srcset="" />
            </div>

            <div className="md:w-1/2 px-8 md:px-16">
              <div className="w-full mb-4 flex justify-center">
                <img src={gif} className="w-36 md:hidden " alt="logo" />
              </div>
              <h2 className="font-bold text-2xl text-[#002D74]">User Signup</h2>
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
                <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                  Register
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-400" />
              </div>

             
              {/* <Link to={"/forgotPassword"}>
              <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                <span className="cursor-pointer">Forgot your password?</span>
              </div>
            </Link> */}

              <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                <p>Already have an account?</p>
                <Link to={"/user/login"}>
                  <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}

export default UserRegistration;
