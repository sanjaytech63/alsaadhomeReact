import React from 'react';
import useUserStore from '../store/user';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useUserStore();
    return isLoggedIn === true ? children : <Navigate to="/" />;
}

export default PrivateRoute;
