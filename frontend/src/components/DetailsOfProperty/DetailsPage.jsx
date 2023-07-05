import SimpleImageSlider from "react-simple-image-slider";
import { useState, useEffect } from "react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import seller from "../../assets/sellerDashboard/customer.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { auth } from "../../config/firebase.config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import success from "../../assets/success.gif";
import { useRef } from "react";
import ScheduleSuccess from "../../assets/successScedule.jpg";
import { propertyAPI, userAPI } from "../../api/api";
const { setEnqueryDetails, getIndividualProperty, setSchedule } = propertyAPI();
const { getUserDetails, sendOwnerdetails } = userAPI();

import images from "../../assets/scedule.jpg";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";

import { Map, Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";

function DetailsPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);
  const [image, setImages] = useState([]);
  const [ph, setPh] = useState("");
  const [OTP, setOTP] = useState("");
  const [user, setUser] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [property, setProperty] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [modalVisible3, setmodalVisible3] = useState(false);
  const [isIdPresent, setIsIdPresent] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState(false);
  const [state, setState] = useState("");
  const textareaRef = useRef(null);

  const [modalVisible4, setmodalVisible4] = useState(false);
  const toggleModal4 = () => {
    setmodalVisible4(!modalVisible4);
  };

  const handleState = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { _id: userID, email, phone } = userDetails;
      const enquery = { ...state };
      const text = enquery.text;
      const data = { userID, email, phone, text };
      console.log(data);
      // await axios.post(`http://localhost:5000/property/setEnqueryDetails/${id}`, data)
      await setEnqueryDetails(id, data).then((response) => {
        toast.success("Your enquery has benn sent to the owner ", {
          position: toast.POSITION.TOP_CENTER,
        });
        textareaRef.current.value = "hello am interested";
      });
    } catch (error) {
      console.error(error);
    }
  };
  const toggleModal3 = () => {
    setmodalVisible3(!modalVisible3);
  };
  const Id = useSelector((state) => state.user.details);
  const getData = async () => {
    try {
      await getUserDetails(Id).then((response) => {
        setUserDetails(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };
  const sentOtp = async () => {
    console.log(ph);

    try {
      const phone = "+91" + userDetails.phone;
      let recaptchaVerifier = await new RecaptchaVerifier(
        "recaptcha",
        {},
        auth
      );
      let confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );
      setUser(confirmation);

      setShow(true);

      console.log(confirmation);
    } catch (err) {
      console.log(err);
    }
  };
  const verifyOtp = async () => {
    try {
      await user
        .confirm(OTP)
        .then((res) => {
          console.log("logged");
          toast.success("you are verified,an email has been sent ", {
            position: toast.POSITION.TOP_CENTER,
          });

          sendOwnerdetails(Id, id).then((response) => {
            setOwnerDetails(true);

            toggleModal2();
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("wrong otp", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(!modalVisible);
  };

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const fetchData = async () => {
    try {
      await getIndividualProperty(id).then((response) => {
        setProperty([response.data]);
        const userSchedules = response.data.schedules;
        const ownerDetails = response.data.ownerDetailsViewed;
        console.log(ownerDetails);

        const isIdInUserSchedules = userSchedules.some(
          (schedule) => schedule.userId === Id
        );
        const isOwnerDetails = ownerDetails.includes(Id);
        console.log(isIdInUserSchedules);
        setOwnerDetails(isOwnerDetails);
        setIsIdPresent(isIdInUserSchedules);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setScedule = async () => {
    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];

      await setSchedule(id, formattedStartDate, Id).then((response) => {
        console.log(response);

        toast
          .success("Scedule Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
          })
          .then(() => {});
        modalVisible3();
        setIsIdPresent(true);

        //
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    getData();
  }, []);

  return (
    <section>
      <ToastContainer />

      {property.map((data) => (
        <div className="container mx-auto min-h-[800px] mb-14 mt-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold "></h2>

              <div className="text-2xl text-violet-900 font-bold mb-4">
                {data.title}
              </div>
            </div>
            <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm ">
              <div className="bg-green-500 text-white px-3  rounded-full ">
                {data.type}
              </div>
              <div className="bg-violet-500 text-white px-3  rounded-full ">
                {data.location.city}
              </div>
            </div>
            <div className="text-3xl font-semibold text-violet-600 ">
              ${data.price}
              {/* <button className="bg-black text-white " onClick={test}>kjhkjhkjhkjhkjhkjhkjh</button> */}
            </div>
          </div>

          <div className="flex flex-col items-start gap-8 lg:flex-row ">
            <div className="mx-w-[768px]">
              <div className="mb-8">
                <img
                  onClick={toggleModal}
                  className="w-[750px] lg:h-[450px] sm:h-[200px]"
                  src={data.img[0].location}
                  alt=""
                />
                <div className="mt-2 items-end flex justify-end gap-4 mr-14">
                  <button
                    className="bg-blue-500 text-white px-3  rounded-full"
                    onClick={toggleModal4}
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                  >
                    See on map
                  </button>
                  <button
                    className="bg-green-500 text-white px-3  rounded-full"
                    onClick={toggleModal2}
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                  >
                    Owner Details
                  </button>
                  <button
                    onClick={toggleModal3}
                    className="bg-violet-500 text-white px-3  rounded-full "
                  >
                    make a visit
                  </button>
                </div>

                <div className="pt-16">
                  {modalVisible2 && (
                    <div
                      id="popup-modal"
                      tabIndex="-1"
                      className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm bg-opacity-50"
                    >
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-6 text-center">
                          <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                                i
                              </div>
                              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">
                                  Fill out this one-time form
                                </h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                  Please verify first to get the Owner Details.
                                </p>
                              </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                              {ownerDetails ? (
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                  {/* Content when show is true */}
                                  <div className="flex items-center space-x-4"></div>
                                  <div className="flex flex-col ">
                                    <label className="leading-loose">
                                      Please check your mail
                                    </label>
                                    <img
                                      src={success}
                                      className="max-h-[200px] max-w-[200px] mx-auto"
                                      alt=""
                                      srcset=""
                                    />
                                    <h1>
                                      Owner details has been sent to your E-mail
                                    </h1>
                                  </div>
                                  <div className="pt-8 flex items-center p space-x-4">
                                    <button
                                      onClick={toggleModal2}
                                      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                                    >
                                      <svg
                                        className="w-6 h-6 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                      </svg>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : show ? (
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                  {/* Content when show is true */}
                                  <div className="flex items-center space-x-4"></div>
                                  <div className="flex flex-col ">
                                    <label className="leading-loose">
                                      Enter OTP
                                    </label>
                                    <OTPInput
                                      value={OTP}
                                      onChange={setOTP}
                                      OTPLength={6}
                                      otpType="number"
                                      disabled={false}
                                      autoFocus
                                      className="flex justify-between gap-2 p-4 flex-1 py-5 outline-none bg-indigo-50"
                                    ></OTPInput>{" "}
                                  </div>
                                  <div className="pt-8 flex items-center p space-x-4">
                                    <button
                                      onClick={toggleModal2}
                                      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                                    >
                                      <svg
                                        className="w-6 h-6 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                      </svg>
                                      Cancel
                                    </button>
                                    <button
                                      onClick={verifyOtp}
                                      className="bg-blue-500 flex justify-center items-center w-full text-white px-2 py-3 rounded-md focus:outline-none"
                                    >
                                      Get Contact Details
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                  {/* Content when show is false */}
                                  <div className="flex flex-col">
                                    <label className="leading-loose">
                                      Email
                                    </label>
                                    <input
                                      type="text"
                                      value={userDetails.email}
                                      className="px-4 py-2 w-full border focus:ring-gray-500 focus:border-gray-900 mx-auto sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                      placeholder="Optional"
                                    />
                                  </div>
                                  <div className="flex items-center space-x-4"></div>
                                  <div className="flex flex-col">
                                    <label className="leading-loose">
                                      Phone
                                    </label>
                                    <PhoneInput
                                      country={"in"}
                                      value={"919061029928"}
                                      onChange={setPh}
                                      className="ml-6 w-full"
                                    />
                                  </div>
                                  <div className="pt-8 flex items-center p space-x-4">
                                    <button
                                      onClick={toggleModal2}
                                      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                                    >
                                      <svg
                                        className="w-6 h-6 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                      </svg>
                                      Cancel
                                    </button>
                                    <button
                                      onClick={sentOtp}
                                      className="bg-blue-500 flex justify-center items-center w-full text-white px-2 py-3 rounded-md focus:outline-none"
                                    >
                                      Verify
                                    </button>
                                  </div>
                                  <div
                                    className="mt-4 ml-12"
                                    id="recaptcha"
                                  ></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-x-6 text-violet-700 mb-6 ">
                <div className="flex gap-x-2 items-center ">
                  <BiBed className="text-2xl" />
                  <div>5</div>
                </div>
                <div className="flex gap-x-2 items-center ">
                  <BiBath className="text-2xl" />
                  <div>2</div>
                </div>
                <div className="flex gap-x-2 items-center ">
                  <BiArea className="text-2xl" />
                  <div>{data.sqrmeters}</div>
                </div>
              </div>
              <div className="max-w-[700px] font-semibold">{data.address}</div>

              <div className="max-w-[700px]">{data.desc}</div>
            </div>
            <div className="flex-1  bg-white  w-full mb-8 border border-gray-300 rouded-lg px-6 py-8">
              <div className="flex items-center gap-x-4 mb-8">
                <div className="w-20 h-20p-1 border border-gray-300 rounded-full ">
                  <img src={seller} alt="" />
                </div>
                <div>
                  <div className="font-bold text-lg ">Send Enquery</div>
                </div>
              </div>

              <form
                className=" "
                onSubmit={(event) => {
                  event.preventDefault();
                  handleRegister(event);
                }}
              >
                <input
                  placeholder="Name*"
                  type="text"
                  value={(userDetails.email ?? "").split("@")[0]}
                  className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-8 text-sm"
                />
                <input
                  placeholder="E-mail*"
                  type="text"
                  value={userDetails.email}
                  className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-8 mt-2 text-sm"
                />
                <input
                  placeholder="Phone*"
                  value={userDetails.phone}
                  type="text"
                  className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-8 mt-2 text-sm"
                />
                <textarea
                  onChange={(event) => {
                    handleState(event);
                  }}
                  ref={textareaRef}
                  defaultValue="Hello, I am Interested"
                  name="text"
                  id=""
                  cols="30"
                  rows="2"
                  className="border mt-2 border-gray-300 focus:border-violet-700 focus:outline-non resize-none rounded w-full p-4 h-36 text-sm text-gray-400 "
                  placeholder="Message"
                ></textarea>
                <div>
                  <button className="bg-violet-700 text-sm w-full transition hover:bg-violet-800 text-white rounded p-4">
                    send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ))}
      <div className="pt-16">
        {modalVisible && (
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 flex items-center justify-center z-50 px-4 overflow-x-hidden overflow-y-auto"
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 text-gray-400 bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Close
              </button>
              <div className="p-6 text-center">
                <SimpleImageSlider
                  width={896}
                  height={504}
                  images={property[0].img.map((img) => ({ url: img.location }))}
                  showBullets={true}
                  showNavs={true}
                  startIndex={selectedImageIndex}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-16">
        {modalVisible4 && (
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm bg-opacity-50"
          >
            <div
              className="relative bg-white rounded-lg shadow dark:bg-gray-700"
              style={{ width: "80%" }}
            >
              <button
                type="button"
                className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 text-gray-400 bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={toggleModal4}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Close
              </button>
              <div className="p-6 text-center">
                <div className="xl:w-full sm:w-1/2 xl:h-[400px] sm:h-1/2 mr-8 mt-12">
                  <Map
                    initialViewState={{
                      longitude: 76.308411,
                      latitude: 10.026617,
                      zoom: 14,
                    }}
                    mapStyle={import.meta.env.VITE_MAP_STYLE}
                    mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                  >
                    <Marker
                      longitude={76.308411}
                      latitude={10.026617}
                      offsetTop={-20}
                      offsetLeft={-10}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <FaMapMarkerAlt />
                      </div>
                    </Marker>
                  </Map>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="pt-16">
        {modalVisible3 && (
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm bg-opacity-50"
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-6 text-center">
                {isIdPresent ? (
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center space-x-5">
                      <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                        i
                      </div>
                      <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                        <h2 className="leading-relaxed">
                          Scedule a visit for your house
                        </h2>
                        <p className="text-sm text-gray-500 font-normal leading-relaxed">
                          Make a 2-3 hour free visit
                        </p>
                      </div>
                    </div>
                    <div className="mx-auto items-center ">
                      <img
                        className="mx-auto h-[200px]"
                        src={ScheduleSuccess}
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        {/* Content when show is true */}

                        <div className="flex items-center space-x-4"></div>
                        <div className="flex flex-col ">
                          <label className="leading-loose">
                            Your Schedule is Added
                          </label>
                          {/* <DatePicker
                          className="bg-indigo-50"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        /> */}
                        </div>
                        <div className="pt-8 flex items-center p space-x-4">
                          <button
                            onClick={toggleModal3}
                            className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                          >
                            <svg
                              className="w-6 h-6 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center space-x-5">
                      <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                        i
                      </div>
                      <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                        <h2 className="leading-relaxed">
                          Scedule a visit for your house
                        </h2>
                        <p className="text-sm text-gray-500 font-normal leading-relaxed">
                          Make a 2-3 hour free visit
                        </p>
                      </div>
                    </div>
                    <div className="mx-auto items-center ">
                      <img
                        className="mx-auto h-[200px]"
                        src={images}
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        {/* Content when show is true */}

                        <div className="flex items-center space-x-4"></div>
                        <div className="flex flex-col ">
                          <label className="leading-loose">
                            When You Are Planning To Visit?{" "}
                          </label>
                          <DatePicker
                            className="bg-indigo-50"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                        <div className="pt-8 flex items-center p space-x-4">
                          <button
                            onClick={toggleModal3}
                            className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                          >
                            <svg
                              className="w-6 h-6 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            Cancel
                          </button>
                          <button
                            onClick={setScedule}
                            className="bg-blue-500 flex justify-center items-center w-full text-white px-2 py-3 rounded-md focus:outline-none"
                          >
                            submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DetailsPage;
