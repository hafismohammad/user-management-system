import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import bgImage from "../src/assets/bg-login.jpg";

// User components
import LoginPage from "./pages/user/LoginPage";
import SignipPage from "./pages/user/SignipPage";
import ProfilePage from "./pages/user/ProfilePage";
import ProfileEditPage from "./pages/user/ProfileEditPage";
// Admin components
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import UserDetailsPage from "./pages/admin/UserDetailsPage";
import ViewUsersPage from "./pages/admin/ViewUsersPage";
import CreateUserPage from "./pages/admin/CreateUserPage";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[100vh] flex flex-col"
    >
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignipPage />} />
            {/* <Route element={<UserAuth/>}> */}
            <Route path="/" element={<ProfilePage />} />
            <Route path="/profile-edit" element={<ProfileEditPage />} />
            {/* </Route> */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/userDetails" element={<UserDetailsPage />} />
            <Route
              path="/admin/viewDetails/:userId"
              element={<ViewUsersPage />}
            />
            <Route path="/admin/createuser" element={<CreateUserPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
