import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import ManageUsers from './pages/ManageUsers';
import DealershipApplications from './pages/DealershipApplications';
import HomePage from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="users" element={<ManageUsers />} />
          <Route path="dealerships" element={<DealershipApplications />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
