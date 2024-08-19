// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Register user
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  console.log("this is the repsonse of login: ", response.data);
  if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Update Profile 
const updateProfile = async ({formData, token}) => {
    // const user = JSON.parse(localStorage.getItem('user'));
 console.log('update profile',formData);
    const response = await axios.put(`${API_URL}/update-profile`, formData,{
      headers: {
          'Content-Type': 'multipart/form-data',
         'Authorization': `Bearer ${token}`
      }  
  } );
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    logout,
    login,
    updateProfile
};

export default authService;
