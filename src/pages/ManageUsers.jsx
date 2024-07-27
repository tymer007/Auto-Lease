import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';


const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      // Check if the user is logged in and has admin privileges
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await axios.get(
          'https://auto-lease-backend.onrender.com/api/v1/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.data.users || []);
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
        <Navbar/>
        <AdminSidebar/>
      <h2 className="text-3xl font-semibold mb-8">Manage Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p>No users to display.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              {/* Add more user details as needed */}
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default ManageUsersPage;