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

import Portfolio from './pages/Portfolio.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/AboutUs' element={< AboutUs />} />
      <Route path='/contactus' element={< ContactUs />} />
      <Route path='/signup' element={< SignUp />} />
      <Route path='/login' element={< Login />} />

      <Route path='/portfolio' element={< Portfolio />} />

      <Route path="/rentcar/:id" element={
        <PrivateRoute>
          <CarRentalForm />
        </PrivateRoute>
      } />

      <Route path="/checkout" element={
        <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>
      } />

      <Route path="/dealership" element={
        <PrivateRoute><DealershipApplicationPage /></PrivateRoute>
      } />

      <Route path="/verify/:token" element={
        <PrivateRoute>
          <VerificationPage />
        </PrivateRoute>
      } />

      <Route path="/admin-dashboard" element={
        <PrivateRoute>
          <AdminPage />
        </PrivateRoute>
      } />

      <Route path="/admin/dealerships" element={
        <PrivateRoute>
          <DealershipApplicationsPage />
        </PrivateRoute>
      } />

      <Route path="/admin/users" element={
        <PrivateRoute>
          <ManageUsersPage />
        </PrivateRoute>
      } />

      <Route path="/carbooking" element={
        <PrivateRoute>
          <CarBooking />
        </PrivateRoute>
      } />

      <Route path="/dealership-dashboard/post" element={
        <PrivateRoute>
          <DealershipDashboardPost />
        </PrivateRoute>} />
      <Route path="/dealership-dashboard/upload" element={
        <PrivateRoute>
          <DealershipDashboardUpload />
        </PrivateRoute>} />
      <Route path="/payment" element={
        <PrivateRoute>
          <PaymentPage />
        </PrivateRoute>
      } />
      <Route path="/dealership-dashboard" element={
        <PrivateRoute>
          <DealershipDashboard />
        </PrivateRoute>} />

      <Route path='*' element={< PageNotFound />} />
    </Routes>
  </BrowserRouter>
)
