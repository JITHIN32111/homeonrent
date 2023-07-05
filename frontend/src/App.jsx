import { useEffect, useState } from "react";
import Signup from "./components/signUp/Signup";
import Signin from "./components/signIn/Signin";
import Landing from "./components/landingPage/landing";
import Email from "./components/EmailVerify/Email";
import ListProperty from "./components/listProperty/ListProperty";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Provider/Dashboard";
import Property from "./pages/Provider/Property";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome";
import { useDispatch } from "react-redux";
import { clearDetails } from "./redux/propertySlice";
import AllRequests from "./pages/Admin/AllRequests";
import AllApproved from "./pages/Admin/AllApproved";
import AdminSellerDetails from "./pages/Admin/AdminSellerDetails";
import UserHome from "./pages/User/UserHome";
import UserLogin from "./pages/User/UserLogin";
import UserSignup from "./pages/User/UserSignup";
import PropertyDetails from "./pages/User/PropertyDetails";
import Subscription from "./pages/Provider/Subscription";
function App() {
  const dispatch = useDispatch();

  const adminDetails = useSelector((state) => state.admin.details);
  const userDetails = useSelector((state) => state.user.details);
  const { user } = useSelector((state) => state.auth);
  const propertyDetails = useSelector((state) => state.property.details);

  return (
    <div className="App">
      <Routes>
        {/* Provider Routes */}

        <Route
          path="/"
          element={user ? <Landing /> : <Navigate to="/Signup" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!user ? <Signin /> : <Navigate to="/" />}
        />
        <Route path="/users/:id/verify/:token" element={<Email />} />
        <Route path="/listProperty" element={<ListProperty />} />
        <Route path="/Subscriptionpage" element={<Subscription />} />

        <Route
          path="/dashboard"
          element={propertyDetails ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/properties"
          element={propertyDetails ? <Property /> : <Navigate to="/" />}
        />
       
       
        {/* Provider Routes */}

        {/* Admin Routes */}
        <Route
          path="/Admin/login"
          element={
            !adminDetails ? <AdminLogin /> : <Navigate to="/Admin/home" />
          }
        />
        <Route
          path="/Admin/Home"
          element={
            adminDetails ? <AdminHome /> : <Navigate to="/Admin/login" />
          }
        />
        <Route
          path="/Admin/Home/Requests"
          element={
            adminDetails ? <AllRequests /> : <Navigate to="/Admin/login" />
          }
        />
        <Route
          path="/Admin/Home/Approved"
          element={
            adminDetails ? <AllApproved /> : <Navigate to="/Admin/login" />
          }
        />
        <Route
          path="/Admin/Home/SellersList"
          element={
            adminDetails ? (
              <AdminSellerDetails />
            ) : (
              <Navigate to="/Admin/login" />
            )
          }
        />
        
        
        {/* Admin Routes */}
        <Route path="/user" element={userDetails?<UserHome />:<Navigate to='/user/login'/>} />
        <Route path="/user/register" element={!userDetails?<UserSignup />:<Navigate to='/user' />} />
        <Route path="/user/login" element={!userDetails?<UserLogin />:<Navigate to='/user'/>} />
        <Route path="/user/propertyDetails" element={userDetails?< PropertyDetails />:<Navigate to='/user/login'/>} />
        

      </Routes>
    </div>
  );
}

export default App;
