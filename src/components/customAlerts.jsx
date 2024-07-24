import React from "react";

const CustomAlert = ({ message, type, onClose }) => {
  const alertStyles = {
    base: "fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-md z-50 w-80 text-center",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className={`${alertStyles.base} ${alertStyles[type]}`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 bg-transparent border-0 text-2xl leading-none font-semibold outline-none focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default CustomAlert;