import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Home from './pages/Home.jsx'
import ContactUs from './pages/ContactUs.jsx'
import AboutUs from './pages/AboutUs.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import CarDetails from './components/CarDetails.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import DealershipApplicationPage from './pages/DealershipApplication.jsx'
import VerificationPage from './pages/VerifyUser.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/AboutUs' element={< AboutUs />} />
      <Route path='/contactus' element={< ContactUs />} />
      <Route path='/signup' element={< SignUp />} />
      <Route path='/login' element={< Login />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/dealership" element={<DealershipApplicationPage />} />
      <Route path="/verify/:token" element={<VerificationPage />} />
      



      <Route path='*' element={< PageNotFound />} />
    </Routes>
  </BrowserRouter>
)
