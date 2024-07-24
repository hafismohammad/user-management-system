import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, reset } from '../../redux/userSlice';
import defaultImage from '../../assets/profile-dummy.avif'; 
import {  useNavigate } from 'react-router-dom';
import HeaderComponent from './Header';

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.userAuth);
    const token = user.token;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [image, setImage] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
  
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        if (image) {
            formData.append('image', image);
        }
        
        dispatch(updateProfile({ formData, token })).then(() => {
            console.log('Profile updated successfully');
            navigate('/');
            dispatch(reset());
        });
    };

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <>
         <HeaderComponent />
         <div className="bg-slate-800 border border-slate-400 h-auto w-[40rem] px-8 py-10 rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 max-w-lg mx-auto my-10">
            <div className="text-center mb-6 mt-5">
                <h1 className="text-2xl font-semibold text-white">Welcome {user.name}</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-5 flex justify-center">
                <img
                    src={ user.profileImage ? `/userImage/${user.profileImage}` : defaultImage}
                    alt="Profile"
                    className="relative w-40 h-40 rounded-full"
                />

                </div>

                <div className="text-center mb-5">
                    <input
                        type="file"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                </div>

                <div className="flex flex-col space-y-4 w-[90%] md:w-[80%] mx-auto">
                    <div className="flex items-center space-x-4">
                        <label className="text-2xl h-10 text-white w-[20%]">Name:</label>
                        <input
                            className="w-[80%] h-10 rounded-md px-6 bg-slate-700 text-white"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="text-2xl h-10 text-white w-[20%]">Email:</label>
                        <input
                            className="w-[80%] h-10 rounded-md px-6 bg-slate-700 text-white"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="text-2xl h-10 text-white w-[20%]">Phone:</label>
                        <input
                            className="w-[80%] h-10 rounded-md px-6 bg-slate-700 text-white"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700" type="submit">Save</button>
                </div>
            </form>
        </div>
        </>
       
    );
}

export default EditProfile;
