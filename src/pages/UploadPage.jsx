import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement
import LoadingSpinner from '../components/LoadingSpinner';
import autoLeaseDealerships from '../assets/autoleaseDealerships.svg';
import littleCard from '../assets/littlecard.svg';
import TabNavigation from '../components/TabNav';
import CustomAlert from '../components/customAlerts';
import Footer from '../components/Footer';
import Input from "../components/Input";
import FileUpload from "../components/FileUpload";

const UploadPage = () => {
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    coverImage: '',
    summary: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    price: '',
    summary: '',
    category: 'basic',
    vin: '',
    imei: '',
    plateNumber: '',
    description: '',
    fee: '',
    discount: '',
    duration: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverImageName, setCoverImageName] = useState('');
  const [photosCount, setPhotosCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAlert({ message: 'User not authenticated.', type: 'error' });
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userIdFromToken = decodedToken.id; // Adjust based on your token's payload structure

        if (!userIdFromToken) {
          setAlert({ message: 'User ID not found in token.', type: 'error' });
          return;
        }

        const response = await axios.get(`https://auto-lease-backend.onrender.com/api/v1/dealerships/${userIdFromToken}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Profile Data:', response.data);
        const dealership = response.data.data.dealership;

        setProfile({
          name: dealership.name || '',
          description: dealership.summary || '',
          coverImage: dealership.coverImage?.url || '/default-profile.png',
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to fetch profile data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setAlert({ message: 'User not authenticated.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    if (!userId) {
      setAlert({ message: 'User ID not found in token.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    // Create FormData manually to have better control
    const submitFormData = new FormData();
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      if (formData[key] !== '') {
        submitFormData.append(key, formData[key]);
      }
    });

    // Add dealership ID
    submitFormData.append('dealership', userId);

    // Add files
    const form = e.target;
    const coverImageFile = form.coverImage.files[0];
    const photoFiles = form.photos.files;

    if (coverImageFile) {
      submitFormData.append('coverImage', coverImageFile);
    }

    if (photoFiles && photoFiles.length > 0) {
      for (let i = 0; i < photoFiles.length; i++) {
        submitFormData.append('photos', photoFiles[i]);
      }
    }

    // Add some default values that might be required by the API
    submitFormData.append('ratingsQuantity', '0');
    submitFormData.append('ratingsAverage', '5');
    submitFormData.append('isAvailable', 'true');
    
    // Add location if required (using a default location)
    submitFormData.append('locations', JSON.stringify([{ "type": "Point", "coordinates": [3.3792, 6.5244] }]));

    // Debug: Log form data contents
    console.log('Form data contents:');
    for (let [key, value] of submitFormData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `https://auto-lease-backend.onrender.com/api/v1/dealerships/${userId}/cars/`,
        submitFormData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Don't set Content-Type header - let axios set it automatically for FormData
          },
        }
      );
      setAlert({ message: 'Vehicle uploaded successfully.', type: 'success' });
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        model: '',
        price: '',
        summary: '',
        category: 'basic',
        vin: '',
        imei: '',
        plateNumber: '',
        description: '',
        fee: '',
        discount: '',
        duration: '',
      });
      setCoverImageName('');
      setPhotosCount(0);
      
      // Reset file inputs
      form.reset();
    } catch (err) {
      console.error('Failed to upload vehicle:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setAlert({ 
        message: `Failed to upload vehicle: ${err.response?.data || err.message}`, 
        type: 'error' 
      });
      setIsSubmitting(false);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageName(file.name);
    }
  };

  const handlePhotosChange = (e) => {
    const files = e.target.files;
    setPhotosCount(files.length);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <CustomAlert message={error} type="error" />;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-gray-700 text-white p-8">
        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            <img src={autoLeaseDealerships} className="w-half" alt="" />
          </div>
          <div className="flex items-center gap-6">
            <img
              src={profile.coverImage}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-2xl font-semibold">{profile.name}</h3>
              <p className="text-sm">{profile.description}</p>
            </div>
          </div>
        </div>
      </section>

      <img src={littleCard} className="w-full" alt="" />
      <section className="container mx-auto mt-8 p-4">
        <div className="flex justify-center mb-8">
          <h2 className="text-3xl font-bold">Autolease Dealerships</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <TabNavigation />

          {alert.message && <CustomAlert message={alert.message} type={alert.type} />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Vehicle Name" 
              name="name" 
              type="text" 
              id="name"
              placeholder="Enter vehicle name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <Input 
              label="Vehicle Model" 
              name="model" 
              type="text" 
              id="model"
              placeholder="Enter vehicle model"
              value={formData.model}
              onChange={handleInputChange}
            />

            <Input 
              label="Price Per Day" 
              name="price" 
              type="number" 
              id="price"
              placeholder="Enter price per day"
              value={formData.price}
              onChange={handleInputChange}
            />

            <Input 
              label="VIN Number" 
              name="vin" 
              type="text" 
              id="vin"
              placeholder="Enter VIN number"
              value={formData.vin}
              onChange={handleInputChange}
            />

            <Input 
              label="IMEI Number" 
              name="imei" 
              type="text" 
              id="imei"
              placeholder="Enter IMEI number"
              value={formData.imei}
              onChange={handleInputChange}
            />

            <Input 
              label="Plate Number" 
              name="plateNumber" 
              type="text" 
              id="plateNumber"
              placeholder="Enter plate number"
              value={formData.plateNumber}
              onChange={handleInputChange}
            />

            <Input 
              label="Summary" 
              name="summary" 
              type="text" 
              id="summary"
              placeholder="Brief vehicle summary"
              value={formData.summary}
              onChange={handleInputChange}
            />

            <Input 
              label="Description" 
              name="description" 
              type="text" 
              id="description"
              placeholder="Detailed vehicle description"
              value={formData.description}
              onChange={handleInputChange}
            />

            <Input 
              label="Fee" 
              name="fee" 
              type="number" 
              id="fee"
              placeholder="Enter additional fee"
              value={formData.fee}
              onChange={handleInputChange}
            />

            <Input 
              label="Discount (%)" 
              name="discount" 
              type="number" 
              id="discount"
              placeholder="Enter discount percentage"
              value={formData.discount}
              onChange={handleInputChange}
            />

            <Input 
              label="Duration (End Date)" 
              name="duration" 
              type="datetime-local" 
              id="duration"
              placeholder="Select end date"
              value={formData.duration}
              onChange={handleInputChange}
            />

            <div className="flex flex-col w-full gap-2">
              <div className="flex justify-between">
                <label htmlFor="category" className="font-semibold capitalize">Category</label>
              </div>
              <select 
                name="category" 
                id="category" 
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="basic">Basic</option>
                <option value="luxury">Luxury</option>
                <option value="classic">Classic</option>
              </select>
            </div>

            <FileUpload
              label="Upload Cover Image"
              name="coverImage"
              onChange={handleCoverImageChange}
              multiple={false}
            />
            {coverImageName && (
              <p className="text-sm text-gray-600 mt-2">Selected: {coverImageName}</p>
            )}

            <FileUpload
              label="Upload Photos"
              name="photos"
              onChange={handlePhotosChange}
              multiple={true}
            />
            {photosCount > 0 && (
              <p className="text-sm text-gray-600 mt-2">{photosCount} photos selected</p>
            )}

            <div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-purple-700 text-white py-3 rounded-md text-lg font-semibold flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-800 transition-colors"
              >
                {isSubmitting ? <LoadingSpinner /> : 'Upload New Vehicle'}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default UploadPage;