import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, deleteUser } from '../../redux/adminSlice';
import { useNavigate } from 'react-router-dom';

function UserDetails() {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData, isLoading, isError, message } = useSelector((state) => state.admin);
  const users = userData?.users || [];

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleView = (userId) => {
    navigate(`/admin/viewDetails/${userId}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <AdminHeader />
      <div className="flex justify-center mt-10 px-4">
        <div className="bg-slate-100 w-full max-w-4xl h-full min-h-[37rem] shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg p-8">
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
          ) : sortedUsers.length > 0 ? (
            <div className="overflow-y-auto max-h-[60vh]">
              <div className="hidden sm:block">
                <table className="table-auto w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Delete User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-blue-100">
                        <td className="border-t px-4 py-2 text-sm text-gray-700">{user.name}</td>
                        <td className="border-t px-4 py-2 text-sm text-gray-700">{user.email}</td>
                        <td className="border-t px-4 py-2 text-sm text-gray-700">
                          <button
                            onClick={() => handleView(user._id)}
                            className="text-white bg-green-500 rounded-md px-2 py-1 hover:bg-green-600"
                          >
                            View
                          </button>
                        </td>
                        <td className="border-t px-4 py-2 text-sm text-gray-700">
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-white bg-red-500 rounded-md px-2 py-1 hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="sm:hidden">
                {sortedUsers.map((user) => (
                  <div key={user._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="text-gray-700">
                      <div className="font-semibold">Name: {user.name}</div>
                      <div>Email: {user.email}</div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <button
                        onClick={() => handleView(user._id)}
                        className="text-white bg-green-500 rounded-md px-4 py-2 hover:bg-green-600"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-white bg-red-500 rounded-md px-4 py-2 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
