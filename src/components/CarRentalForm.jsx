import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate, useParams } from 'react-router-dom';
import CustomAlert from '../components/customAlerts'; // Import your CustomAlert component
import LoadingSpinner from '../components/LoadingSpinner'; // Import your LoadingSpinner component
import Navbar from '../components/Navbar'; // Import Navbar component
import Footer from '../components/Footer'; // Import Footer component
import Logo from "../assets/AutoLease.png"

const CarRentalForm = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [dealership, setDealership] = useState(null);
    const [step, setStep] = useState(1);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [address, setAddress] = useState('');
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' }); // State for CustomAlert
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarAndDealership = async () => {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (!token) {
                console.error("No token found in localStorage");
                setAlert({ message: 'No token found. Please log in.', type: 'error' });
                return;
            }
            try {
                console.log("Fetching car data...");
                const carResponse = await axios.get(`https://auto-lease-backend.onrender.com/api/v1/cars/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Car data fetched:", carResponse.data);
                const carData = carResponse.data.data.car;
                setCar(carData);

                console.log("Fetching dealership data...");
                const dealershipResponse = await axios.get(`https://auto-lease-backend.onrender.com/api/v1/dealerships/${carData.dealership}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Dealership data fetched:", dealershipResponse.data);
                setDealership(dealershipResponse.data.data.dealership);
            } catch (error) {
                console.error("Error fetching car or dealership details:", error);
                setAlert({ message: 'Failed to fetch car or dealership details', type: 'error' });
            }
        };
        fetchCarAndDealership();
    }, [id]);

    useEffect(() => {
        if (pickupDate && dropoffDate && car) {
            const startDate = new Date(pickupDate);
            const endDate = new Date(dropoffDate);
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            const price = Number(car.price) || 0; // Cast to number, default to 0 if NaN
            const fee = Number(car.fee) || 0; // Cast to number, default to 0 if NaN
            let cost = days * price;
            if (car.discount > 0) {
                cost *= (1 - car.discount / 100);
            }
            const totalCost = cost + fee;
            setTotal(totalCost);
        }
    }, [pickupDate, dropoffDate, car]);

    const handleNext = () => {
        if (step === 1 && (!pickupDate || !pickupTime || !address || !dropoffDate || !dropoffTime)) {
            setAlert({ message: 'All fields are required.', type: 'warning' });
        } else {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const bookingData = {
            car: id,
            pickupTime: new Date(`${pickupDate}T${pickupTime}`),
            pickupDate: new Date(pickupDate),
            dropoffDate: new Date(dropoffDate),
            dropoffTime: new Date(`${dropoffDate}T${dropoffTime}`),
            deliveryFee: Number(car.fee) || 0, // Ensure deliveryFee is a number
        };

        console.log("Booking Data:", bookingData);

        try {
            // Submit booking data
            const response = await axios.post(`https://auto-lease-backend.onrender.com/api/v1/bookings/${id}`, bookingData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.data.status === 'success') {
                // Fetch user email
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const userResponse = await axios.get('https://auto-lease-backend.onrender.com/api/v1/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("User Response:", userResponse.data.data);
                const userEmail = userResponse.data.data.user.email;

                // Check if email is valid
                if (typeof userEmail !== 'string' || !userEmail.includes('@')) {
                    throw new Error('Invalid email address');
                }

                console.log("User Email:", userEmail);

                // Setup Paystack
                const handler = window.PaystackPop.setup({
                    key: "pk_test_a36077fa842e2748bed420b96ae7c81b2c091b8c", // Use the environment variable for the Paystack key
                    email: userEmail,
                    amount: total * 100, // Amount in kobo
                    currency: 'NGN',
                    callback: function (response) {
                        setIsLoading(false);
                        if (response.status === 'success') {
                            setStep(3); // Move to the receipt download step
                            setAlert({ message: 'Payment Successful', type: 'success' });
                            handleDownload(); // Generate and download the receipt
                        } else {
                            setAlert({ message: 'Payment Failed', type: 'error' });
                        }
                    },
                    onClose: function () {
                        setIsLoading(false);
                        setAlert({ message: 'Payment Cancelled', type: 'info' });
                    }
                });

                handler.openIframe();
            } else {
                setIsLoading(false);
                setAlert({ message: 'Booking Failed', type: 'error' });
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error submitting booking:", error);
            setAlert({ message: 'Error submitting booking', type: 'error' });
        }
    };

    const handleDownload = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;

        // Set up logo placeholder
        doc.rect(margin, margin, 40, 20); // Placeholder rectangle for logo
        doc.setFontSize(10);
        doc.addImage(Logo, 'PNG', margin, margin, 40, 20);

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text('Autolease Receipt', pageWidth / 2, margin + 30, { align: 'center' });

        // Underline the title
        const titleWidth = doc.getTextWidth('Autolease Receipt');
        doc.setLineWidth(0.5);
        doc.line(pageWidth / 2 - titleWidth / 2, margin + 32, pageWidth / 2 + titleWidth / 2, margin + 32);

        // Set font for body text
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Add content
        let yPos = margin + 45;
        const lineHeight = 8;

        const addText = (text) => {
            doc.text(text, margin, yPos);
            yPos += lineHeight;
        };

        addText(`Pickup: ${new Date(`${pickupDate}T${pickupTime}`).toLocaleString()}`);
        addText(`Drop-off: ${new Date(`${dropoffDate}T${dropoffTime}`).toLocaleString()}`);
        addText(`Car: ${car.name} (${car.model})`);

        if (dealership) {
            addText(`Dealership: ${dealership.name}`);
        }

        yPos += lineHeight; // Add some space

        // Total in a box
        doc.setFillColor(240, 240, 240); // Light gray background
        doc.rect(margin, yPos - 5, pageWidth - margin * 2, lineHeight + 2, 'F');
        doc.setFont("helvetica", "bold");
        addText(`Total: NGN ${total.toFixed(2)}`);

        // Footer
        yPos = doc.internal.pageSize.height - margin;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text("Thank you for choosing Autolease!", margin, yPos);
        doc.text("For inquiries, contact support@autolease.com", margin, yPos + lineHeight);

        // Save the PDF
        doc.save("Autolease_Receipt.pdf");
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-4 max-w-lg">
                {isLoading && <LoadingSpinner />} {/* Display the spinner when loading */}
                {alert.message && <CustomAlert message={alert.message} type={alert.type} />} {/* Custom Alert */}
                <h2 className="text-2xl font-bold mb-4">Car Rental Form</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">Pickup Date</label>
                                <input type="date" id="pickupDate" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="mt-1 block w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">Pickup Time</label>
                                <input type="time" id="pickupTime" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="mt-1 block w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-700">Drop-off Date</label>
                                <input type="date" id="dropoffDate" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} className="mt-1 block w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dropoffTime" className="block text-sm font-medium text-gray-700">Drop-off Time</label>
                                <input type="time" id="dropoffTime" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} className="mt-1 block w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full" />
                            </div>
                            <button type="button" onClick={handleNext} className="btn btn-primary">Next</button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total Cost (NGN)</label>
                                <input type="text" id="total" value={total.toFixed(2)} readOnly className="mt-1 block w-full" />
                            </div>
                            <button type="button" onClick={handleBack} className="btn btn-secondary">Back</button>
                            <button type="submit" className="btn btn-primary">Confirm & Pay</button>
                        </>
                    )}
                    {step === 3 && (
                        <div>
                            <p className="text-green-500 font-bold">Payment Successful! Download your receipt below.</p>
                            <button type="button" onClick={handleDownload} className="btn btn-primary">Download Receipt</button>
                        </div>
                    )}
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CarRentalForm;