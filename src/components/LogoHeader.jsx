import React from 'react';
import SubtractImage  from '../assets/Subtract.svg'

const  LogoHeader = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <img
            src={SubtractImage}
            alt="Responsive"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          />
        </div>
      );
    };


export default LogoHeader;