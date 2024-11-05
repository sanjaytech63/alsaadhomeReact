import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to="/" />
    }

    return <Outlet />

}

export default PrivateRoute
