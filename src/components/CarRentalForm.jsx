import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate, useParams } from 'react-router-dom';

const CarRentalForm = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [step, setStep] = useState(1);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [address, setAddress] = useState('');
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

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
        if (step === 1 && (!pickupDate || !pickupTime || !address || !dropoffDate || !dropoffTime)) {
            alert('All fields are required.');
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

    const date = new Date();

    if (!car) return <div>Loading...</div>;

    return (
        <div className="p-4">
            {step === 1 && (
                <div>
                    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden md:max-w-md mt-8">
                        <div className="p-4 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-800">{car.name}</h2>
                            <span className="text-base text-gray-500 border p-1 rounded-lg">{car.category}</span>
                        </div>
                        <div className="flex justify-center p-4 rounded-xl shadow-2xl border-2 z-10">
                            <img src={car.coverImage.url} alt={car.name} className="w-full h-48 object-cover rounded" />
                            {/* <img src={car.coverImage.url} alt={car.name} className="w-full h-48 object-cover rounded" /> */}
                        </div>
                        <div className="px-4 pb-4">
                            <p className="text-gray-700 mt-4 text-center pt-2">
                                <strong>Dealership:</strong> {car.dealership}
                            </p>
                            <p className="text-gray-700 mb-4 text-center">
                                {car.model}
                            </p>
                            <div className="space-y-4">
                                <form className="space-y-4">
                                    <label className="block">
                                        Pick-Up Date
                                        <input className="border rounded px-2 py-1 w-full" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
                                    </label>
                                    <label className="block">
                                        Pick-Up Time
                                        <input className="border rounded px-2 py-1 w-full" type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} min="09:00" max="17:00" required />
                                    </label>
                                    <label className="block">
                                        Drop-Off Date
                                        <input className="border rounded px-2 py-1 w-full" type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} required />
                                    </label>
                                    <label className="block">
                                        Drop-0ff Time
                                        <input className="border rounded px-2 py-1 w-full" type="time" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} min="09:00" max="17:00" required />
                                    </label>
                                    <label className="block">
                                        Address
                                        <input className="border rounded px-2 py-1 w-full" type="text" value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                                    </label>
                                </form>
                            </div>
                            <div className="flex items-center justify-between mt-6 gap-1">
                                <span className="w-fit text-xs p-0.5 text-white text-center bg-gray-800 rounded">Rental Fee</span>
                                <span className="text-xl py-1 font-bold border w-full text-center border-gray-800 rounded">₦ {car.price}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1 pt-2">
                                <button className="w-fit text-xs p-0.5 text-center rounded border-gray-800 border" type="button" onClick={handleCancel}>Cancel Booking</button>
                                <button className="text-xl py-1 font-bold border w-full text-center border-gray-800 rounded bg-gray-800 text-white" type="button" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className='max-w-sm mx-auto bg-white rounded-lg overflow-hidden md:max-w-md mt-8 flex flex-col items-center justify-center'>
                    <h1 className="text-2xl font-bold">Summary</h1>
                    <div className='w-11/12 shadow-2xl px-2 rounded-lg p-3'>
                        <img src="/frame_330.svg" alt="" className='' />
                        <div className='flex justify-between text-gray-500'>
                            <div>Autolease Reciept</div>
                            <div>{pickupDate}</div>
                        </div>
                        <div className='flex justify-between pt-2 px-1'>
                            <div>Car Name</div>
                            <div>{car.name}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Car Model</div>
                            <div>{car.model}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Pick-Up Date</div>
                            <div>{pickupDate}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Drop Off Date</div>
                            <div>{dropoffDate}</div>
                        </div>
                        <hr className='my-3 border-slate-900 mx-1' />
                        <div className='flex justify-between px-1'>
                            <div>{car.name} - {car.model}</div>
                            <div>₦{car.price}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Number of Days</div>
                            <div>x{Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Applied Discount</div>
                            <div>{car.discount}%</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Delivery fee</div>
                            <div>+ ₦{car.fee}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Total</div>
                            <div>₦{total.toFixed(2)}</div>
                        </div>
                    </div>
                    <form className="space-y-4">
                        <div className="flex items-center justify-between gap-1 pt-2">
                            <button className="w-fit text-xs p-2.5 text-center rounded border-gray-800 border" type="button" onClick={handleBack}>Back</button>
                            <button className="text-xl py-1 font-bold border w-full text-center border-gray-800 rounded bg-gray-800 text-white px-4" type="button" onClick={handleNext}>Checkout [₦{total.toFixed(2)}]</button>
                        </div>
                    </form>
                </div>
            )}
            {step === 3 && (
                <div className='max-w-sm mx-auto bg-white rounded-lg overflow-hidden md:max-w-md mt-8'>
                    {/* You cook here bro */}
                    <img src="" alt="" />
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
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" type="button" onClick={handleBack}>Back</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="button" onClick={handlePaymentSuccess}>Successful Payment</button>
                        <button className="text-xl py-1 font-bold border w-full text-center border-gray-800 rounded bg-gray-800 text-white px-4" type="button" onClick={handleNext}>Checkout [₦{total.toFixed(2)}]</button>
                    </form>
                </div>
            )}
            {step === 4 && (
                <div className='max-w-sm mx-auto bg-white rounded-lg overflow-hidden md:max-w-md mt-8 flex flex-col items-center'>
                    <h1 className="text-2xl font-bold mb-4 text-center text-slate-700">Payment Successful!</h1>

                    <div className='w-11/12 shadow-2xl px-2 rounded-lg p-3'>
                        <img src="/frame_330.svg" alt="" className='' />
                        <div className='flex justify-between text-gray-500'>
                            <div>Autolease Reciept</div>
                            <div>{pickupDate}</div>
                        </div>
                        <div className='flex justify-between pt-2 px-1'>
                            <div>Name</div>
                            <div>David Dangtim (fetcth it bro)</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Address</div>
                            <div>{address}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Order No.</div>
                            <div>Fill it in bro</div>
                        </div>
                        <hr className='my-3 border-slate-900 mx-1' />
                        <div className='flex justify-between pt-2 px-1'>
                            <div>Car Name</div>
                            <div>{car.name}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Car Model</div>
                            <div>{car.model}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Pick-Up Date</div>
                            <div>{pickupDate}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Drop Off Date</div>
                            <div>{dropoffDate}</div>
                        </div>
                        <hr className='my-3 border-slate-900 mx-1' />
                        <div className='flex justify-between px-1'>
                            <div>{car.name} - {car.model}</div>
                            <div>₦{car.price}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Number of Days</div>
                            <div>x{Math.ceil((new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Applied Discount</div>
                            <div>{car.discount}%</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Delivery fee</div>
                            <div>+ ₦{car.fee}</div>
                        </div>
                        <div className='flex justify-between px-1'>
                            <div>Total Paid (should fetch plus paystack charges)</div>
                            <div>₦{total.toFixed(2)}</div>
                        </div>
                    </div>
                    <button className="text-center w-4/5 font-bold text-white px-4 py-2 rounded bg-slate-800 mt-4" onClick={handleDownload}>Download Receipt</button>
                </div>
            )}
        </div>
    );
};

export default CarRentalForm;
