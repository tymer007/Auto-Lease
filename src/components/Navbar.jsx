import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/LogoCream.png"; // Adjust the path as necessary

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const linkStyle = (path) =>
    location.pathname === path
      ? "relative hover:text-gray-300 after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[2px] after:bg-white after:content-[''] after:rounded"
      : "hover:text-gray-300";

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
              <Link className={linkStyle("/")} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={linkStyle("/aboutus")} to="/aboutus">
                About Us
              </Link>
            </li>
            <li>
              <Link className={linkStyle("/contactus")} to="/contactus">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/login" 
            className="border border-autoCream text-autoCream px-4 py-2 rounded hover:bg-autoCream hover:text-autoPurple transition duration-300"
          >
            Log In
          </Link>
          <Link 
            to="/signup" 
            className="bg-autoCream text-autoPurple px-5 py-2 rounded hover:bg-transparent hover:text-autoCream hover:border hover:border-autoCream transition duration-300"
          >
            Sign Up
          </Link>
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
              <Link className={linkStyle("/")} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={linkStyle("/aboutus")} to="/aboutus">
                About Us
              </Link>
            </li>
            <li>
              <Link className={linkStyle("/contactus")} to="/contactus">
                Contact Us
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                className="border border-autoCream text-autoCream px-4 py-2 rounded hover:bg-autoCream hover:text-autoPurple transition duration-300"
              >
                Log In
              </Link>
            </li>
            <li>
              <Link 
                to="/signup" 
                className="bg-autoCream text-autoPurple px-5 py-2 rounded hover:bg-transparent hover:text-autoCream hover:border hover:border-autoCream transition duration-300"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;