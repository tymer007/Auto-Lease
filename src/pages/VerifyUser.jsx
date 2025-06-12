import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CustomAlert from '../components/customAlerts'; // Adjust path if necessary

const VerificationPage = () => {
  const { token } = useParams(); // Get token from URL
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleVerification = async () => {
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `https://auto-lease-backend.onrender.com/api/v1/auth/verify/${token}`
      );

      setAlert({ message: response.data.message || 'Email verified successfully!', type: 'success' });

      setTimeout(() => {
        navigate('/'); // Redirect after success
      }, 2000);
    } catch (error) {
      console.error('There was an error with verification!', error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        'Verification link is invalid or has expired.';

      setAlert({ message: errorMessage, type: 'error' });
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
        <h1 className="text-center text-xl font-bold text-gray-700 mb-4">Verify Your Email</h1>

        <button
          onClick={handleVerification}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;