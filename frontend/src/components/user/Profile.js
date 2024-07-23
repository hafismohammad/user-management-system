import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import defaultImage from '../../assets/profile-dummy.avif'; 
import { Link } from 'react-router-dom';

function Profile() {
  // const [image, setImage] = useState(null);
  const userData = useSelector((store) => store.userAuth.user);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }
  console.log('userData', userData.profileImage);

  return (
    <div className="bg-slate-800 border border-slate-400 h-[37rem] w-[40rem] px-8 py-10 rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 max-w-lg mx-auto my-10">
      <div className="text-center mb-6 mt-5">
        <h1 className="text-2xl font-semibold text-white">Welcome {userData.name}</h1>
      </div>

      <div className="mb-5 flex justify-center">
        <img
          src={userData.profileImage ? `/userImage/${userData.profileImage}` : defaultImage}
          alt="Profile"
          className="relative w-40 h-40 rounded-full"
        />
      </div>

      <div className="flex flex-col space-y-4 w-[90%] md:w-[80%] mx-auto">
        <div className="flex items-center space-x-4">
          <label className="text-2xl text-white w-[20%]">Name:</label>
          <div className="w-[80%] h-14 text-white px-6 flex items-center bg-slate-700 rounded-md">
            {userData.name}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-2xl text-white w-[20%]">Email:</label>
          <div className="w-[80%] h-14 text-white px-6 flex items-center bg-slate-700 rounded-md">
            {userData.email}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-2xl text-white w-[20%]">Phone:</label>
          <div className="w-[80%] h-14 text-white px-6 flex items-center bg-slate-700 rounded-md">
            {userData.phone}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700">
          <Link to='/profile-edit'>Edit</Link>
        </button>
      </div>
    </div>
  );
}

export default Profile;
