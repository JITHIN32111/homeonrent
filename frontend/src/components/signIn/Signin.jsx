import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import gif from "../../assets/img/housegif.gif";
import { useFormik } from "formik";
import { UserLogin } from "../../schemas/index";
import {authAPI} from "../../api/api";

const { doSignin } = authAPI();

const initialValues = {
  email: "",
  password: "",
};
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: UserLogin,
      onSubmit: (values, action) => {
        action.resetForm();
      },
    });

  const handleLogin = async (e) => {

    try {
      const res = await doSignin(email, password);
      toast.success("login successfull", {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(login(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      {/* <Wrapper>
      <div className={classes.container}>
        <div className="modal">
          <div className="modalcontainer">
            <div className={classes.modalleft}>
              <form
                onSubmit={handleLogin}
              >
                <h1>Signin</h1>
                <div className="input-block " >
                  <label htmlFor="name" className="input-label">
                 Email
                  </label>
                     <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className="input-block">
                  <label htmlFor="email" className="input-label">
               password
                  </label>
                <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />

                </div>
                
                <div className="modal-buttons">
                
                  <button className="input-button mt-0" type="submit">
                    Login
                  </button>
                </div>
                <p className='text-primary'>dont have an account? <Link to='/signup' className='text-red-950  hover:text-blue-950'>Register</Link></p>

              </form>
              
            </div>
          </div>
        </div>
        <ToastContainer/>

      </div>
    </Wrapper> */}

      <section className="bg-white-50 min-h-screen flex items-center justify-center">
        <ToastContainer />

        <div className="bg-white-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:block hidden w-1/2">
            <div className="flex justify-center ">
              {/* <img src={logo} className="w-40" alt="logo" /> */}
            </div>
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/home-quotes-v2-albanian-to-austen2-1659715834.jpg?resize=480:*"
              alt=""
              srcset=""
            />
          </div>

          <div className="md:w-1/2 px-8 md:px-16">
            <div className="w-full mb-4 flex justify-center">
              <img src={gif} className="w-36 md:hidden " alt="logo" />
            </div>
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 mb-4 text-[#002D74]">
              If you are already a member, easily log in
            </p>

            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                handleLogin();
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
                    setEmail(event.target.value);
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={(event) => {
                    setPassword(event.target.value);
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
                Login
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
              <p>dont have an account?</p>
              <Link to={"/signup"}>
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
