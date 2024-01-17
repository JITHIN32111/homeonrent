import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import gif from "../../assets/img/housegif.gif";
import { useState } from "react";
import { useFormik } from "formik";
import { UserLogin } from "../../schemas/index";
import axios from "axios";
import { userDetails } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../config/firebase.config";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from 'react-google-button'
import {userAPI} from "../../api/api";

const { userLogin,userLoginWithGoogle } = userAPI();

const initialValues = {
  email: "",
  password: "",
};
function UserSignin() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async(data) => {
        const email=data.user.email
        console.log(email);
        
        await userLogin(email)
        // await axios
        // .get(`http://localhost:5000/user/googleLogin/${email}` )
        .then((response) => {
          const id=response.data.id
          toast.success("login successfull", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(userDetails(id));
          navigate("/user");
        })

        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
        setValue(data.user.email);
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          setError("Sign-in popup closed by the user. Please try again.");
        } else {
          setError("Sign-in error: " + error.code + " - " + error.message);
        }
      });
  };
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: UserLogin,
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
      // await axios
      //   .post("http://localhost:5000/user/login", { ...state })
      await userLoginWithGoogle({...state})
        .then((response) => {
          const id=response.data.id

          toast.success("login successfull", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(userDetails(id));
          navigate("/user");
        })

        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  console.log(value);
  return (
    <div>
      <>
        <section className="bg-white-50 min-h-screen flex items-center justify-center">
          <ToastContainer />

          <div className="bg-white-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
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
              <h2 className="font-bold text-2xl text-[#002D74]">User Login</h2>
              <p className="text-xs mt-4 mb-4 text-[#002D74]">
                If you are already a member, easily log in
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
                  Login
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-400" />
              </div>

              <div >
     < GoogleButton  onClick={handleClick}></GoogleButton>
      {error && <p>{error}</p>}
    </div>
              {/* <Link to={"/forgotPassword"}>
              <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                <span className="cursor-pointer">Forgot your password?</span>
              </div>
            </Link> */}

              <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                <p>dont have an account?</p>
                <Link to={"/user/register"}>
                  <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                    register
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

export default UserSignin;
