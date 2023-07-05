import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
const AdminCharts = ({
  approvedPropertyCount,
  pendingPropertyCount,
  type4BHKCount,
  type3BHKCount,
  type2BHKCount,
  sellerCount,
}) => {
  const bseries = [sellerCount, 2];
  const boptions = {
    chart: {
      type: "pie",
    },
    labels: ["Provider", "Customer"],
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    title: {
      text: "Provider/Customers",
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.bseriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
  };
  const cseries = [approvedPropertyCount, pendingPropertyCount];
  const coptions = {
    chart: {
      type: "pie",
    },
    labels: ["approved", "pending"],
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    title: {
      text: "Status",
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.bseriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      data: [type4BHKCount, type3BHKCount, type2BHKCount],
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["4BHK", "3BHK", "2BHK"],
    },
  };

  const [walletDetails, setwalletDetails] = useState();
  const [total, setTotal] = useState();
  const [modalVisible7, setmodalVisible7] = useState(false);

  const toggleModal7 = () => {
    setmodalVisible7(!modalVisible7);
  };
  async function wallet() {
    try {
      await axios
        .get("http://localhost:5000/property/walletDetails")
        .then((response) => {
          const allPrice = response.data;
          const totalPrice = allPrice.reduce(
            (total, data) => total + data.price,
            0
          );
          setTotal(totalPrice);

          setwalletDetails(allPrice);
        });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    wallet();
    console.log("::::::::");
  }, []);

  return (
    <div className="bg-white p-2 rounded shadow w-full ">
      {" "}
      {/* Set the desired width */}
      <div className="w-full flex items-center   bg-white  relative  flex-col xl:flex-row mx-auto">
        <div id="chart" className="w-2/1 mx-auto">
          <ReactApexChart options={boptions} series={bseries} type="pie" />
        </div>
        <div id="chart" className="w-2/1 mx-auto">
          <ReactApexChart options={coptions} series={cseries} type="pie" />
        </div>
      </div>
      <div className=" w-full flex items-center mt-12  bg-white  relative  flex-col xl:flex-row mx-auto">
        <div className="w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={250}
          />
        </div>
        <div className="w-full">
          <div class=" mt-10 ml-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                class="p-8 h-[200px] mx-auto rounded-t-lg"
                src="https://cdn.pixabay.com/animation/2023/03/10/13/25/13-25-13-552_512.gif"
                alt="product image"
              />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Wallet Total
                </h5>
              </a>

              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹ {total}
                </span>
                <button
                  onClick={toggleModal7}
                  className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Transactions
                </button>
              </div>
            </div>
            {/* <Table /> */}
          </div>
        </div>
      </div>
      {/* modal */}
      <div className="pt-16">
        {modalVisible7 && (
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
                onClick={toggleModal7}
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
                        <th className="p-7 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Plan</th>
                        <th className="p-3 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="flex-1 sm:flex-none">
                      {walletDetails ? (
                        walletDetails.map((data) => (
                          <tr
                            key={data._id}
                            className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                          >
                            <td className="border-grey-light border hover:bg-gray-100 p-3">
                              <h1 className="text-center">{data.sellername}</h1>
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                              {data.email}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                              {data.plan}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                              {new Date(data.createdAt).toLocaleDateString(
                                "en-US"
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center p-4">
                            <h1>No Transactions</h1>
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
      {/* end modal */}
    </div>
  );
};

export default AdminCharts;
