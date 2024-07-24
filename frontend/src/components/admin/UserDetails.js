import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../redux/adminSlice';

function UserDetails() {
  const dispatch = useDispatch();
  const { userData, isLoading, isError, message } = useSelector((state) => state.admin);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const users = userData?.users || [];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <div className="flex justify-center mt-10"> 
        <div className="bg-slate-100 w-full max-w-4xl h-full min-h-[40rem] shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-60 rounded-lg p-8">
          <h1 className="font-semibold text-4xl text-center mb-8 text-gray-700">
            User Details
          </h1>
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md w-full max-w-sm"
              placeholder="Search users by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isLoading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500">{message}</p>
          ) : filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border-t px-6 py-4 text-sm text-gray-700">{user.name}</td>
                      <td className="border-t px-6 py-4 text-sm text-gray-700">{user.email}</td>
                      <td className="border-t px-6 py-4 text-sm text-gray-700">
                        <button className="text-blue-500 hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">No user data available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDetails;
