import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
