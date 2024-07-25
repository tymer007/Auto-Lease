import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://auto-lease-backend.onrender.com/api/v1/dealerships', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your auth token here if required
          },
        });
        setApplications(response.data);
      } catch (err) {
        setError('Error fetching applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.post(
        `https://auto-lease-backend.onrender.com/api/v1/dealerships/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your auth token here if required
          },
        }
      );
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      setError('Error accepting application');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        `https://auto-lease-backend.onrender.com/api/v1/dealerships/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your auth token here if required
          },
        }
      );
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      setError('Error rejecting application');
    }
  };

  return (
    <div className="font-sans">
      <Navbar />

      <header className="relative bg-gray-800 text-white">
        <img
          src="Frame185.png"
          alt="Admin Dashboard"
          className="w-full h-48 sm:h-64 md:h-96 lg:h-120 object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl text-center font-bold">
            Admin Dashboard
          </h1>
        </div>
      </header>

      <main className="py-8 px-4 md:px-8 lg:px-16">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-8">Dealership Applications</h2>
          {loading ? (
            <p>Loading applications...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : applications.length === 0 ? (
            <p>No applications to review.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map(application => (
                <div key={application._id} className="p-4 border border-gray-300 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{application.name}</h3>
                  <p className="mt-2 text-gray-700">{application.details}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleAccept(application._id)}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(application._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;