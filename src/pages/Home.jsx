import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Home() {
    return (
        
        <div>
            <Navbar />
            <div className='autoCream'>
                <h1 className="text-3xl font-bold underline bg-autoCream text-autoPurple">
                    <FontAwesomeIcon icon={faCoffee} />
                    <FontAwesomeIcon icon={faGoogle} />
                    Welcome to auto-lease
                </h1>
            </div>
            <Footer />
        </div>
    )
}

export default Home