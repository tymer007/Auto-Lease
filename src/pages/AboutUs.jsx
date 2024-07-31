import React from 'react'
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom';
import Footer from "../components/Footer"

function AboutUs() {
  return (
    <div className="font-sans">
      <Navbar />

      <header className="relative bg-gray-800 text-white">
        <img
          src="Frame185.png"
          alt="Car"
          className="w-full h-48 sm:h-64 md:h-96 lg:h-120 object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl text-center font-bold">
            About <br /> Autolease
          </h1>
        </div>
      </header>


      <main className="py-8 px-4 md:px-8 lg:px-16">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-8">Choose the Perfect Vehicle for Your Needs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="max-w-xs mx-auto">
              <img src="cardate.svg" alt="Select Your Rental Dates" className="w-288 h-201.45 object-cover mb-4" />
              <h3 className="text-xl font-semibold">Select Your Rental Dates</h3>
              <p className="mt-2 text-gray-700">Take your time browsing our wide selection of vehicles...</p>
            </div>
            <div className="max-w-xs mx-auto">
              <img src="carpool.svg" alt="Complete Your Booking Online" className="w-288 h-167.61 object-cover mb-4" />
              <h3 className="text-xl font-semibold">Complete Your Booking Online</h3>
              <p className="mt-2 text-gray-700">After selecting your rental dates, proceed to our secure...</p>
            </div>
            <div className="max-w-xs mx-auto">
              <img src="selfdrive.svg" alt="Enjoy Your Worry-Free Driving Experience" className="w-288 h-173.64 object-cover mb-4" />
              <h3 className="text-xl font-semibold">Enjoy Your Worry-Free Driving Experience</h3>
              <p className="mt-2 text-gray-700">Get ready to pick up your selected vehicle on the specified...</p>
            </div>
          </div>
        </section>

        <section className="p-8 mx-4 md:mx-8 flex">
          <div className='w-1/2'>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          </div>
          <div className="space-y-4 w-1/2">
            <FAQItem question="How to rent a car?">
              Renting a car is easy! Simply browse our available vehicles...
            </FAQItem>
            <FAQItem question="What are the rental requirements?">
              To rent a car, you must be at least 21 years old and hold a valid driver's license...
            </FAQItem>
            <FAQItem question="How can I extend my rental?">
              If you need to extend your rental period, please contact our customer support...
            </FAQItem>
          </div>
        </section>

        <section className="text-start mt-12">
                    <div className="relative bg-autoPurple text-white py-8 px-6 rounded-2xl mx-4 md:mx-8 overflow-hidden">
                    <img
              src="src/assets/Frame430.png"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-semibold mb-4">Become A Dealer</h2>
                            <p className="mb-4">Register your dealership and put up your vehicle for rental</p>
                            <button className="bg-white text-autoPurple font-semibold py-2 px-4 rounded-lg">Register</button>
                        </div>
                    </div>
                </section>
      </main>
      <Footer />
    </div>

  );
}

const FAQItem = ({ question, children }) => (
  <div className="border-b-2 border-t-2 border-black pb-4">
    <h3 className="text-lg font-semibold">{question}</h3>
    <p className="text-gray-700 mt-2">{children}</p>
  </div>
);

export default AboutUs