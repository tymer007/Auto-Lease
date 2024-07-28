import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';

const CarRentalForm = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [step, setStep] = useState(1);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [licenseFront, setLicenseFront] = useState(null);
    const [licenseBack, setLicenseBack] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`https://auto-lease-backend.onrender.com/api/v1/cars/${id}`);
                setCar(response.data.data.car);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };
        fetchCar();
    }, [id]);

    useEffect(() => {
        if (pickupDate && dropoffDate && car) {
            const startDate = new Date(pickupDate);
            const endDate = new Date(dropoffDate);
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            let cost = days * car.price;
            if (car.discount > 0) {
                cost *= (1 - car.discount / 100);
            }
            const totalCost = cost + car.fee;
            setTotal(totalCost);
        }
    }, [pickupDate, dropoffDate, car]);

    const handleNext = () => {
        if (step === 1 && (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime)) {
            alert('All fields are required.');
        } else if (step === 2 && (!username || !address || !licenseFront || !licenseBack)) {
            alert('All fields are required.');
        } else {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handlePaymentSuccess = () => {
        setStep(step + 1);
    };

    const handleDownload = () => {
        const doc = new jsPDF();
        doc.text(`Pickup Date & Time: ${pickupDate} ${pickupTime}`, 10, 10);
        doc.text(`Drop-off Date & Time: ${dropoffDate} ${dropoffTime}`, 10, 20);
        doc.text(`Total Paid: $${total.toFixed(2)}`, 10, 30);
        doc.save('receipt.pdf');
    };

    if (!car) return <div>Loading...</div>;

    return (
        <div className="p-4">
            {step === 1 && (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Pickup and Drop-off Date and Time</h1>
                    <form className="space-y-4">
                        <label className="block">
                            Pickup Date:
                            <input className="border rounded px-2 py-1" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
                        </label>
                        <label className="block">
                            Pickup Time:
                            <input className="border rounded px-2 py-1" type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} min="09:00" max="17:00" required />
                        </label>
                        <label className="block">
                            Drop-off Date:
                            <input className="border rounded px-2 py-1" type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} required />
                        </label>
                        <label className="block">
                            Drop-off Time:
                            <input className="border rounded px-2 py-1" type="time" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} min="09:00" max="17:00" required />
                        </label>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="button" onClick={handleNext}>Next</button>
                    </form>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Summary and Calculation</h1>
                    <p>Pickup Date & Time: {pickupDate} {pickupTime}</p>
                    <p>Drop-off Date & Time: {dropoffDate} {dropoffTime}</p>
                    <p>Number of Days: {Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))}</p>
                    <p>Total Cost: ${total.toFixed(2)}</p>
                    <form className="space-y-4">
                        <label className="block">
                            Username:
                            <input className="border rounded px-2 py-1" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </label>
                        <label className="block">
                            Address:
                            <input className="border rounded px-2 py-1" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </label>
                        <label className="block">
                            Front View of Driver's License:
                            <input className="border rounded px-2 py-1" type="file" accept="image/*" onChange={(e) => setLicenseFront(e.target.files[0])} required />
                        </label>
                        <label className="block">
                            Back View of Driver's License:
                            <input className="border rounded px-2 py-1" type="file" accept="image/*" onChange={(e) => setLicenseBack(e.target.files[0])} required />
                        </label>
                        <br />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="button" onClick={handleNext}>Next</button>
                        <br />
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" type="button" onClick={handleBack}>Back</button>
                    </form>
                </div>
            )}
            {step === 3 && (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Payment</h1>
                    <p>Total Amount: ${total.toFixed(2)}</p>
                    <form className="space-y-4">
                        <label className="block">
                            Card Number:
                            <input className="border rounded px-2 py-1" type="text" required />
                        </label>
                        <label className="block">
                            Expiry Date:
                            <input className="border rounded px-2 py-1" type="text" required />
                        </label>
                        <label className="block">
                            CVV:
                            <input className="border rounded px-2 py-1" type="text" required />
                        </label>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="button" onClick={handlePaymentSuccess}>Successful Payment</button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" type="button" onClick={handleBack}>Back</button>
                    </form>
                </div>
            )}
            {step === 4 && (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Receipt</h1>
                    <p>Pickup Date & Time: {pickupDate} {pickupTime}</p>
                    <p>Drop-off Date & Time: {dropoffDate} {dropoffTime}</p>
                    <p>Total Paid: ${total.toFixed(2)}</p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleDownload}>Download Receipt</button>
                </div>
            )}

            <div className="p-4">
                <img src={car.image} alt={car.slug} />
                <h1 className="text-3xl font-bold">{car.name}</h1>
                <p>Model: {car.model}</p>
                <p>Category: {car.category}</p>
                <p>Price: ₦{car.price}</p>
                <p>Fee: ₦{car.fee}</p>
                <p>Discount: {car.discount}%</p>
                <p>{car.summary}</p>

                <img src={car.coverImage.url} alt={car.name} className="w-full h-48 object-cover rounded" />
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p className="text-gray-700">Model: {car.model}</p>
                <p className="text-gray-700">Category: {car.category}</p>
                <p className="text-autoPurple font-bold">₦{car.price}</p>
                <p className="text-sm text-gray-600">Rating: {car.ratingsAverage} ({car.ratingsQuantity} reviews)</p>
                <p className="text-sm text-gray-600">{car.summary}</p>

                {/* Add any additional details or actions here */}
            </div>
        </div>
    );
};

export default CarRentalForm;
