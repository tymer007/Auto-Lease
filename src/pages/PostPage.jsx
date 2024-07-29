import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import

const PostPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <section className="h-96 bg-primary-purpler pt-8">
        {/* ... (header content remains the same) ... */}
      </section>
      <section>
        <div>
          <img src="/img/Frame 346 (1).svg" alt="autolease logo" />
        </div>
        <div className="grid justify-center py-8">
          <div className="border-primary-purpler border-2 rounded-xl">
            <div className="flex p-2 font-bold">
              <div className="text-primary-purpler rounded-md px-24 py-3">
                <a href="upload.html">UPLOAD</a>
              </div>
              <div className="rounded-md bg-primary-purpler text-white px-24 py-3">POST</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 p-6">
          {loading ? (
            <p>Loading cars...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            cars.length > 0 ? (
              cars.map((car) => (
                <CarCard
                  key={car.id}
                  category={car.category}
                  name={car.name}
                  image={car.coverImage}
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
    </main>
  );
};

const CarCard = ({ category, name, image, price, description }) => {
  return (
    <div className="border-black border-2 rounded-xl p-8">
      <div>
        <p className="text-primary-purpler border-2 border-primary-purpler bg-transparent w-20 h-10 rounded-lg text-xl font-medium text-center pt-1">{category}</p>
        <h3 className="text-2xl font-bold">{name}</h3>
        <img src={image} alt={name} />
        <p className="text-center text-xl">#{price}</p>
        <div className="text-2xl pt-4">
          <div className="flex justify-center pb-4">
            <button className="bg-primary-purpler text-white rounded-full w-64 h-16">Available Rent</button>
          </div>
          <div className="flex justify-center">
            <button className="bg-transparent text-primary-purpler border-primary-purpler border-2 rounded-full w-64 h-16">Unavailable</button>
          </div>
        </div>
        <p className="text-2xl font-bold pt-8">Description:</p>
        <p className="text-2xl font-medium">{description}</p>
      </div>
    </div>
  );
};

export default PostPage;

