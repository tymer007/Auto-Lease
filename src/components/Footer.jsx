import React from "react";
import logo from "../assets/LogoCream.png"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full bg-autoPurple text-white">
      <div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
        <div className="w-full pt-12 flex flex-col sm:flex-row space-y-2 justify-start">
          <div className="w-full sm:w-2/5 pr-6 flex flex-col space-y-4">
            <Link to="/">
              <img className="w-43" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="w-full m-20 sm:w-1/5 flex flex-col space-y-4">
            <a className="opacity-60" href="/aboutus">
              About Us
            </a>
            <a className="opacity-60" href="#">
              Responsibilities
            </a>
            <a className="opacity-60" href="#">
              Our Services
            </a>
            <a className="opacity-60" href="#">
              Contact
            </a>
          </div>
          <div className="w-full sm:w-1/5 flex flex-col space-y-4">
            <a className="opacity-60" href="#">
              Disclaimer
            </a>
            <a className="opacity-60" href="#">
              Testimonials
            </a>
            <a className="opacity-60" href="#">
              Privacy Policy
            </a>
            <a className="opacity-60" href="#">
              Terms of Service
            </a>
          </div>
          <div className="w-full sm:w-1/5 pt-6 flex items-end mb-1">
            <div className="flex flex-row space-x-4">
              <a href="#" className="text-white">
              </a>
              <a href="#" className="text-white">
              </a>
              <a href="#" className="text-white">
              </a>
              <a href="#" className="text-white">
              </a>
            </div>
          </div>
        </div>
        <div className="opacity-60 pt-2">
          <p>© 2020 Executive Trade International.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
