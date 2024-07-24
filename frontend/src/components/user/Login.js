import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../../redux/userSlice'
import {toast} from 'react-toastify'
import Spinner from "./Spinner";
import Header from '../../components/user/Header'; 

 
function Login() {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');

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
      navigate("/");
    }
    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    }
    dispatch(login(userData))

  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <div  className='flex-grow flex items-center justify-center mt-40'>
    <div className="bg-slate-800  border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
      <h1 className='font-semibold text-4xl text-center mt-2 mb-8 text-white'>Login</h1>

      <form onSubmit={handleSubmit} >
        <div className='relative my-4'>
          <label className='text-white mb-2 text-sm '>Enter Your Email</label>
          <input
            type="text"
            name='email'
            value={email}
            onChange={(e) => setMail(e.target.value)}
            className='w-full p-1 mt-2 border-2 text-white border-slate-400 rounded-md bg-transparent hover:border-blue-700'
          />
        </div>
        <div className='relative my-4'>
          <label className='text-white mb-2 text-sm '>Enter Your Password</label>
          <input
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-1 mt-2 border-2 text-white border-slate-400 rounded-md bg-transparent hover:border-blue-700'
          />
        </div>
        <div className='flex justify-center mt-4'>
          <button className="rounded-md py-2 px-4 text-white bg-cyan-500 hover:bg-cyan-700" type="submit">Login</button>
        </div>
      </form>

      <div className='flex justify-center mt-4'>
        <span className='text-white'>Don't have an account? <Link to='/signup' className='text-blue-500 hover:underline'>Sign Up</Link></span>
      </div>
    </div>
    </div>
     
    </>
  );
}

export default Login;
