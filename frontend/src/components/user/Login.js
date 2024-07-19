import React, { useState } from 'react';
import bgImage from './assets/bg-login.jpg';
import { Link } from 'react-router-dom';

function SignUp() {

  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='min-h-[100vh] flex items-center justify-center pt-[4rem]'>
      <div className='bg-slate-800 py-24 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className='font-semibold text-4xl text-center mt-2 mb-8 text-white'>Sign Up</h1>
        <div className='relative my-4'>
          <label className='text-white mb-2 text-sm block'>Enter Your Email</label>
          <input type="text" name='email' value={email} onChange={(e) => setMail(e.target.value)} className='w-[100%] p-1 px-20 border-2 border-slate-400 rounded-md bg-transparent hover:border-blue-700' />
        </div>
        
        <div className='relative my-4'>
          <label className='text-white mb-2 text-sm block'>Enter Your Password</label>
          <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-[100%] p-1 border-2 border-slate-400 rounded-md bg-transparent hover:border-blue-700' />
        </div>
    
        <div className='flex justify-center mt-4'>
          <span className='text-white'>Don't have an account? <Link to='/signup' className='text-blue-500 hover:underline'>Login</Link></span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
