import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import LoadingSpinner from '../components/LoadingSpinner';
import TabNavigation from '../components/TabNav';
import autoLeaseDealerships from '../assets/autoleaseDealerships.svg';
import littleCard from '../assets/littlecard.svg';
import Footer from '../components/Footer';

const PostPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({ name: '', description: '', coverImage: '/default-profile.png' });

  // Function to get the user ID from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token'); // Adjust as needed if token is stored elsewhere
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // Log the decoded token
        return decodedToken.id; // Adjust based on your token's payload structure
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userIdFromToken = decodedToken.id; // Adjust based on your token's payload structure

        if (!userIdFromToken) {
          setError('User ID not found in token.');
          setLoading(false);
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

  useEffect(() => {
    const fetchCars = async () => {
      const userId = getUserIdFromToken(); // Get user ID from token
      if (!userId) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://auto-lease-backend.onrender.com/api/v1/dealerships/${userId}/cars/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in the request headers
          },
        });

        console.log('Fetched Cars Response:', response.data); // Log the fetched data

        // Access the cars data from the nested structure
        const carsData = response.data.data.cars;
        console.log('Cars Data:', carsData); // Log the cars data

        if (!Array.isArray(carsData)) {
          console.error('Expected an array but received:', carsData);
          setError('Failed to fetch cars. Please try again later.');
        } else {
          setCars(carsData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cars:', err); // Log error for debugging
        setError('Failed to fetch cars. Please try again later.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []); // Empty dependency array to run once on mount

  return (
    <main>
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
        <TabNavigation></TabNavigation>
        <div className="grid grid-cols-3 gap-8 p-6">
          {loading ? (
            <LoadingSpinner />  
          ) : error ? (
            <p>{error}</p>
          ) : (
            cars.length > 0 ? (
              cars.map((car) => (
                <CarCard
                  key={car.id}
                  category={car.category}
                  name={car.name}
                  image={car.coverImage.url}
                  price={car.price}
                  description={car.summary}
                />
              ))
            ) : (
              <p>No cars available.</p>
            )
          )}
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
};

const CarCard = ({ category, name, image, price, description }) => {
  return (
    <div className="border-2 border-gray-300 rounded-xl p-4 bg-cream">
      <div className="mb-4">
        <p className="text-primary-purpler border-2 border-primary-purpler bg-transparent w-20 h-10 rounded-lg text-lg font-medium text-center pt-1">{category}</p>
        <h3 className="text-2xl font-bold my-2">{name}</h3>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
        <p className="text-xl font-bold text-center mb-2">₦{price}</p>
      </div>
      <div className="text-center">
        <button className="bg-primary-purpler text-white rounded-full w-40 h-10 mb-2">Available Rent</button>
        <button className="bg-transparent text-primary-purpler border-2 border-primary-purpler rounded-full w-40 h-10">Unavailable</button>
      </div>
      <p className="text-xl font-bold mt-4">Description:</p>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default PostPage;

