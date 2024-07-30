import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const VerificationPrompt = () => {
  const [isVerified, setIsVerified] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please log in.');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get('https://auto-lease-backend.onrender.com/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the API response includes user data with `isVerified` and `email`
        console.log(response);
        const userData = response.data.data.user;
        setIsVerified(userData.isVerified);
        setEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRequestVerification = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        'https://auto-lease-backend.onrender.com/api/v1/auth/request/token/logged-in',
        { email }, // Send the email in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response); // Check the response
      setMessage('Verification link sent! Please check your email.');
    } catch (error) {
      console.error('Error requesting verification:', error);
      console.log('Error Response:', error.response); // Log the error response
      if (error.response) {
        setMessage('Failed to send verification link');
      }
    } finally {
      setLoading(false);
    }
  };

  // Conditional rendering based on `isVerified` state
  if (isVerified === null) {
    return <LoadingSpinner />; // Loading state
  }

  if (isVerified) {
    return null; // Component is invisible if `isVerified` is true
  }

  return (
    <div className="verification-prompt bg-autoCream text-autoPurple p-4 text-center">
      <p>Your account is not verified.</p>
      <button
        onClick={handleRequestVerification}
        className="mt-2 px-4 py-2 bg-autoPurple text-white rounded hover:bg-autoPurple-dark"
        disabled={loading}
      >
        {loading ? 'Requesting...' : 'Request Verification'}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default VerificationPrompt;