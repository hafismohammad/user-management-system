import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { register, reset } from "../../redux/userSlice";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.userAuth
  );
  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email, 
        phone,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
      <h1 className="font-semibold text-4xl text-center mt-2 mb-8 text-white">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="relative my-4">
          <label className="text-white mb-2 text-sm block">Enter Your Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[100%] text-white p-1 border-2 border-slate-400 rounded-md bg-transparent hover:border-blue-700"
          />
        </div>
        <div className="relative my-4">
          <label className="text-white mb-2 text-sm block">Enter Your Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setMail(e.target.value)}
            className="w-[100%] text-white p-1 border-2 border-slate-400 rounded-md bg-transparent hover:border-blue-700"
          />
        </div>
        <div className="relative my-4">
          <label className="text-white mb-2 text-sm block">Enter Your Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-[100%] text-white p-1 border-2 border-slate-400 rounded-md bg-transparent hover:border-blue-700"
          />
        </div>
        <div className="relative my-4">
          <label className="text-white mb-2 text-sm block">Enter Your Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[100%] text-white p-1 border-2 border-slate-400 rounded-md bg-transparent hover:border-blue-700"
          />
        </div>
        <div className="relative my-4">
          <label className="text-white text-sm">Enter Your Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            className="w-[100%] text-white p-1 border-2 border-slate-400 rounded-md bg-transparent hover:border-blue-700"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="rounded-md py-2 px-4 text-white bg-cyan-500 hover:bg-cyan-700"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>

      <div className="flex justify-center mt-4">
        <span className="text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default SignUp;
