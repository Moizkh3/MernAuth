import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate('/');
        toast.success('Logged Out Successfully');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />

      {userData ? (
        <div className="relative">
          <button
            onClick={() => setUserData(prev => ({ ...prev, showDropdown: !prev.showDropdown }))}
            className="w-8 h-8 flex justify-center items-center rounded-full bg-slate-900 text-white font-bold uppercase outline-none"
          >
            {userData.name[0]}
          </button>
          <div className={`absolute ${userData.showDropdown ? 'block' : 'hidden'} top-full right-0 z-10 text-black rounded pt-2 w-max`}>
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm rounded shadow-lg border border-gray-200">
              {!userData.isAccountVerified && (
                <li onClick={() => { sendVerificationOtp(); setUserData(prev => ({ ...prev, showDropdown: false })) }} className="py-2 px-4 hover:bg-gray-200 cursor-pointer border-b border-gray-200">
                  Verify Email
                </li>
              )}
              <li onClick={() => { navigate('/change-password'); setUserData(prev => ({ ...prev, showDropdown: false })) }} className="py-2 px-4 hover:bg-gray-200 cursor-pointer border-b border-gray-200">
                Change Password
              </li>
              <li onClick={() => { logout(); setUserData(prev => ({ ...prev, showDropdown: false })) }} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-10 py-3 rounded-full font-medium shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          Login
          <img src={assets.arrow_icon} alt="" className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
