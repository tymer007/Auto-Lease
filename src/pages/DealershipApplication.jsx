import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input'; // Ensure correct path
import FileUpload from '../components/FileUpload'; // Ensure correct path

const DealershipApplicationPage = () => {
  const [formData, setFormData] = useState({
    dealershipName: "",
    summary: "",
    cacCertificate: null,
    dealershipLicence: null,
    coverImage: null,
    photos: [],
  });

  const [fileStatus, setFileStatus] = useState({
    cacCertificate: false,
    dealershipLicence: false,
    coverImage: false,
    photos: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log(name, value, type, files);
    if (type === "file") {
      if (name === "photos") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: Array.from(files),
        }));
        setFileStatus((prevStatus) => ({
          ...prevStatus,
          photos: files.length > 0,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: files[0],
        }));
        setFileStatus((prevStatus) => ({
          ...prevStatus,
          [name]: true,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get token from local storage
    if (!token) {
      setAlert({ message: "You need to be logged in to submit this form.", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const form = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file, index) => {
            form.append(`${key}[${index}]`, file);
          });
        } else {
          form.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        "https://auto-lease-backend.onrender.com/api/v1/dealerships/users/apply",
        form,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token to headers
          },
        }
      );
      console.log(response.data);

      setAlert({ message: "Application submitted successfully!", type: "success" });
      navigate("/");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setAlert({ message: "There was an error submitting the form!", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Back Button */}
        <div className="p-4">
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            &larr; Back to Home
          </button>
        </div>

        {/* Header */}
        <div className="bg-gray-800 text-white p-4 mb-4 rounded-t-lg">
          <h1 className="text-xl font-bold mb-2">Dealership Application</h1>
          <p>Please fill out the form below to apply for a dealership.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Input
            label="Dealership Name"
            type="text"
            name="dealershipName"
            value={formData.dealershipName}
            onChange={handleChange}
          />
          <FileUpload
            label="CAC Certificate"
            name="cacCertificate"
            onChange={handleChange}
          />
          {fileStatus.cacCertificate && (
            <p className="text-green-500 text-sm">CAC Certificate uploaded.</p>
          )}
          <FileUpload
            label="Dealership Licence"
            name="dealershipLicence"
            onChange={handleChange}
          />
          {fileStatus.dealershipLicence && (
            <p className="text-green-500 text-sm">Dealership Licence uploaded.</p>
          )}
          <Input
            label="Summary"
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
          <FileUpload
            label="Cover Image"
            name="coverImage"
            onChange={handleChange}
          />
          {fileStatus.coverImage && (
            <p className="text-green-500 text-sm">Cover Image uploaded.</p>
          )}
          <FileUpload
            label="Photos"
            name="photos"
            multiple={true}
            onChange={handleChange}
          />
          {fileStatus.photos && (
            <p className="text-green-500 text-sm">Photos uploaded.</p>
          )}

          {/* Submit Button */}
          <div className="p-4">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>

        {/* Alert Message */}
        {alert.message && (
          <div className={`p-4 text-center ${alert.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {alert.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealershipApplicationPage;