import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../components/customAlerts'; // Ensure the correct path

const VerificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleVerification = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://auto-lease-backend.onrender.com/api/v1/auth/verify',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlert({ message: response.data.message, type: 'success' });
      navigate('/'); // Change to your desired route
    } catch (error) {
      console.error('There was an error with verification!', error);
      setAlert({ message: 'There was an error with verification!', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-autolease-pattern min-h-screen bg-gray-100 flex justify-center items-center relative">
      {alert.message && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: '', type: '' })}
        />
      )}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="absolute inset-0 bg-blue-900 opacity-50 z-0"></div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative z-10">
        <h1 className="text-center text-xl font-bold text-gray-700 mb-4">Verify Your Account</h1>
        <button
          onClick={handleVerification}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {isLoading ? "Loading..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;