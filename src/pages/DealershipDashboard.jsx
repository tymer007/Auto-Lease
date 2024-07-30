import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import LoadingSpinner from '../components/LoadingSpinner';
import autoLeaseDealerships from '../assets/autoleaseDealerships.svg';
import littleCard from '../assets/littlecard.svg';
import CustomAlert from '../components/customAlerts';
import Footer from '../components/Footer';



const DealershipDashboardUpload = () => {
    const [page, setPage] = useState(1);
    const [profile, setProfile] = useState({
        name: '',
        description: '',
        coverImage: '',
        summary: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = localStorage.getItem('token');
        if (!token) {
            setAlert({ message: 'User not authenticated.', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData(e.target);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        if (!userId) {
            setAlert({ message: 'User ID not found in token.', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(
                `https://auto-lease-backend.onrender.com/api/v1/dealerships/${userId}/cars/`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setAlert({ message: 'Vehicle uploaded successfully.', type: 'success' });
            setIsSubmitting(false);
        } catch (err) {
            console.error('Failed to upload vehicle:', err);
            setAlert({ message: 'Failed to upload vehicle. Please try again.', type: 'error' });
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

                {page === 1 && (
                    <>
                        <div className="max-w-2xl mx-auto">
                            <button className="flex flex-col items-center z-10"
                                onClick={() => setPage(1)}>
                            </button>
                            <button className="flex flex-col items-center z-10"
                                onClick={() => setPage(2)}>
                            </button>

                            {alert.message && <CustomAlert message={alert.message} type={alert.type} />}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormInput label="Vehicle Name" name="name" type="text" />
                                <FormInput label="Vehicle Model" name="model" type="text" />
                                <FormInput label="Price" name="price" type="text" />
                                <FormInput label="Summary" name="summary" type="text" />

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                                    <select name="category" id="category" className="w-full border-2 border-gray-300 rounded-md p-2 shadow-sm" required>
                                        <option value="basic">Basic</option>
                                        <option value="luxury">Luxury</option>
                                        <option value="classic">Classic</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="cover-image" className="block text-sm font-medium mb-1">Upload Cover Image</label>
                                    <div className="border-2 border-gray-300 rounded-md p-8 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <input type="file" accept="image/*" id="cover-image" name="coverImage" required className="sr-only" onChange={handleCoverImageChange} />
                                        <label htmlFor="cover-image" className="mt-2 inline-block text-sm font-medium text-gray-700 cursor-pointer">Choose File</label>
                                        {coverImageName && <p className="mt-2 text-sm text-gray-500">{coverImageName}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="photos" className="block text-sm font-medium mb-1">Upload Photos</label>
                                    <div className="border-2 border-gray-300 rounded-md p-8 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <input type="file" accept="image/*" id="photos" name="photos" multiple required className="sr-only" onChange={handlePhotosChange} />
                                        <label htmlFor="photos" className="mt-2 inline-block text-sm font-medium text-gray-700 cursor-pointer">Choose Files</label>
                                        {photosCount > 0 && <p className="mt-2 text-sm text-gray-500">{photosCount} photos selected</p>}
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="w-full bg-purple-700 text-white py-3 rounded-md text-lg font-semibold flex justify-center items-center">
                                        {isSubmitting ? <LoadingSpinner /> : 'Upload New Vehicle'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
                {page === 2 && (
                    <>
                    </>
                )}


            </section>
            <Footer></Footer>
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

export default DealershipDashboardUpload;