import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { updateProfile, reset } from "../../redux/userSlice";
import defaultImage from "../../assets/profile-dummy.avif";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./Header";
import { toast } from "react-toastify";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.userAuth);
  const token = user.token;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.profileImage ? `/userImage/${user.profileImage}` : defaultImage);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (image) {
      formData.append("image", image);
    }

    dispatch(updateProfile({ formData, token })).then(() => {
      toast.success("Profile updated successfully");
      navigate("/");
      dispatch(reset());
    });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file)); 
  };

  return (
    <>
      <HeaderComponent />
      <div className="bg-slate-800 border border-slate-400 px-4 py-6 mt-32 rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 mx-auto mt-6 max-w-lg w-full">
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold text-white">Welcome {user.name}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-4">
            <img
              src={previewImage} 
              alt="Profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
            />
          </div>

          <div className="text-center mb-4">
            <label
              htmlFor="file-upload"
              className="block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 flex items-center justify-center p-1.5"
            >
              <FaUpload className="mr-1.5" />
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <div className="space-y-3">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
              <label className="text-lg text-white w-full md:w-1/3 text-center md:text-left">Name:</label>
              <input
                className="w-full md:w-2/3 h-8 rounded-md px-4 bg-slate-700 text-white text-sm"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
              <label className="text-lg text-white w-full md:w-1/3 text-center md:text-left">Email:</label>
              <input
                className="w-full md:w-2/3 h-8 rounded-md px-4 bg-slate-700 text-white text-sm"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
              <label className="text-lg text-white w-full md:w-1/3 text-center md:text-left">Phone:</label>
              <input
                className="w-full md:w-2/3 h-8 rounded-md px-4 bg-slate-700 text-white text-sm"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 px-4 py-1.5 rounded-md text-white text-sm hover:bg-blue-700"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
