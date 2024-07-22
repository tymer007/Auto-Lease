import React, { useState } from "react";
import logo from "../assets/LogoCream.png"; // Adjust the path as necessary

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-autoPurple text-white py-4">
      <nav className="flex justify-between items-center w-[90%] mx-auto">
        <div className="flex items-center space-x-6">
          <img className="w-32 cursor-pointer" src={logo} alt="Logo" />
        </div>
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex space-x-8">
            <li>
              <a className="hover:text-gray-300" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-300" href="#">
                About Us
              </a>
            </li>
            <li>
              <a className="hover:text-gray-300" href="#">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button className="border border-autoCream px-4 py-2 rounded hover:bg-purple-700 hover: transition duration-300">
            Login
          </button>
          <button className="bg-autoCream text-autoPurple-800 px-4 py-2 rounded hover:bg-autoCream-200 hover:text-autoPurple transition duration-300">
            Sign Up
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={onToggleMenu}
            className="text-3xl focus:outline-none"
          >
            {menuOpen ? <>&#x2715;</> : <>&#9776;</>}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-autoPurple text-white py-4">
          <ul className="space-y-4 text-center">
            <li>
              <a className="hover:text-gray-300" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-300" href="#">
                About Us
              </a>
            </li>
            <li>
              <a className="hover:text-gray-300" href="#">
                Contact Us
              </a>
            </li>
            <li>
            <button className="border border-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
            Login
          </button>
            </li>
            <li>
            <button className="bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-200 transition duration-300">
            Sign Up
          </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
