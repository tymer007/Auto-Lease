import React, { useState } from "react";
import logo from "../assets/LogoCream.png"; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-autoPurple text-white py-4">
      <nav className="flex justify-between items-center w-[90%] mx-auto">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img className="w-32 cursor-pointer" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex space-x-8">
            <li>
              <a className="hover:text-gray-300" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-300" href="/aboutus">
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
          <button className="border border-autoCream text-autoCream px-4 py-2 rounded hover:bg-autoCream hover:text-autoPurple transition duration-300">
            Login
          </button>

          <button className="bg-autoCream text-autoPurple px-4 py-2 rounded hover:bg-transparent hover:text-autoCream hover:border hover:border-autoCream transition duration-300">
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
              <a className="hover:text-gray-300" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-300" href="/aboutus">
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
