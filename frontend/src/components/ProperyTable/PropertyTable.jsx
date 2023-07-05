import React, { useEffect, useState } from "react";
import "./PropertyTable.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import SimpleImageSlider from "react-simple-image-slider";
import {propertyAPI} from '../../api/api'
const {getProperty,updateProperty,getPropertyEdit,addImage,addNewImage,deleteImg,deleteProperty,getSchedules}=propertyAPI()
const PropertyTable = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [details, setDetails] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalVisible2, setmodalVisible2] = useState(false);
  const [modalVisible3, setmodalVisible3] = useState(false);
  const [image, setImage] = useState([]);
  const [ExistingImg, setExistingImg] = useState([]);
  const [state, setState] = useState({});
  const [propertyId, setPropertyId] = useState();
  const [modalVisible0, setmodalVisible0] = useState(false);
  const [modalVisible9, setModalVisible9] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [property, setProperty] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const toggleModal0 = () => {
    setmodalVisible0(!modalVisible0);
  };
  const individualProperty = (id) => {
console.log(id);  
};


  const toggleModal9 = (index) => {
    setSelectedImageIndex(index);
    setModalVisible9(!modalVisible9);
  };
  const toggleModal = () => {
    setmodalVisible(!modalVisible);
  };
  const toggleModal2 = () => {
    setmodalVisible2(!modalVisible2);
  };
  const toggleModal3 = () => {
    setmodalVisible3(!modalVisible3);
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
      const details = { ...state };
  
      const response=await updateProperty(details,propertyId)
        .then(() => {
          Swal("Updated!", "status updated as approved", "success").then(() => {
            toggleModal2();
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
  const updateDetails = async (id) => {

    setPropertyId(id);
   
         await getPropertyEdit(id).then((details) => {
          setProperty(details.data);
          console.log(details.data);
        });
  };

  const updateImage = async (id) => {
    console.log(id);
    try {
      // const response = await axios.get(
      //   `http://localhost:5000/property/getPropertyEdit/${id}`
      // );
      const response=await getPropertyEdit(id)
      const data = response.data.img;
      setExistingImg(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleImage = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("files", image[i]);
      }

      // await axios
      //   .post("http://localhost:5000/property/upload", formData)
      await addImage(formData)
        .then((response) => {
          const img = [...response.data];
          // axios
          //   .post("http://localhost:5000/property/pushImg", { img, propertyId })
             addNewImage(img,propertyId)
            .then((response) => {
              Swal("Updated!", "status updated as approved", "success").then(
                () => {
                  // navigate(`/editProperty?id=${id}`)
                  toggleModal3();
                }
              );
            });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImage((prevImage) => [...prevImage, ...files]);
  };
  const handleDeleteImage = (index) => {
    setImage((prevImage) => {
      const updatedImage = [...prevImage];
      updatedImage.splice(index, 1);
      return updatedImage;
    });
  };
  const handleDeleteExistingImage = async (size) => {
    try {
      // await axios.post(
      //   `http://localhost:5000/property/deleteImg/${propertyId}/${size}`
      // );
      await deleteImg(propertyId,size)
      setExistingImg((prevImages) =>
        prevImages.filter((img) => img.size !== size)
      );
    } catch (error) {
      console.error("Error deleting existing image:", error);
    }
  };

  const deleteDetails = (id) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this property!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          // await axios.post(
          //   `http://localhost:5000/property/deleteProperty/${id}`
          // );
          await deleteProperty(id)
          setDetails((prevDetails) =>
            prevDetails.filter((data) => data._id !== id)
          );
          swal("Deleted!", "Your property has been deleted.", "success");
        } catch (error) {
          console.log(error);
          // Handle the error condition appropriately
        }
      }
    });
  };
  const findSchedules = async (id) => {
    try {
      // const response = await axios.get(
      //   `http://localhost:5000/property/getSchedules/${id}`
      // );
      const response=await getSchedules(id)
      console.log(response.data);
      setSchedules(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response=await getProperty(user.email)
        console.log(response);
        const data = response.data;
        setDetails(data);
      } catch (error) {
        console.log(error);
        // Handle the error condition appropriately
      }
    };

    fetchData();
  }, [user.email]);
  // Reload the page automatically when the component mounts

  return (
    <div className="mr-4">
      <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-black-200">
          <tr className="bg-gray-100   flex flex-col flex-no wrap sm:table-row hidden rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="p-7 text-left">Title</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left" width="110px">
              Status
            </th>
            <th className="p-3 text-left" width="110px">
              Edit/Delete
            </th>
            <th className="p-3 text-left" width="110px">
              Schedules
            </th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {details.length > 0 ? (
            details.map((data) => (
              <tr
                className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                key={data.id}
              >
                <td    onClick={() => {
          toggleModal0();
          updateDetails(data._id)
        }} className="border-grey-light border hover:bg-gray-100 p-3">
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
                <td
                  className={`border-grey-light border hover:bg-gray-100 p-3 ${
                    data.status === "approved"
                      ? "text-green-800"
                      : "text-red-400"
                  } hover:text-blue-600 hover:font-medium cursor-pointer`}
                >
                  {data.status}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  <button
                    type="button"
                    class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    // onClick={() => updateDetails(data._id)}
                    onClick={() => {
                      toggleModal2();
                      updateDetails(data._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() => deleteDetails(data._id)}
                  >
                    Delete
                  </button>
                </td>
                <td
                  className={`border-grey-light border hover:bg-gray-100 p-3
             hover:text-blue-600 hover:font-medium cursor-pointer`}
                >
                  <button
                    type="button"
                    class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    // onClick={() => findSchedules(data._id)}
                    onClick={() => {
                      toggleModal();
                      findSchedules(data._id);
                    }}
                  >
                    Check
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                <h1>No properties</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Schedule Modal */}
      <div className="pt-16">
        {modalVisible && (
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
                <div className="xl:w-full sm:w-1/2 xl:h-[400px] sm:h-1/2 mr-8 mt-12">
                  <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                    <thead className="text-black-200">
                      <tr className="bg-gray-100   flex flex-col flex-no wrap sm:table-row hidden rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                        <th className="p-7 text-left">E-mail</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="flex-1 sm:flex-none">
                      {schedules ? (
                        schedules.map((data) => (
                          <tr
                            key={data._id}
                            className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                          >
                            <td className="border-grey-light border hover:bg-gray-100 p-3">
                              <h1 className="text-center">{data.email}</h1>
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                              {data.phone}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                              {data.sceduleDate}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center p-4">
                            <h1>No Schedules</h1>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Schedule Modal */}

      {/* editmodal */}

      <div className="pt-16">
        {modalVisible2 && (
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
                onClick={toggleModal2}
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
                <div className="w-full mx-auto p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                  <div className="flex">
                    <h1 className="font-bold uppercase lg:text-4xl sm:text-2xl">
                      Edit your Property
                    </h1>
                  </div>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleRegister(event);
                    }}
                  >
                    <div
                      className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5"
                      style={{ maxHeight: "400px", overflowY: "auto" }}
                    >
                      <input
                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="title*"
                        name="title"
                        value={state.title || property.title}
                        required
                        onChange={(event) => {
                          handleState(event);
                        }}
                      />
                      <input
                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="price*"
                        value={state.price || property.price}
                        name="price"
                        required
                        onChange={(event) => {
                          handleState(event);
                        }}
                      />
                      <input
                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="address*"
                        value={state.address || property.address}
                        name="address"
                        required
                        onChange={(event) => {
                          handleState(event);
                        }}
                      />
                      <input
                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="sqrmeters*"
                        value={state.sqrmeters || property.sqrmeters}
                        name="sqrmeters"
                        required
                        onChange={(event) => {
                          handleState(event);
                        }}
                      />
                      <input
                        class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="desc*"
                        value={state.desc || property.desc}
                        required
                        name="desc"
                        onChange={(event) => {
                          handleState(event);
                        }}
                      />

                      <div>
                        <select
                          required
                          name="type"
                          value={state.type || property.type}
                          class="block w-full px-4 py-2 h-12 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outlinefocus:ring"
                          onChange={(event) => {
                            handleState(event);
                          }}
                        >
                          <option>4BHK</option>
                          <option>3BHK</option>
                          <option>2BHK</option>
                        </select>
                      </div>

                      <h1
                        onClick={() => {
                          toggleModal3();
                          updateImage(property._id);
                        }}
                        //  onClick={() => toggleModal3()}
                      >
                        Update Image
                      </h1>
                    </div>

                    {/* <div class="my-4">
                        <textarea placeholder="Message*" class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
                    </div> */}
                    <div class="my-2 w-1/2 lg:w-1/4">
                      <button
                        type="submit"
                        class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                          focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* editmodal */}

      {/* editImageModal */}

      <div className="pt-16">
        {modalVisible3 && (
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
                onClick={toggleModal3}
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
                <h1>galloooo</h1>
                <div>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleImage(event);
                    }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-white">
                        Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-black"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-blue-600 rounded-md font-medium text-white hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                required
                                name="files"
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1 text-black">or drag and drop</p>
                          </div>
                          <p className="text-xs text-black">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-2 w-1/2 lg:w-1/4">
                      <button
                        type="submit"
                        className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                  <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                    <div class="-m-1 flex flex-wrap md:-m-2">
                      {image &&
                        Array.from(image).map((img, index) => (
                          <div class="flex w-1/3 flex-wrap">
                            <div class="w-full p-1 md:p-2">
                              <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src={URL.createObjectURL(img)}
                              />
                            </div>
                            <button
                              onClick={() => handleDeleteImage(index)}
                              className="text-red-500 font-bold mt-1"
                            >
                              Delete
                            </button>
                          </div>
                        ))}

                      {ExistingImg.map((img, index) => (
                        <div class="flex w-1/3 flex-wrap">
                          <div class="w-full p-1 md:p-2">
                            <img
                              alt="gallery"
                              class="block h-full w-full rounded-lg object-cover object-center"
                              src={img.location}
                            />
                          </div>
                          <button
                            //   onClick={() => handleDeleteImage(index)}
                            className="text-red-500 font-bold mt-1"
                            onClick={() => handleDeleteExistingImage(img.size)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* editImageModal */}

{/* //details modal */}
<div className="pt-16">
        {modalVisible0 && (
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
                className="absolute top-9 left-1/2 transform -translate-x-1/2 z-10 text-gray-400 bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={toggleModal0}
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
                <div className="w-full mx-auto p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                  <div className="flex">
                    <h1 className="font-bold uppercase lg:text-1xl mx-auto sm:text-2xl">
                      Property details
                    </h1>
                  </div>
                  <form
                    class="w-full max-w-lg mt-4 overflow-x-hidden"
                    style={{ maxHeight: "550px", overflowY: "auto" }}
                  >
                    <div class="flex flex-wrap -mx-3 ">
                      <div class="w-full md:w-1/2 px-3 lg:mb-6 sm:mb-2 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-first-name"
                        >
                          Title
                        </label>
                        <input
                          value={property.title}
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Jane"
                        />
                      </div>
                      <div class="w-full md:w-1/2 px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-last-name"
                        >
                          Type
                        </label>
                        <input
                          value={property.type}
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
                      <div class="w-full md:w-1/2 px-3 lg:mb-0 sm:mb-2 mt-4 lg:mt-0 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-first-name"
                        >
                          Price
                        </label>
                        <input
                          value={"₹" + property.price}
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Jane"
                        />
                      </div>
                      <div class="w-full md:w-1/2 px-3">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-last-name"
                        >
                          Sqrmeter
                        </label>
                        <input
                          value={property.sqrmeters}
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div class="flex flex-wrap w-full ">
                      <div class="w-full mt-n4">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Description
                        </label>
                        <input
                          value={property.desc}
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type=""
                          placeholder="******************"
                        />
                      </div>
                      <div class="w-full mt-2">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Address
                        </label>
                        <input
                          value={property.address}
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type=""
                          placeholder="******************"
                        />
                      </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-city"
                        >
                          Country
                        </label>
                        <input
                          value={"india"}
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          type="text"
                          placeholder="Albuquerque"
                        />
                      </div>
                      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-state"
                        >
                          city
                        </label>
                        <div class="relative">
                          <input
                            value={ property?.location?.city}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="text"
                            placeholder="Albuquerque"
                          />

                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                        </div>
                      </div>
                      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-zip"
                        >
                          Street
                        </label>
                        <input
                          value={property?.location?.streetName}
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="text"
                          placeholder="90210"
                        />
                      </div>
                    </div>
                  </form>
                  <h1  onClick={toggleModal9} className="">See Photos*</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
{/* //details modal */}



{/* //image slide modal */}
<div className="pt-16">
        {modalVisible9 && (
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 flex items-center justify-center z-50 px-4 overflow-x-hidden overflow-y-auto"
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 text-gray-400 bg-transparent hover:bg-white hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={toggleModal9}
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
                  images={property.img.map((img) => ({ url: img.location }))}
                  showBullets={true}
                  showNavs={true}
                  startIndex={selectedImageIndex}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* //image slide modal */}

    </div>
  );
};

export default PropertyTable;
