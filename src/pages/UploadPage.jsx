import React from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

const UploadPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated.');
      return;
    }

    // Decode the token to get userId
    let userId;
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId; // Adjust based on your token's payload structure
    } catch (err) {
      console.error('Failed to decode token:', err);
      alert('Failed to authenticate user.');
      return;
    }

    if (!userId) {
      alert('User ID not found in token.');
      return;
    }

    // Create form data
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(
        `https://auto-lease-backend.onrender.com/api/v1/dealerships/${userId}/cars/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Set the content type for FormData
          },
        }
      );
      alert('Vehicle uploaded successfully!');
      // Handle successful response
    } catch (err) {
      console.error('Failed to upload vehicle:', err); // Log error for debugging
      alert('Failed to upload vehicle. Please try again.');
      // Handle error response
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-gray-700 text-white p-8">
        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            <svg className="w-64 h-8" viewBox="0 0 200 24" fill="currentColor">
              <text x="0" y="20" fontSize="24">AUTOLEASE DEALERSHIPS</text>
            </svg>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
            <div>
              <h3 className="text-2xl font-semibold">Ekene Motors</h3>
              <p className="text-sm">The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive</p>
            </div>
          </div>
          <button className="mt-4 bg-white text-gray-700 px-6 py-2 rounded-md text-sm font-medium">Edit Profile</button>
        </div>
      </section>
      
      <section className="container mx-auto mt-8 p-4">
        <div className="flex justify-center mb-8">
          <svg className="w-64 h-8" viewBox="0 0 200 24" fill="currentColor">
            <text x="0" y="20" fontSize="24">AUTOLEASE DEALERSHIPS</text>
          </svg>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex border-2 border-purple-700 rounded-xl mb-8">
            <div className="bg-purple-700 text-white px-12 py-3 rounded-l-xl font-bold">UPLOAD</div>
            <div className="text-purple-700 px-12 py-3 font-bold"><a href="post.html">POST</a></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput label="Vehicle Name" name="vehicle-name" type="text" />
            <FormInput label="Vehicle Model" name="vehicle-model" type="text" />
            <FormInput label="Vehicle Identification Number(VIN)" name="vehicle-identification-number" type="text" />
            <FormInput label="Engine Type" name="engine-type" type="text" />
            <FormInput label="Color" name="color" type="text" />
            <FormInput label="Features and Options" name="features-and-options" type="text" />
            <FormInput label="IMEI" name="imei" type="text" />
            <FormInput label="Price" name="price" type="text" />
            
            <div>
              <label htmlFor="price-filter" className="block text-sm font-medium mb-1">Price Filter</label>
              <select name="price-filter" id="price-filter" className="w-full border-2 border-gray-300 rounded-md p-2 shadow-sm" required>
                <option value="p1">Basic</option>
                <option value="p2">Luxury</option>
                <option value="p3">Classic</option>
              </select>
            </div>

            <div>
              <label htmlFor="vehicle-image" className="block text-sm font-medium mb-1">Upload Vehicle (You Can Upload Multiple)</label>
              <div className="border-2 border-gray-300 rounded-md p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <input type="file" accept="image/*" id="vehicle-image" name="vehicle-image" multiple required className="sr-only" />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full bg-purple-700 text-white py-3 rounded-md text-lg font-semibold">Upload New Vehicle</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

const FormInput = ({ label, name, type }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
      <input type={type} id={name} name={name} className="w-full border-2 border-gray-300 rounded-md p-2 shadow-sm" required />
    </div>
  );
};

export default UploadPage;