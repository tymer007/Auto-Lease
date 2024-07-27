import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-4 p-2 text-gray-800 hover:text-gray-600 z-50 bg-white rounded-md shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '250px', zIndex: 1000 }}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-4 pt-12"> {/* Adjusted padding-top to prevent overlap */}
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          <ul>
            <li className="mb-2 cursor-pointer" onClick={() => navigateTo('/admin-dashboard')}>
              Dashboard
            </li>
            <li className="mb-2 cursor-pointer" onClick={() => navigateTo('/admin/users')}>
              Manage Users
            </li>
            <li className="mb-2 cursor-pointer" onClick={() => navigateTo('/admin/dealerships')}>
              Dealership Applications
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;