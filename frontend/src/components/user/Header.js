import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../redux/userSlice";
import LOGO from "../../assets/logo.png";

function HeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white ">
      <div>
        <Link to="/">
          <img src={LOGO} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>
      <ul className="flex space-x-4">
        {user ? (
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1"
            >
              <FaSignOutAlt /> <span>Logout </span>
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className="flex items-center space-x-1">
                <FaSignInAlt /> <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="/signup" className="flex items-center space-x-1">
                <FaUser /> <span>Sign Up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default HeaderComponent;
