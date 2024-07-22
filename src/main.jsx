import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Home from './pages/Home.jsx'
import ContactUs from './pages/ContactUs.jsx'
import AboutUs from './pages/AboutUs.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/AboutUs' element={< AboutUs />} />
      <Route path='/ContactUs' element={< ContactUs />} />
   


      <Route path='*' element={< PageNotFound />} />
    </Routes>
  </BrowserRouter>
)
