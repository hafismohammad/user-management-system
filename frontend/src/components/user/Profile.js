import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import defaultImage from "../../assets/profile-dummy.avif";
import { Link } from "react-router-dom";
import HeaderComponent from "./Header";
import LOGO from "../../assets/logo.png";

function Profile() {
  const userData = useSelector((store) => store.userAuth.user);

  if (!userData) {
    return (
      <>
      <HeaderComponent />
      <div className="flex flex-col items-center justify-center mt-44">
        <img src={LOGO} alt="Logo" className="h-32 w-auto mb-11 " />  
        <h1 className="text-white text-5xl mb-5 font-bold text-center">Welcome to UserHub</h1>     
        <h1 className="text-white text-xl flex justify-center">Go to Login/Sign Up</h1>
      </div>
    </>
    
    );
  }

  return (
    <>
      <HeaderComponent />
      <div className="bg-slate-800 border border-slate-400 px-6 mt-32  py-6 rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 max-w-lg mx-auto my-6">
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold text-white">
            Welcome {userData.name}
          </h1>
        </div>

        <div className="mb-4 flex justify-center">
          <img
            src={
              userData.profileImage
                ? `/userImage/${userData.profileImage}`
                : defaultImage
            }
            alt="Profile"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col space-y-3 w-[90%] mx-auto">
          <div className="flex items-center space-x-3">
            <label className="text-lg text-white w-1/3">Name:</label>
            <div className="w-2/3 h-10 text-white px-4 flex items-center bg-slate-700 rounded-md text-sm">
              {userData.name}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-lg text-white w-1/3">Email:</label>
            <div className="w-2/3 h-10 text-white px-4 flex items-center bg-slate-700 rounded-md text-sm">
              {userData.email}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-lg text-white w-1/3">Phone:</label>
            <div className="w-2/3 h-10 text-white px-4 flex items-center bg-slate-700 rounded-md text-sm">
              {userData.phone}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 px-4 py-1.5 rounded-md text-white text-sm hover:bg-blue-700">
            <Link to="/profile-edit">Edit</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
