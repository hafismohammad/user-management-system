import React from 'react';
import AdminHeader from './AdminHeader';

function Dashboard() {
  return (
    <>
      <AdminHeader />
      <div className="flex justify-center mt-10"> {/* Increased margin-top */}
        <div className="bg-slate-200 w-full max-w-4xl h-full min-h-[40rem] shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg">
          <h1 className="font-semibold text-4xl text-center py-16">
            Welcome to the Admin Dashboard!
          </h1>
          <div className="flex justify-center">
            {/* Additional dashboard content can go here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
