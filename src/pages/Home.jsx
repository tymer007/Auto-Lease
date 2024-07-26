import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Home() {
    const [cars, setCars] = useState([]);
    const [visibleCars, setVisibleCars] = useState(9);
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

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
        navigate(`/car/${car._id}`, { state: { car } });
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
                        <div className="flex justify-around my-4 sm:flex-row flex-col">
                            <div>
                                <h3 className="font-bold">Wide Range of Vehicles</h3>
                                <p className="mt-2">Choose from our wide selection of vehicles, ranging from compact cars to spacious SUVs.</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Flexible Rental Options</h3>
                                <p className="mt-2">Rent by the hour, day, week, or month - whatever suits your needs best.</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Comprehensive Insurance Coverage</h3>
                                <p className="mt-2">Drive with peace of mind, knowing that you have comprehensive coverage.</p>
                            </div>
                        </div>
                        <div className='flex gap-4 justify-center'>
                            <button className='border-autoPurple border-2 p-1 font-semibold text-autoPurple'>Learn More</button>
                            <button className='text-autoPurple font-bold'>Sign Up</button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mx-8">
                    {cars.slice(0, visibleCars).map((car) => (
                        <div key={car._id} className="bg-white p-4 rounded-3xl shadow-md max-w-96">
                            <p className="text-gray-700 text-start border-gray-700 rounded-xl border-2 max-w-fit p-2">{car.category}</p>
                            <h3 className="text-2xl font-bold text-center text-gray-600">{car.name}</h3>
                            <img src={car.coverImage.url} alt={car.name} className="w-full object-cover rounded-xl py-2" />
                            <div className='flex justify-between pt-2'>
                                <p className="text-autoPurple font-medium place-self-center">₦{car.price}</p>
                                <button
                                    onClick={() => handleCarClick(car)}
                                    className="bg-autoPurple text-white p-2 rounded-3xl place-self-center px-4 "
                                >
                                    Rent
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {cars.length > visibleCars && (
                    <div className="text-end my-4 mx-8">
                        <button onClick={handleSeeMore} className="bg-autoPurple text-white rounded-xl p-3 px-8">See More</button>
                    </div>
                )}

                <section className="text-start mt-12">
                    <div className="relative bg-autoPurple text-white py-8 px-6 rounded-2xl mx-4 md:mx-8 overflow-hidden">
                        <img src="Frame430.svg" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
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