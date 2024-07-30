import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import cardImage from '../assets/TemplateCard.png';
import visaLogo from '../assets/Vector.png';
import mastercardLogo from '../assets/logos_mastercard.png';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the LoadingSpinner component
import CustomAlert from '../components/customAlerts';
import { Navigate } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
  const { price, email } = location.state;

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true

    const handler = window.PaystackPop.setup({
      key: process.env.PAYSTACK_SECRET, // Replace with your Paystack public key
      email: email,
      amount: price * 100, // Amount in kobo
      currency: 'NGN',
      callback: function (response) {
        setIsLoading(false); // Set loading to false
        console.log(response);
        if (response.status === 'success') {
            Navigate('/');
          CustomAlert({ message: 'Payment Successful', type: 'success' });
        } else {
            CustomAlert({ message: 'Payment Failed', type: 'error' });
        }
      },
      onClose: function () {
        setIsLoading(false); // Set loading to false
    CustomAlert({ message: 'Payment Cancelled', type: 'error' }); 
    }
    });

    handler.openIframe();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      <div className="mb-4">
        <button onClick={() => window.history.back()} className="text-2xl">{'<'}</button>
      </div>
      
      <div className="flex justify-center mb-4">
        <img src={cardImage} alt="Card placeholder" className="w-full max-w-xs rounded-lg" />
      </div>
      
      <h2 className="text-xl font-bold mb-4 text-center">Pay With Debit or Credit Card</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name On The Card</label>
          <input type="email" name="email" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Shola Bash" />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="0123 XXXX XXXX XXXX" />
        </div>
        
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="09/2027" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="***" />
          </div>
        </div>
        
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 flex justify-center items-center">
          {isLoading ? <LoadingSpinner /> : 'Make Payment'}
        </button>
      </form>
      
      <div className="mt-4 flex justify-center space-x-2">
        <img src={visaLogo} alt="Visa" className="h-6" />
        <img src={mastercardLogo} alt="Mastercard" className="h-6" />
      </div>
    </div>
  );
};

export default PaymentPage;