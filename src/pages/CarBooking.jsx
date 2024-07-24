import React from 'react';

const CarBooking = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-md mt-6">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">Toyota Corolla 2013 <span className="text-sm text-gray-500">Basic</span></h2>
      </div>
      <div className="flex justify-center p-4">
        <img src="path-to-car-image" alt="Toyota Corolla 2013" className="w-full h-40 object-cover"/>
      </div>
      <div className="px-4 pb-4">
        <p className="text-gray-700 mb-4">
          <strong>Dealership:</strong> Ekene Motors
        </p>
        <p className="text-gray-700 mb-4">
          Toyota Corolla 2012, 4 Seats, Automatic Installed Security, 1.8-liter 4-cylinder, 132hp at 6,000 rpm
        </p>
        <div className="space-y-4">
          <input type="text" placeholder="Pick-Up Time" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
          <input type="text" placeholder="Pick-Up" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
          <input type="text" placeholder="Drop-Off Time" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
          <input type="text" placeholder="Drop-Off" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>
        <div className="flex items-center justify-between mt-6">
          <span className="text-xl font-semibold">Rental Fee</span>
          <span className="text-2xl font-bold">₦12,000</span>
        </div>
        <button className="w-full mt-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700">Cancel Booking</button>
      </div>
    </div>
  );
};

export default CarBooking;
