import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
import "./SubscriptionComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../landingPage/contents/Header";
import {propertyAPI} from "../../api/api";

const { getSubscription,payment,updateMaxCount} = propertyAPI();
function SubscriptionComponent() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
 const [maxCount,setMaxCount]=useState()
  async function hideButton() {
    console.log(":::");
    try {
      // await axios
      //   .get(`http://localhost:5000/property/getSubscription/${user._id}`)
        await getSubscription(user._id)
        .then((res) => {
          console.log(res.data);
          setMaxCount(res.data)
        });
    } catch (error) {
      // Handle any errors
      console.log(error);
    }
  }
  hideButton()





  async function starterPlan() {
    console.log(":::");
    try {
      // await axios
      //   .post(`http://localhost:5000/property/updateMaxCount/${user._id}`)
        await updateMaxCount(user._id)
        .then((res) => {
          console.log(res);
          navigate("/listProperty");
        });
    } catch (error) {
      // Handle any errors
      console.log(error);
    }
  }


  const [modalVisible, setmodalVisible] = useState(false);
  const toggleModal = () => {
    setmodalVisible(!modalVisible);
  };

  const publishableKey =import.meta.env.VITE_STRIPE_KEY
    
  const [product, setProduct] = useState({
    name: "Headphone",
    price: 5,
  });
  const priceForStripe = 909887;
  const a = [
    {
      id: 1,
      price: 0,
      plan: "Starter",
      text: "You already taken this,please continue with other Subscriptions",
      contents: {
        content1: "Add first two properties",
        content2: "One month support",
        content3: "Free updates",
        content4: "Get schedules,enquries",
      },
      max: 2,
    },
    {
      id: 2,
      plan: "Medium",
      price: 100,
      contents: {
        content1: "Add 5 properties",
        content2: "Five month support",
        content3: "Free updates",
        content4: "Get schedules,enquries",
      },
      max: 5,
    },
    {
      id: 3,
      plan: "Premium",
      price: 150,
      contents: {
        content1: "Add unlimited properties",
        content2: "Ten month support",
        content3: "Free updates",
        content4: "Get schedules,enquries",
      },
      max: 10,
    },
  ];

  const payNow = async (token, details) => {
    const { plan, price, max } = details;
    console.log(max);
    const { _id, sellername, email, phone } = user;
    const sub = { _id, sellername, email, phone, plan, price, max };
    try {
      const data = {
        amount: price * 100,
        token,
        sub,
      };
      const response = 
      // await axios.post(
      //   `http://localhost:5000/property/payment`,
      //   data
      // );
      await payment(data)
      // .then(async()=>{
      //   await axios.post(
      //     'http://localhost:5000/property/updateMaxCount',
      //     { plan: response.data.plan, email: user.email }
      //   )
      // })
      console.log(response.data.plan);

      if (response.status === 200) {
        handleSuccess();
        navigate("/listProperty");
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  const handleSuccess = () => {
    console.log("sucess");
    navigate("/listProperty");
  };
  const handleFailure = () => {
    console.log("faliure");
  };

  return (
    <div>
      <Header />
      <section className="relative   z-20 overflow-hidden bg-white pt-5 pb-12 lg:pt-[30px] lg:pb-[90px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <h2 className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
                  Our Pricing Plan
                </h2>
                <p className="text-body-color text-base">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form.
                </p>
              </div>
            </div>
          </div>
          <div className="-mx-4 flex flex-wrap justify-center">
            {a.map((data, index) => (
              <div className={`w-full px-4 md:w-1/2 lg:w-1/3`} key={index}>
                <div
                  className={`border-primary ${
                    index === 0 ? "" : ""
                  } shadow-pricing relative z-10 mb-10 overflow-hidden rounded-xl border border-opacity-20 bg-white py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 backdrop-filter backdrop-blur-lg`}
                >
                  <span className="text-primary mb-4 block text-lg font-semibold">
                    {data.plan}
                  </span>
                  <h2 className="text-dark mb-5 text-[42px] font-bold">
                    {data.price}
                    <span className="text-body-color text-base font-medium">
                      {" "}
                      / year{" "}
                    </span>
                  </h2>
                  <p className="text-body-color mb-8 border-b border-[#F2F2F2] pb-8 text-base">
                    {index === 0
                      ? data.text
                      : "Perfect for using in a Business website or a client project."}
                  </p>
                  <div className="mb-7">
                    {Object.values(data.contents).map((content, index) => (
                      <p
                        className="text-body-color mb-1 text-base leading-loose"
                        key={index}
                      >
                        {content}
                      </p>
                    ))}
                  </div>
                  {index === 0 ? (
             maxCount==2 ||maxCount==5 ?(
              <h1>
              you alreday purchased it! <br />  please choose other plan

              </h1>
            
             ):
                    <button
                      className="h-8 bg-blue-400 rounded-sm text-white"
                      onClick={starterPlan}
                    >
                      Continue
                    </button>
                  ) : (
                 index==1 && maxCount==5?(
                  <h1>
                  you alreday purchased it! <br />  please choose other plan
    
                  </h1>                    ):
                    <StripeCheckout
                      stripeKey={publishableKey}
                      label="Pay Now"
                      name="Pay With Credit Card"
                      billingAddress
                      shippingAddress
                      amount={data.price * 100}
                      description={`Your total is $${data.price}`}
                      token={(token) => payNow(token, data)}
                    />

                  )}
                  <div>
                    <span class="absolute right-0 top-7 z-[-1]">
                      <svg
                        width="77"
                        height="172"
                        viewBox="0 0 77 172"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="86"
                          cy="86"
                          r="86"
                          fill="url(#paint0_linear)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear"
                            x1="86"
                            y1="0"
                            x2="86"
                            y2="172"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#3056D3" stop-opacity="0.09" />
                            <stop
                              offset="1"
                              stop-color="#C4C4C4"
                              stop-opacity="0"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <span class="absolute right-4 top-4 z-[-1]">
                      <svg
                        width="41"
                        height="89"
                        viewBox="0 0 41 89"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="38.9138"
                          cy="87.4849"
                          r="1.42021"
                          transform="rotate(180 38.9138 87.4849)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.9138"
                          cy="74.9871"
                          r="1.42021"
                          transform="rotate(180 38.9138 74.9871)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.9138"
                          cy="62.4892"
                          r="1.42021"
                          transform="rotate(180 38.9138 62.4892)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.9138"
                          cy="38.3457"
                          r="1.42021"
                          transform="rotate(180 38.9138 38.3457)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.9138"
                          cy="13.634"
                          r="1.42021"
                          transform="rotate(180 38.9138 13.634)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.9138"
                          cy="50.2754"
                          r="1.42021"
                          transform="rotate(180 38.9138 50.2754)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.9138"
                          cy="26.1319"
                          r="1.42021"
                          transform="rotate(180 38.9138 26.1319)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.9138"
                          cy="1.42021"
                          r="1.42021"
                          transform="rotate(180 38.9138 1.42021)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.4157"
                          cy="87.4849"
                          r="1.42021"
                          transform="rotate(180 26.4157 87.4849)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.4157"
                          cy="74.9871"
                          r="1.42021"
                          transform="rotate(180 26.4157 74.9871)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.4157"
                          cy="62.4892"
                          r="1.42021"
                          transform="rotate(180 26.4157 62.4892)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.4157"
                          cy="38.3457"
                          r="1.42021"
                          transform="rotate(180 26.4157 38.3457)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.4157"
                          cy="13.634"
                          r="1.42021"
                          transform="rotate(180 26.4157 13.634)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.4157"
                          cy="50.2754"
                          r="1.42021"
                          transform="rotate(180 26.4157 50.2754)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.4157"
                          cy="26.1319"
                          r="1.42021"
                          transform="rotate(180 26.4157 26.1319)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.4157"
                          cy="1.4202"
                          r="1.42021"
                          transform="rotate(180 26.4157 1.4202)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.9177"
                          cy="87.4849"
                          r="1.42021"
                          transform="rotate(180 13.9177 87.4849)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.9177"
                          cy="74.9871"
                          r="1.42021"
                          transform="rotate(180 13.9177 74.9871)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.9177"
                          cy="62.4892"
                          r="1.42021"
                          transform="rotate(180 13.9177 62.4892)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.9177"
                          cy="38.3457"
                          r="1.42021"
                          transform="rotate(180 13.9177 38.3457)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.9177"
                          cy="13.634"
                          r="1.42021"
                          transform="rotate(180 13.9177 13.634)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.9177"
                          cy="50.2754"
                          r="1.42021"
                          transform="rotate(180 13.9177 50.2754)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.9177"
                          cy="26.1319"
                          r="1.42021"
                          transform="rotate(180 13.9177 26.1319)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.9177"
                          cy="1.42019"
                          r="1.42021"
                          transform="rotate(180 13.9177 1.42019)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.41963"
                          cy="87.4849"
                          r="1.42021"
                          transform="rotate(180 1.41963 87.4849)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.41963"
                          cy="74.9871"
                          r="1.42021"
                          transform="rotate(180 1.41963 74.9871)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.41963"
                          cy="62.4892"
                          r="1.42021"
                          transform="rotate(180 1.41963 62.4892)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.41963"
                          cy="38.3457"
                          r="1.42021"
                          transform="rotate(180 1.41963 38.3457)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.41963"
                          cy="13.634"
                          r="1.42021"
                          transform="rotate(180 1.41963 13.634)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.41963"
                          cy="50.2754"
                          r="1.42021"
                          transform="rotate(180 1.41963 50.2754)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.41963"
                          cy="26.1319"
                          r="1.42021"
                          transform="rotate(180 1.41963 26.1319)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.41963"
                          cy="1.4202"
                          r="1.42021"
                          transform="rotate(180 1.41963 1.4202)"
                          fill="#3056D3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SubscriptionComponent;
