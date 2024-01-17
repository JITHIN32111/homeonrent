import property from "../../../backend/src/models/property";
import axiosConfig from "../config/axiosConfig";

// ownerAuthAPI
const authAPI = () => {
  const doSignup = async (data) => {
    const res = await axiosConfig.post("/auth/register", data);
    return res;
  };

  const doSignin = async (email, password) => {
    const res = await axiosConfig.post("/auth/login", { email, password });
    return res;
  };

  const getOwnerDetails = async () => {
    const res = await axiosConfig.get("/auth/getAllSellers");
    return res;
  };
  const getAllSellers = async () => {
    const res = await axiosConfig.get(`/auth/getAllSellers`);
    return res;
  };

  return { doSignup, doSignin, getOwnerDetails, getAllSellers };
};
// ownerAuthAPI

// propertyAPI
const propertyAPI = () => {
     const addImage = async (formData) => {
     const res = await axiosConfig.post("/property/upload", formData);
    return res;
  };

  const addProperty = async (details) => {
    const res = await axiosConfig.post("/property/listProperty", { details });
    return res;
  };
  const getProperty = async (email) => {
    const res = await axiosConfig.get(`/property/getProperty/${email}`);
    return res;
  };
  const updateProperty = async (details, propertyId) => {
    const res = await axiosConfig.post("/property/updateDetails", {
      details,
      propertyId,
    });
    return res;
  };
  const getPropertyEdit = async (id) => {
    const res = await axiosConfig.get(`/property/getPropertyEdit/${id}`);
    return res;
  };
  const addNewImage = async (img, propertyId) => {
    const res = await axiosConfig.post("/property/pushImg", {
      img,
      propertyId,
    });
    return res;
  };
  const deleteImg = async (propertyId, size) => {
    const res = await axiosConfig.post(
      `/property/deleteImg/${propertyId}/${size}`
    );
    return res;
  };
  const deleteProperty = async (id) => {
    const res = await axiosConfig.post(`/property/deleteProperty/${id}`);
    return res;
  };
  const getSchedules = async (id) => {
    const res = await axiosConfig.get(`/property/getSchedules/${id}`);
    return res;
  };
  const getAllPropertyToAdmin = async (id) => {
    const res = await axiosConfig.get(`/property/getAllPropertyToAdmin`);
    return res;
  };
  const getAllProperty = async () => {
    const res = await axiosConfig.get(`/property/getAllProperty`);
    return res;
  };
  const adminApproval = async (title) => {
    const res = await axiosConfig.get(`/property/changeStatus/${title}`);
    return res;
  };
  const getLatestApprovedProperties = async () => {
    const res = await axiosConfig.get(`/property/getLatestApprovedProperties`);
    return res;
  };
  const setEnqueryDetails = async (id, data) => {
    const res = await axiosConfig.post(
      `/property/setEnqueryDetails/${id}`,
      data
    );
    return res;
  };
  const getIndividualProperty = async (id) => {
    const res = await axiosConfig.get(`/property/getIndividualProperty/${id}`);
    return res;
  };
  const setSchedule = async (id, formattedStartDate, Id) => {
    const res = await axiosConfig.post(
      `/property/setScedule/${id}/${formattedStartDate}/${Id}`
    );
    return res;
  };
  const getDetailsUserSide = async () => {
    const res = await axiosConfig.get(`/property/getDetailsUserSide`);
    return res;
  };
  const getFilterProperties = async (locationValue, propertyTypeValue, priceValue) => {
    const res = await axiosConfig.post("/property/getFilterProperties", {
           location: locationValue,
           propertyType: propertyTypeValue,
        price: priceValue
    });
    return res;
  };
  const getSubscription = async (id) => {
    const res = await axiosConfig.get(`/property/getSubscription/${id}`);
    return res;
  };
  const checkSubscription = async (email) => {
    const res = await axiosConfig.post(`/property/checkSubscription/${email}`);
    return res;
  };


  const updateMaxCount = async (id) => {
    const res = await axiosConfig.post(`/property/updateMaxCount/${id}`);
    return res;
  };
  const payment = async (data) => {
    const res = await axiosConfig.post(`/property/payment`,data);
    return res;
  };
  return {
    checkSubscription,
    payment,
    updateMaxCount,
    getSubscription,
    getFilterProperties,
    getDetailsUserSide,
    setSchedule,
    getIndividualProperty,
    setEnqueryDetails,
    getLatestApprovedProperties,
    adminApproval,
    getAllProperty,
    getAllPropertyToAdmin,
    addImage,
    addProperty,
    getProperty,
    updateProperty,
    getPropertyEdit,
    addNewImage,
    deleteImg,
    deleteProperty,
    getSchedules,
  };
};
// propertyAPI

// userAPI
const userAPI = () => {
  const getUserDetails = async (Id) => {
    const res = await axiosConfig.get(`/user/getUserDetails/${Id}`);
    return res;
  };
  const sendOwnerdetails = async (Id, id) => {
    const res = await axiosConfig.post(`/user/sendSellerDetails/${Id}/${id}`);
    return res;
  };
  const userLoginWithGoogle = async (details) => {
    const res = await axiosConfig.post(`/user/login`,details);
    return res;
  };
  const userLogin = async (email) => {
    const res = await axiosConfig.get(`/user/googleLogin/${email}`);
    return res;
  };
  const userSignup = async (details) => {
    const res = await axiosConfig.post(`/user/register`,details);
    return res;
  };
  return { getUserDetails, sendOwnerdetails,userLogin,userLoginWithGoogle,userSignup};
};
// userAPI

export { authAPI, propertyAPI, userAPI };
