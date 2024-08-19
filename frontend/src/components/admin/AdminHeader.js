import React, { useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserDetails, reset, adminLogout } from "../../redux/adminSlice";
// import LOGO from "../../assets/logo.png";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, isError, isSuccess, message } = useSelector(
    (state) => state.admin
  );

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await dispatch(adminLogout()).unwrap();
      dispatch(reset());
      navigate("/admin");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Handle user details click
  const handleUserDetailsClick = () => {
    dispatch(getUserDetails());
  };

  // Handle create user click
  const handleCreateUserClick = () => {
    navigate("/admin/createuser");
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && admin) {
      navigate("/admin/userDetails");
    }

    // Reset the state only when necessary, e.g., on logout
    return () => dispatch(reset());
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link to="/admin/dashboard">
          {/* <img src={LOGO} alt="Logo" className="h-12 w-auto" /> */}
        </Link>
      </div>

      <div className="flex space-x-4">
        <button onClick={handleUserDetailsClick} className="hover:underline">
          User Details
        </button>
        <button onClick={handleCreateUserClick} className="hover:underline">
          Create User
        </button>
      </div>

      <ul className="flex space-x-4">
        {admin ? (
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1"
            >
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </li>
        ) : (
          <li>
            <Link to="/admin/login" className="flex items-center space-x-1">
              <FaSignInAlt /> <span>Login</span>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default AdminHeader;
