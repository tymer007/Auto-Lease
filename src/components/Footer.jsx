import React from "react";
import logo from '../assets/AutoLease.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-800 py-8 shadow-2xl shadow-gray-500/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <Link to="/" className="text-4xl font-bold text-gray-800">
            <img src={logo} alt="Home" />
          </Link>
          
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-2 px-4 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <Link to="/contactus" className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-gray-800 text-white py-1 px-3 rounded-md text-sm">
              English
            </button>
            <span className="text-sm text-gray-600">
              © 2024 AUTOLEASE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

