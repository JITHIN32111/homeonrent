import React from "react";
import { useState } from "react";
import OwnerDetials from "../ownerDetails/OwnerDetials";
import { useDispatch, useSelector } from "react-redux";
import { houseDetails } from "../../redux/propertySlice";
import axios from "axios";
import Header from "../landingPage/contents/Header";

import { useNavigate } from "react-router-dom";
import img from "../../assets/back.jpg";
import { propertyAPI } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";

const { addImage, addProperty } = propertyAPI();
function ListProperty() {
  const [showComponent, setShowComponent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [state, setState] = useState({});
  const [image, setImage] = useState();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("files", image[i]);
      }

      // await axios
      //   .post("http://localhost:5000/property/upload", formData)
      //   .then((response) => {
      //     const img = [...response.data];
      //     console.log(img);
      //     dispatch(houseDetails({ ...state, img }));
      //     // setShowComponent(true)
      //     const { sellername: name, email, phone } = user;
      //     console.log(name, email, phone);
      //     let details = { name, email, phone, img, ...state };
      //     console.log(details);
      //     axios
      //       .post("http://localhost:5000/property/listProperty", { details })
      //       .then((response) => {
      //         navigate("/dashboard");
      //       });
      //   });
      const res = await addImage(formData);
      const img = [...res.data];
      dispatch(houseDetails({ ...state, img }));
      const { sellername: name, email, phone } = user;
      let details = { name, email, phone, img, ...state };
      console.log(details);
      const data = await addProperty(details);
      toast.success("property added succesfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  console.log();

  return (
    <>
      <Header />
      <ToastContainer />

      {/* {
      showComponent ? (
        <OwnerDetials />
      ) : ( */}
      <div className=" flex justify-center items-center w-screen h-screen bg-cover bg-center bg-fixed bg-no-repeat">
        <div
          class="container mx-auto my-2 mt-auto lg:mt-10 bg-cover bg-center bg-fixed bg-no-repeat  focus px-4 lg:px-20"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div class="w-full p-8 md:px-12     rounded-2xl shadow-2xl">
            <div class="flex ml-56">
              <h1 class="font-bold uppercase text-4xl"> Add property</h1>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleRegister(event);
              }}
            >
              <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <input
                  class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="title*"
                  name="title"
                  required
                  onChange={(event) => {
                    handleState(event);
                  }}
                />
                <input
                  class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="price*"
                  name="price"
                  required
                  onChange={(event) => {
                    handleState(event);
                  }}
                />
                <input
                  class="w-full bg-gray-50 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="address*"
                  name="address"
                  required
                  onChange={(event) => {
                    handleState(event);
                  }}
                />

                <input
                  class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="sqrmeters*"
                  name="sqrmeters"
                  required
                  onChange={(event) => {
                    handleState(event);
                  }}
                />
                <div>
                  <select
                    required
                    name="type"
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

                <div>
                  <select
                    required
                    name="furnishment"
                    class="block w-full px-4 py-2 h-12 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outlinefocus:ring"
                    onChange={(event) => {
                      handleState(event);
                    }}
                  >
                    <option>Semi-furnished</option>
                    <option>Non-furnished</option>
                    <option>Furnished</option>
                  </select>
                </div>
                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="passwordConfirmation"
                  >
                    Text Area
                  </label>
                  <textarea
                    placeholder="desc"
                    name="desc"
                    onChange={(event) => {
                      handleState(event);
                    }}
                    id="textarea"
                    type="textarea"
                    class="rounded-lg focus:outline-none focus:shadow-outlinefocus:ring block bg-gray-100 text-gray-900 w-full px-4 py-2 mt-2  border border-gray-300  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-white">
                    Image
                  </label>
                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-black"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div class="flex text-sm text-gray-600">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer bg-blue-600 rounded-md font-medium text-white hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span class="">Upload a file</span>
                          <input
                            id="file-upload"
                            required
                            name="files"
                            type="file"
                            multiple
                            onChange={(e) => {
                              setImage(e.target.files);
                            }}
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1 text-black">or drag and drop</p>
                      </div>
                      <p class="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div class="my-4">
					<textarea placeholder="Message*" class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
				</div> */}
              <div class="my-2 w-1/2 lg:w-1/4">
                <button
                  type="submit"
                  class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                  disabled={loading} // Disable button when loading is true
                >
                  {loading ? (
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="mx-auto"
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c3.042 0 5.824-1.135 7.938-3l-2.647-3A7.962 7.962 0 0112 16v4zm5.291-9H12v4h5.291A7.962 7.962 0 0116 12c0-1.654.506-3.187 1.372-4.47l-2.647-3z"
                      ></path>
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* )

} */}
    </>
  );
}

export default ListProperty;
