import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://auto-lease-backend.onrender.com/api/v1/dealerships', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data); // Log the response data to see its structure
        setApplications(response.data.data.dealerships || []); // Access the correct path
      } catch (err) {
        setError('Error fetching applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleAccept = async (dealership) => {
    setIsLoadingAction(true);
    setSuccessMessage(null);
    try {
      const ownerId = typeof dealership.owner === 'object' ? dealership.owner._id : dealership.owner;

      await axios.patch(
        `https://auto-lease-backend.onrender.com/api/v1/dealerships/users/approve/${ownerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setApplications(applications.filter(app => app._id !== dealership._id));
      setSuccessMessage('Dealership approved successfully!');
    } catch (err) {
      setError('Error accepting application');
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleReject = async (dealership) => {
    setIsLoadingAction(true);
    setSuccessMessage(null);
    try {
      const ownerId = typeof dealership.owner === 'object' ? dealership.owner._id : dealership.owner;

      await axios.patch(
        `https://auto-lease-backend.onrender.com/api/v1/dealerships/users/reject/${ownerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setApplications(applications.filter(app => app._id !== dealership._id));
      setSuccessMessage('Dealership rejected successfully!');
    } catch (err) {
      setError('Error rejecting application');
    } finally {
      setIsLoadingAction(false);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-8">
            {applications.map(application => (
              <div key={application._id} className="bg-autoCreamDark p-4 rounded-lg shadow-md">
                <div className="mb-2">
                  <span className="text-sm text-autoCream border border-gray-700 rounded-full px-2 py-1">
                    {application.license}
                  </span>
                </div>
                <h3 className="text-xl text-autoCream font-bold mb-2">
                  {application.name}
                </h3>
                <p className="text-sm text-autoCream mb-4">
                  {application.summary}
                </p>
                <img 
                  src={application.coverImage?.url || 'default-cover-image.jpg'} 
                  alt={application.name} 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-center mb-2">
                 
                </div>
                
                <div className='flex justify-between'>
                  <button
                    onClick={() => handleAccept(application)}
                    className="bg-autoCream text-autoPurple px-4 py-2 rounded-full w-[48%]"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(application)}
                    className="border border-autoCream text-autoCream px-4 py-2 rounded-full w-[48%]"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
          {isLoadingAction && (
            <div className="flex justify-center items-center mt-4">
              <div className="w-8 h-8 border-4 border-t-4 border-autoPurple border-solid rounded-full animate-spin"></div>
            </div>
          )}
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;