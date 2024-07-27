import React from 'react';
import loadingSVG from '../assets/loader/Bars@1x-1.0s-200px-200px.svg'; // Adjust the path to your SVG file

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <img
        src={loadingSVG} // Use the imported SVG file
        alt="Loading..."
        className="w-12 h-12" // Adjust size as needed
      />
    </div>
  );
};

export default LoadingSpinner;