import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Input from '../components/Input';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    nin: '',
    frontId: null,
    backId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Back button */}
        <div className="p-4">
          <button className="text-2xl">&lt;</button>
        </div>

        {/* Receipt Card */}
        <div className="bg-gray-800 text-white p-4 mb-4 rounded-t-lg">
          <h1 className="text-xl font-bold mb-2">AUTOLEASE</h1>
          <div className="flex justify-between mb-2">
            <span>Autolease Receipt</span>
            <span>24/07/2024</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Car Name:</span>
              <span>Toyota Corolla</span>
            </div>
            <div className="flex justify-between">
              <span>Car Model:</span>
              <span>Model E3 2013</span>
            </div>
            <div className="flex justify-between">
              <span>Pick-Up Date:</span>
              <span>29/06/2024</span>
            </div>
            <div className="flex justify-between">
              <span>Drop-Off Date:</span>
              <span>07/07/2024</span>
            </div>
          </div>
          <hr className="my-2" />
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Toyota Corolla Model 2013</span>
              <span>₦6,000</span>
            </div>
            <div className="flex justify-between">
              <span>2 weeks</span>
              <span>x2</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₦1,000</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₦13,000</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          <Input label="Username" type="text" name="username" value={formData.username} onChange={handleChange} />
          <Input label="Address" type="text" name="address" value={formData.address} onChange={handleChange} />
          <Input label="NIN/BVN" type="text" name="nin" value={formData.nin} onChange={handleChange} />
          <FileUpload label="Front View Of National ID/Voter's Card/Driver's Licence" name="frontId" onChange={handleFileChange} />
          <FileUpload label="Back View Of National ID/Voter's Card/Driver's Licence" name="backId" onChange={handleFileChange} />
        </div>

        {/* Checkout Button */}
        <div className="p-4">
          <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
            Checkout [₦13,000]
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;