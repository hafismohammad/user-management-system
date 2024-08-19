import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/admin';

const adminLogin = async (getAdmin) => {
    try {
        const response = await axios.post(`${API_URL}/admin`, getAdmin);
        console.log('response.data', response.data);
        if (response.data) {
            localStorage.setItem('admin', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Error during admin login:', error);
        throw error;
    }
};

// Get user details
const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/userDetails`);
        console.log('response.data', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

const viewData = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/viewData`);
        console.log('response.data', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching view data:', error);
        throw error;
    }
};

// Edit user
const getEditUser = async ({ formData, userId }) => {
    try {
        console.log('userData', formData);    
        const response = await axios.put(`${API_URL}/admin/editUser/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('response.data', response.data);
        return response.data;
    } catch (error) {
        console.error('Error editing user:', error);
        throw error;
    }
};

// Create user
const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/admin/createUser`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('response.data', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Delete user
const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/deleteUser/${id}`);
        console.log('response.data', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Logout admin
const logout = () => {
    localStorage.removeItem('admin');
};

const adminService = {
    adminLogin,
    getUser,
    logout,
    viewData,
    getEditUser,
    createUser,
    deleteUser
};

export default adminService;
