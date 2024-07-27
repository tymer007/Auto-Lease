import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminPage = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [dealershipsCount, setDealershipsCount] = useState(0);
  const [dealersCount, setDealersCount] = useState(0);
  const [unapprovedDealershipsCount, setUnapprovedDealershipsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch users count
        const usersResponse = await axios.get(
          'https://auto-lease-backend.onrender.com/api/v1/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsersCount(usersResponse.data.data.users.length || 0);

        // Fetch dealerships count
        const dealershipsResponse = await axios.get(
          'https://auto-lease-backend.onrender.com/api/v1/dealerships',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDealershipsCount(dealershipsResponse.data.data.dealerships.length || 0);

        // Fetch dealers count (assuming 'dealers' is a type of user)
        const dealersResponse = await axios.get(
          'https://auto-lease-backend.onrender.com/api/v1/users?role=dealer',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDealersCount(dealersResponse.data.data.users.length || 0);

        // Fetch unapproved dealerships count
        const unapprovedDealershipsResponse = await axios.get(
          'https://auto-lease-backend.onrender.com/api/v1/dealerships?isApproved=false',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUnapprovedDealershipsCount(unapprovedDealershipsResponse.data.data.dealerships.length || 0);

      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <div className="flex items-center bg-gray-800 text-white p-4">
          <AdminSidebar />
          <h1 className="text-4xl font-bold ml-16">Admin Dashboard</h1>
        </div>
        <main className="flex-grow p-4">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">Total Users</h3>
                <p className="text-2xl font-bold">{usersCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">Approved Dealerships</h3>
                <p className="text-2xl font-bold">{dealershipsCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">Total Dealers</h3>
                <p className="text-2xl font-bold">{dealersCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">Unapproved Dealerships</h3>
                <p className="text-2xl font-bold">{unapprovedDealershipsCount}</p>
              </div>
            </div>
          )}
          <Outlet /> {/* This renders the child routes */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;