import React, { useEffect, useState } from "react";
import HeaderComponent from "../admin/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, reset } from "../../redux/adminSlice";
import { toast } from "react-toastify";

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const { admin, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/admin/userDetails");
    }
    dispatch(reset());
  }, [admin, isLoading, isSuccess, isError, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !name || !phone) {
      console.log("heerre");
      toast.error("Please fill the fields");
      return;
    }

    if (/^\d/.test(name)) {
      toast.error("Name cannot start with a number");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (parseInt(phone) < 0 || phone.length !== 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      const userData = {
        name,
        email,
        phone,
        password,
      };

      dispatch(createUser(userData)).then(() => {
        console.log("User created successfully");
        navigate("/admin/userDetails");
        dispatch(reset());
      });
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className="flex-grow flex items-center justify-center mt-6">
        <div className="bg-slate-800 w-[65%] h-[40%] mb-4 mt-7 border border-slate-400 rounded-md p-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="font-semibold text-xl text-center mt-2 mb-4 text-white">
            Create User
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-2">
              <label className="text-white mb-1 text-sm block">
                Enter Your Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-white p-1 border border-slate-400 rounded-md bg-transparent hover:border-blue-700"
              />
            </div>
            <div className="relative mb-2">
              <label className="text-white mb-1 text-sm block">
                Enter Your Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setMail(e.target.value)}
                className="w-full text-white p-1 border border-slate-400 rounded-md bg-transparent hover:border-blue-700"
              />
            </div>
            <div className="relative mb-2">
              <label className="text-white mb-1 text-sm block">
                Enter Your Phone
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-white p-1 border border-slate-400 rounded-md bg-transparent hover:border-blue-700"
              />
            </div>
            <div className="relative mb-2">
              <label className="text-white mb-1 text-sm block">
                Enter Your Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-white p-1 border border-slate-400 rounded-md bg-transparent hover:border-blue-700"
              />
            </div>
            <div className="relative mb-2">
              <label className="text-white mb-1 text-sm block">
                Enter Your Confirm Password
              </label>
              <input
                type="password"
                name="cpassword"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                className="w-full text-white p-1 border border-slate-400 rounded-md bg-transparent hover:border-blue-700"
              />
            </div>
            <div className="flex justify-center mt-2">
              <button
                className="rounded-md py-1 px-3 ml-auto mt-2 mr-2 text-white bg-cyan-500 hover:bg-cyan-700"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
