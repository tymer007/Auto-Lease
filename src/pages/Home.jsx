import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Home() {
    const [cars, setCars] = useState([]);
    const [visibleCars, setVisibleCars] = useState(9);
    const [selectedCar, setSelectedCar] = useState(null);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('https://auto-lease-backend.onrender.com/api/v1/cars/');
                console.log(response.data);
                setCars(response.data.data.cars);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchCars();
    }, []);

    const handleSeeMore = () => {
        setVisibleCars((prev) => prev + 9);
    };

    const handleCarClick = (car) => {
        setSelectedCar(car);
    };

    const handleSearchClick = () => {
        setSearchActive(true);
    };

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <div className="text-center my-20">
                    <h1 className="text-4xl font-bold text-autoPurple">Seamless Car Rental Experience In Jos</h1>
                    <p className='text-autoPurple'>Discover a wide range of vehicles and flexible rental options.</p>
                    <div className="flex justify-center my-4 gap-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-2 border-autoPurple bg-autoCream p-2 rounded-xl px-4"
                            onClick={handleSearchClick}
                        />
                        <button className="bg-autoPurple text-white p-2 px-8 rounded-xl">Search</button>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-autoPurple font-medium text-autoCream p-2 rounded-lg">Learn More</button>
                        <button className="border-autoPurple border-2 font-medium text-autoPurple p-2 rounded-lg">Sign Up</button>
                    </div>
                </div>
                
                {!searchActive && (
                    <div className="text-center my-8">
                        <img src="wingcars.png" alt="Cars" className="mx-auto" />
                    </div>
                )}
                
                {!searchActive && (
                    <div className="text-center my-24">
                        <h2 className="text-4xl font-bold">Discover Our Key Features and Benefits</h2>
                        <p>Our car rental service in Jos offers a wide range of vehicles, flexible rental options, and
                            comprehensive insurance coverage. Book online today for a worry-free driving experience.</p>
                        <div className="flex justify-around my-4">
                            <div>
                                <h3 className="font-bold">Wide Range of Vehicles</h3>
                                <p>Choose from our wide selection of vehicles, ranging from compact cars to spacious SUVs.</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Flexible Rental Options</h3>
                                <p>Rent by the hour, day, week, or month - whatever suits your needs best.</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Comprehensive Insurance Coverage</h3>
                                <p>Drive with peace of mind, knowing that you have comprehensive coverage.</p>
                            </div>
                        </div>
                        <div className='flex gap-4 justify-center'>
                            <button className='border-autoPurple border-2 p-1 font-semibold text-autoPurple'>Learn More</button>
                            <button className='text-autoPurple font-bold'>Sign Up</button>
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {cars.slice(0, visibleCars).map((car) => (
                        <div key={car._id} className="bg-white p-4 rounded shadow-md">
                            <img src={car.coverImage.url} alt={car.name} className="w-full h-48 object-cover rounded" />
                            <h3 className="text-xl font-bold">{car.name}</h3>
                            <p className="text-gray-700">Model: {car.model}</p>
                            <p className="text-gray-700">Category: {car.category}</p>
                            <p className="text-autoPurple font-bold">₦{car.price}</p>
                            <p className="text-sm text-gray-600">Rating: {car.ratingsAverage} ({car.ratingsQuantity} reviews)</p>
                            <p className="text-sm text-gray-600">{car.summary}</p>
                            <button
                                onClick={() => handleCarClick(car)}
                                className="bg-autoPurple text-white p-2 rounded w-full mt-2"
                            >
                                Rent
                            </button>
                        </div>
                    ))}
                </div>
                
                {cars.length > visibleCars && (
                    <div className="text-center my-4">
                        <button onClick={handleSeeMore} className="bg-autoPurple text-white p-2 rounded">See More</button>
                    </div>
                )}
                
                {selectedCar && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded max-w-md">
                            <h2 className="text-2xl font-bold">{selectedCar.name}</h2>
                            <p>Model: {selectedCar.model}</p>
                            <p>Category: {selectedCar.category}</p>
                            <p>Price: ₦{selectedCar.price}</p>
                            <p>Fee: ₦{selectedCar.fee}</p>
                            <p>Discount: {selectedCar.discount}%</p>
                            <p>{selectedCar.summary}</p>
                            <button
                                onClick={() => setSelectedCar(null)}
                                className="bg-red-500 text-white p-2 rounded mt-4"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <section className="text-start mt-12">
                    <div className="relative bg-autoPurple text-white py-8 px-6 rounded-2xl mx-4 md:mx-8 overflow-hidden">
                        <img src="Frame180.png" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-semibold mb-4">Become A Dealer</h2>
                            <p className="mb-4">Register your dealership and put up your vehicle for rental</p>
                            <button className="bg-white text-autoPurple font-semibold py-2 px-4 rounded-lg">Register</button>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Home;