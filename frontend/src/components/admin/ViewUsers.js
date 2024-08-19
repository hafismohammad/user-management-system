import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import AdminHeader from "./AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import defaultImage from "../../assets/profile-dummy.avif";
import { toast } from "react-toastify";
import { reset, getEditUser } from "../../redux/adminSlice";

function ViewUsers() {
  const { userData } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(defaultImage);

  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = userData?.users || [];

  useEffect(() => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setImage(user.profileImage);
      setPreviewImage(user.profileImage ? `/userImage/${user.profileImage}` : defaultImage);
    }
  }, [userId, users]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (image) {
      formData.append("image", image);
    }
    dispatch(getEditUser({ formData, userId })).then(() => {
      toast.success("Profile updated successfully");
      navigate("/admin/userDetails");
      dispatch(reset());
    });
  };

  return (
    <>
      <AdminHeader />
      <div className="flex justify-center mt-6 px-4">
        <div className="bg-slate-200 w-full max-w-xl min-h-[30rem] shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg p-4">
          <h1 className="font-semibold text-2xl text-center py-4">
            User Profile
          </h1>
          <div className="flex justify-center mb-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="flex flex-col space-y-3 mx-auto">
                <div className="flex justify-center mb-4">
                  <img
                    alt="Profile"
                    src={previewImage}
                    className="w-24 h-24 rounded-full"
                  />
                </div>
                <div className="text-center mb-4">
                  <label
                    htmlFor="file-upload"
                    className="block text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer flex items-center justify-center p-1"
                  >
                    <FaUpload className="mr-1" />
                    Upload Image
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <label className="text-lg text-white w-1/3">
                    Name:
                  </label>
                  <input
                    className="w-2/3 h-8 rounded-md px-3 bg-slate-700 text-white text-sm"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <label className="text-lg text-white w-1/3">
                    Email:
                  </label>
                  <input
                    className="w-2/3 h-8 rounded-md px-3 bg-slate-700 text-white text-sm"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <label className="text-lg text-white w-1/3">
                    Phone:
                  </label>
                  <input
                    className="w-2/3 h-8 rounded-md px-3 bg-slate-700 text-white text-sm"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 px-3 py-1 rounded-md text-white hover:bg-blue-700 text-sm"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUsers;
