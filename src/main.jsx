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
import CarRentalForm from './components/CarRentalForm.jsx'
import CarBooking from './pages/CarBooking.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import DealershipApplicationPage from './pages/DealershipApplication.jsx'
import VerificationPage from './pages/VerifyUser.jsx'
import AdminPage from './pages/AdminPage.jsx'
import DealershipApplicationsPage from './pages/DealershipApplications.jsx'
import ManageUsersPage from './pages/ManageUsers.jsx'
import DealershipDashboardPost from './pages/PostPage.jsx'
import DealershipDashboardUpload from './pages/UploadPage.jsx'

import DealershipDashboard from './pages/DealershipDashboard.jsx'
import PaymentPage from './pages/PaymentPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/AboutUs' element={< AboutUs />} />
      <Route path='/contactus' element={< ContactUs />} />
      <Route path='/signup' element={< SignUp />} />
      <Route path='/login' element={< Login />} />
      <Route path="/rentcar/:id" element={<CarRentalForm />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/dealership" element={<DealershipApplicationPage />} />
      <Route path="/verify/:token" element={<VerificationPage />} />
      <Route path="/admin-dashboard" element={<AdminPage />} />
      <Route path="/admin/dealerships" element={<DealershipApplicationsPage />} />
      <Route path="/admin/users" element={<ManageUsersPage />} />
      <Route path="/carbooking" element={<CarBooking />} />
      <Route path="/dealership-dashboard/post" element={<DealershipDashboardPost />} />
      <Route path="/dealership-dashboard/upload" element={<DealershipDashboardUpload />} />
      



      <Route path='*' element={< PageNotFound />} />
    </Routes>
  </BrowserRouter>
)
