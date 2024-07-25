import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const VerificationPrompt = () => {
  const [isVerified, setIsVerified] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // Check the decoded token
        setIsVerified(decodedToken.isVerified);
        setEmail(decodedToken.email); // Assuming the token contains the user's email
      } catch (error) {
        console.error('Error decoding token:', error);
        setMessage('Error decoding token.');
      }
    } else {
      console.log('No token found in localStorage');
      setMessage('No token found. Please log in.');
    }
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
        return setMessage(`Failed to send verification link`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isVerified === null) {
    return <p>Loading...</p>; // Loading state
  }

  if (isVerified) {
    return null;
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