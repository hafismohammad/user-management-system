import React, { useEffect } from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getUserDetails, reset, adminLogout } from "../../redux/adminSlice"

function AdminHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { admin, isError, isSuccess, message } = useSelector((state) => state.admin)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate("/admin/userDetails")
    }

    dispatch(reset())
  }, [admin, isError, isSuccess, message, navigate, dispatch])

  const handleUserDetailsClick = () => {
    dispatch(getUserDetails())
  }

  const handleLogout = async () => {
    dispatch(adminLogout());
    dispatch(reset());
    navigate('/admin');
  }

  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link to="#" className="text-xl font-bold">
          UMS
        </Link>
      </div>

      <div className="flex space-x-4">
      <button onClick={handleUserDetailsClick} className="hover:underline">
          User Details
        </button>
        <button  className="hover:underline">
          Create User
        </button>
      </div>

      <ul className="flex space-x-4">
        {admin ? 
         <li>
         <button onClick={handleLogout} className="flex items-center space-x-1">
           <FaSignOutAlt /> <span>Logout</span>
         </button>
       </li>
       :
       <li>
          <Link to="#" className="flex items-center space-x-1">
            <FaSignInAlt /> <span>Login</span>
          </Link>
        </li>
      }
       
        
      </ul>
    </header>
  )
}

export default AdminHeader
