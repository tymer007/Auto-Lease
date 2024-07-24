import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ContactUs() {
    return (
        <div className="bg-autoCream min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-[#36454F] w-full max-w-6xl flex rounded-lg overflow-hidden shadow-xl">
                    <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                        <h2 className="text-white text-5xl font-bold mb-4">Contact Us</h2>
                        <p className="text-white text-xl">
                            Contact our customer care by sending a message
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 bg-white p-8 rounded-r-lg">
                        <form className="space-y-4">
                            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                                <div className="flex-1">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        name="first-name"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="last-name"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">What can we help you with?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#36454F] text-white py-2 px-4 rounded-md hover:bg-[#2C3A41] transition duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ContactUs;