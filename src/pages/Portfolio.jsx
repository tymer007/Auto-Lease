import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faBehance } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFigma, faSketch, faJs, faNode } from '@fortawesome/free-brands-svg-icons';

const Portfolio = () => {
    return (
        <div className="bg-black text-white min-h-screen flex items-center py-12 px-4 space-x-4">
            {/* Profile Section */}
            <div className="w-1/3 max-w-2xl bg-gray-800 rounded-lg m-12 p-6 text-center mb-12">
                <img src="path_to_image" alt="Olamide Afolabi" className="mx-auto rounded-full mb-4 w-40 h-40 object-cover" />
                <h1 className="text-3xl font-bold mb-2">Olamide Afolabi</h1>
                <p className="text-lg">[Graphics Designer] [UI/UX Designer]</p>
                <p className="text-sm text-gray-400 mt-2">Passionate about crafting intuitive and engaging user experiences...</p>
            </div>

            <div className='w-2/3'>

                <div className="w-full max-w-4xl text-start mb-12">
                    <h2 className="text-4xl font-extrabold mt-8">Graphics Designer</h2>
                    <h2 className="text-4xl font-extrabold text-gray-500">UI/UX Designer</h2>
                    <p className="text-sm text-gray-400 mt-2 w-1/2">Passionate about crafting intuitive and engaging user experiences. Skilled in transforming ideas into beautifully executed products.</p>

                </div>

                {/* Experience Section */}
                <div className="w-full max-w-4xl text-center mb-12">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">+5</h2>
                            <p className="text-gray-400">Years of Experience in Graphic Design</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">+1</h2>
                            <p className="text-gray-400">Year of Experience in UI/UX Design</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">+150</h2>
                            <p className="text-gray-400">Projects Completed Altogether</p>
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold mt-8">5 Years of Experience</h2>
                </div>

                {/* Work Section */}
                <div className="w-full max-w-4xl text-left mb-12">
                    <h3 className="text-xl font-bold mb-2">Freelancer</h3>
                    <FontAwesomeIcon icon={faArrowRight} className="text-orange-500" />
                    <p className="text-lg">Graphics Designer</p>
                    <p className="text-gray-400 mb-4">Designed flyers, logos, brand identity, and social media ads...</p>
                </div>

                <div className="w-full max-w-4xl text-left mb-12">
                    <FontAwesomeIcon icon={faArrowRight} className="text-orange-500" />

                    <div>
                        <h3 className="text-xl font-bold mb-2">Nhub Foundation</h3>
                        <p className="text-lg">Junior UI/UX Designer</p>
                        <p className="text-gray-400 mb-4">Worked with a team of UI designers...</p>
                    </div>
                </div>

                {/* Featured Projects */}
                <div className="w-full max-w-4xl mb-12">
                    <h2 className="text-3xl font-extrabold text-center mb-8">Featured Projects</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Add your project details and images here */}
                        <div className="text-center">
                            <img src="path_to_project_image" alt="Project" className="rounded mb-2" />
                            <h3 className="text-lg font-bold">Ridal</h3>
                            <p className="text-gray-400">A Ride-sharing App</p>
                        </div>
                        <div className="text-center">
                            <img src="path_to_project_image" alt="Project" className="rounded mb-2" />
                            <h3 className="text-lg font-bold">MentorSpace</h3>
                            <p className="text-gray-400">An Educational Platform...</p>
                        </div>
                        <div className="text-center">
                            <img src="path_to_project_image" alt="Project" className="rounded mb-2" />
                            <h3 className="text-lg font-bold">AutoLease</h3>
                            <p className="text-gray-400">Car Rental Booking Platform</p>
                        </div>
                    </div>
                </div>

                {/* Premium Tools */}
                <div className="w-full max-w-4xl mb-12">
                    <h2 className="text-3xl font-extrabold text-center mb-8">Premium Tools</h2>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <FontAwesomeIcon icon={faSketch} size="3x" />
                        <FontAwesomeIcon icon={faJs} size="3x" />
                        <FontAwesomeIcon icon={faNode} size="3x" />
                        <FontAwesomeIcon icon={faFigma} size="3x" />
                    </div>
                </div>

                {/* Contact Section */}
                <div className="w-full max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold mb-4">Contact Me Here</h2>
                    <a href="https://wa.me/yourwhatsappnumber" className="inline-flex items-center text-green-500">
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" className="mr-2" />
                        <span className="underline">Contact me here</span>
                    </a>
                </div>


                {/* Footer */}
                <div className="text-gray-500 text-center mt-12">
                    <p>&copy; 2024 | Designed Olamide Afolabi [Framer]</p>
                </div>


            </div>

        </div>
    );
};

export default Portfolio;
