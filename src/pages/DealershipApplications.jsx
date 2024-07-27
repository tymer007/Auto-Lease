import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminSidebar from "../components/AdminSidebar";
import LoadingSpinner from "../components/LoadingSpinner";

const DealershipApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "https://auto-lease-backend.onrender.com/api/v1/dealerships",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApplications(response.data.data.dealerships || []);
      } catch (err) {
        setError("Error fetching applications");
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
      const ownerId =
        typeof dealership.owner === "object"
          ? dealership.owner._id
          : dealership.owner;

      await axios.patch(
        `https://auto-lease-backend.onrender.com/api/v1/dealerships/users/approve/${ownerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setApplications(applications.filter((app) => app._id !== dealership._id));
      setSuccessMessage("Dealership approved successfully!");
    } catch (err) {
      setError("Error accepting application");
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleReject = async (dealership) => {
    setIsLoadingAction(true);
    setSuccessMessage(null);
    try {
      const ownerId =
        typeof dealership.owner === "object"
          ? dealership.owner._id
          : dealership.owner;

      await axios.patch(
        `https://auto-lease-backend.onrender.com/api/v1/dealerships/users/reject/${ownerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setApplications(applications.filter((app) => app._id !== dealership._id));
      setSuccessMessage("Dealership rejected successfully!");
    } catch (err) {
      setError("Error rejecting application");
    } finally {
      setIsLoadingAction(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AdminSidebar/>
      <div className="flex-grow py-8 px-4 md:px-8 lg:px-16">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-8">Dealership Applications</h2>
          {loading ? (
           <LoadingSpinner/>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : applications.length === 0 ? (
            <p>No applications to review.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-8">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="bg-autoCreamDark p-4 rounded-lg shadow-md"
                >
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
                    src={
                      application.coverImage?.url || "default-cover-image.jpg"
                    }
                    alt={application.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="flex justify-between">
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
              <LoadingSpinner/>
            </div>
          )}
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DealershipApplicationsPage;