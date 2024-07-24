import axios from 'axios';

const API_URL = 'http://localhost:5000/admin';

const adminLogin = async (getAdmin) => {
    const response = await axios.post(`${API_URL}/admin`, getAdmin)
    console.log('response.data heeeeeeereee', response.data);

    if(response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }
    return response.data
}

// Get user details
const getUser = async () => {
    console.log('Fetching user details');
    const response = await axios.get(`${API_URL}/admin/userDetails`);
    console.log('response.data', response.data);

    if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data));
    }
    return response.data;
}

// Logout admin
const logout = () => {
    localStorage.removeItem('admin');
};

const adminService = {
    adminLogin,
    getUser,
    logout
}

export default adminService