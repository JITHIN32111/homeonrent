import React from 'react';
import { clearUserDetails } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
function Nav() {
    const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUserDetails());
    navigate("/user/login");
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-5">
          <h1 className="text-xl md:text-2xl font-bold">HomeOnRent.in</h1>
          <ul className="flex items-center space-x-5 text-xs md:text-base">
            <li>Features</li>
            <li>Trending</li>
            <li>About</li>
          </ul>
          <button onClick={handleLogout} className="bg-yellow-400 px-5 py-2 rounded-xl text-xs md:text-base">
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
