import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faBehance } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFigma, faSketch, faJs, faNode } from '@fortawesome/free-brands-svg-icons';

const Portfolio = () => {
    return (
        <div className='bg-black text-white min-h-screen py-12'>
            <div className=" flex px-4 space-x-4">
                {/* Profile Section */}
                <div className="w-1/3 max-w-2xl bg-white rounded-lg m-12 p-4 px-6 text-left mb-12 h-fit">
                    <img src="jhines09-nba-6280s.JPG" alt="Olamide Afolabi" className="mx-auto rounded-xl my-4 object-cover h-96 border-2 border-black" />
                    <h1 className="text-3xl font-bold mb-2 text-black text-center">Olamide Afolabi</h1>
                    <p className="text-gray-500 mt-2 w-fit text-center">A Graphics and UI/UX Designer that loves to create visually appealing designs</p>
                </div>

                <div className='w-2/3'>
                    <div className="w-full max-w-4xl text-start mb-12">
                        <h2 className="text-4xl font-extrabold mt-8">Graphics Designer</h2>
                        <h2 className="text-4xl font-extrabold text-gray-500">UI/UX Designer</h2>
                        <p className="text-gray-400 mt-2 w-1/2">Passionate about crafting intuitive and engaging user experiences. Skilled in transforming ideas into beautifully executed products.</p>
                    </div>

                    {/* Experience Section */}
                    <div className="w-full max-w-4xl mb-12">
                        <div className="grid grid-cols-3 gap-4">
                            <div className='flex flex-col'>
                                <h2 className="text-5xl font-bold">+5</h2>
                                <p className="text-gray-400 max-w-32 font-medium">YEARS OF EXPERIENCE IN GRAPHIC DESIGN</p>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className="text-5xl font-bold">1</h2>
                                <p className="text-gray-400 max-w-32 font-medium">YEARS OF EXPERIENCE IN UI/UX DESIGN</p>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className="text-5xl font-bold">+150</h2>
                                <p className="text-gray-400 max-w-32 font-medium">PROJECTS COMPLETED ALTOGETHER</p>
                            </div>
                        </div>
                    </div>

                    {/* Work Section */}
                    <div className="w-full max-w-4xl text-left mb-12">
                        <h2 className="text-8xl font-extrabold mt-8">5 YEARS OF <br /><span className='text-gray-500'>EXPERIENCE</span></h2>
                        <h3 className="text-2xl font-bold mb-2 mt-5">Freelancer</h3>
                        <div className='flex space-x-2'>
                            <FontAwesomeIcon icon={faArrowRight} className="text-orange-500 mt-1" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Graphics Designer</h3>
                                <p className="text-gray-400 mb-4 w-1/2">Designed flyers, logo, Brand Identity and social media ads for small scale and large scale businesses online.</p>
                                <p className="text-gray-400 mb-4">August 2020 - Present</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-4xl text-left mb-12">
                        <h2 className="text-8xl font-extrabold mt-8">A YEAR OF <br /><span className='text-gray-500'>EXPERIENCE</span></h2>
                        <h3 className="text-2xl font-bold mb-2 mt-5">Nhub Foundation</h3>
                        <div className='flex space-x-2'>
                            <FontAwesomeIcon icon={faArrowRight} className="text-orange-500 mt-1" />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Junior UI/UX Designer</h3>
                                <p className="text-gray-400 mb-4 w-1/2">Worked with a team of UI designers and developer to create user-centric mobile and web applications for client. </p>
                                <p className="text-gray-400 mb-4">January 2024 - Present</p>
                            </div>
                        </div>
                    </div>

                    {/* Featured Projects */}
                    <div className="w-full max-w-4xl mb-12">
                        <h2 className="text-8xl font-extrabold mt-8">FEATURED<br /><span className='text-gray-500'>PROJECTS</span></h2>
                        <h2 className="text-xl font-extrabold py-1">UI/UX DESIGNS</h2>
                        <div className="flex flex-col">
                            {/* Add your project details and images here */}
                            <a href="https://www.figma.com/design/ZeAawbFd6M9rJmpnCtnCVA/RIDAL-UI-DESIGN?node-id=1197-2467&t=8NBQqER8AJfopjwU-1" target='_blank'>
                                <div className="flex gap-4 py-6">
                                    <img src="RentalDates.svg" alt="Project" className="rounded mb-2" />
                                    <div className='place-self-center'>
                                        <h2 className="text-3xl font-extrabold py-1 hover:underline hover:text-yellow-300">RIDAL</h2>
                                        <p className="text-gray-400">A Ride-sharing App</p>
                                    </div>
                                </div>
                            </a>

                            <a href="https://www.figma.com/design/ZeAawbFd6M9rJmpnCtnCVA/RIDAL-UI-DESIGN?node-id=1458-126" target='_blank'>
                                <div className="flex gap-4 py-6">
                                    <img src="RentalDates.svg" alt="Project" className="rounded mb-2" />
                                    <div className='place-self-center'>
                                        <h2 className="text-3xl font-extrabold py-1 hover:underline hover:text-blue-950">MENTORSPACE</h2>
                                        <p className="text-gray-400 max-w-80">An Educational Platform That Connects Students to MentorsAn Educational Platform That Connects Students to Mentors</p>
                                    </div>
                                </div>
                            </a>

                            <a href="https://www.figma.com/design/zPVoSEiB8dn4WKftjr0jLZ/Autolease?node-id=7-2" target='_blank'>
                                <div className="flex gap-4 py-6">
                                    <img src="RentalDates.svg" alt="Project" className="rounded mb-2" />
                                    <div className='place-self-center'>
                                        <h2 className="text-3xl font-extrabold py-1 hover:underline hover:text-slate-600">AUTOLEASE</h2>
                                        <p className="text-gray-400">Car Rental Booking Platform</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Premium Tools */}
                    <div className="w-full max-w-4xl mb-12">
                        <h2 className="text-8xl font-extrabold mt-8">PREMIUM<br /><span className='text-slate-500'>TOOLS</span></h2>
                        <div className="grid grid-cols-2 gap-y-4">
                            <FontAwesomeIcon icon={faSketch} size="3x" />
                            <FontAwesomeIcon icon={faJs} size="3x" />
                            <FontAwesomeIcon icon={faNode} size="3x" />
                            <FontAwesomeIcon icon={faFigma} size="3x" />
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="w-full max-w-2xl pb-2">
                        <a href="https://www.behance.net/samuelafolabi5" target='_blank' className="inline-flex items-center">
                            <FontAwesomeIcon icon={faBehance} size="5x" className="mr-4 bg-blue-700 px-4 rounded-xl py-4" />
                            <h2 className="text-6xl font-extrabold mb-4 text-white hover:text-blue-700 hover:underline mt-5">BEHANCE<br /></h2>
                        </a>
                    </div>

                    <div className="w-full max-w-2xl pb-2">
                        <a href="https://instagram.com/_lamidesign?igshid=NTc4MTIwNjQ2YQ" target='_blank' className="inline-flex items-center hover:text-[#c13584]">
                            <FontAwesomeIcon icon={faInstagram} size="8x" className="mr-4 bg-[#c13584] 0 px-1.5 rounded-xl text-white" />
                            <h2 className="text-6xl font-extrabold mb-4 text-white hover:text-[#c13584] hover:underline mt-5">INSTAGRAM</h2>
                        </a>
                    </div>

                    <div className="w-full max-w-2xl">
                        <a href="https://wa.me/qr/L4CNWH6YAFYXN1" target='_blank' className="inline-flex items-center">
                            <FontAwesomeIcon icon={faWhatsapp} size="8x" className="mr-4 bg-green-500 px-1.5 rounded-xl" />
                            <h2 className="text-6xl font-extrabold text-white hover:text-green-500 hover:underline">CONTACT<br />ME HERE</h2>
                        </a>
                    </div>


                </div>

            </div>
            {/* Footer */}
            <div className="text-gray-500 text-center mt-12 font-medium">
                <p>&copy; 2024 | Designed Olamide Afolabi</p>
            </div>
        </div >
    );
};

export default Portfolio;
