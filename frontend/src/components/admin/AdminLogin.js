import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminLogin, reset } from '../../redux/adminSlice'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { admin, isError, isSuccess, isLoading, message } = useSelector((state) => state.admin)
console.log(admin);
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess) {
      navigate('/admin/dashboard')
    }
    dispatch(reset());
  },[admin, isLoading, isSuccess, isError, message, navigate, dispatch])

  const handleClick = (e) => {
    e.preventDefault()

    const adminData = {
      email,
      password
    }
    
    dispatch(adminLogin(adminData))

  }

  return (
   <div className='flex-grow flex items-center justify-center mt-40'> 
     <div className='border rounded-lg bg-white shadow-lg p-8 py-28 px-24'>
      <h1 className='font-semibold text-3xl text-center mt-2 mb-10 '>Admin Login</h1>
      <form>
        <div className='relative my-4'>
          <label className=' mb-2 text-sm '>Email</label>
          <input onChange={(e) => setEmail( e.target.value)} type="text" className='w-full p-1  border-2 border-slate-400 rounded-md  hover:border-blue-700' />
        </div>
        <div className='relative my-4'>
          <label className='mb-2 text-sm'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="text"  className='w-full p-1 border-2 border-slate-400 rounded-md hover:border-blue-700'/>
        </div>
        <div className='flex justify-center mt-7'>
          <button onClick={handleClick} className='bg-blue-500 rounded-md py-2 px-4 text-white hover:bg-blue-700'>Login</button>
        </div>
      </form>
    </div>
   </div>
  )
}

export default AdminLogin