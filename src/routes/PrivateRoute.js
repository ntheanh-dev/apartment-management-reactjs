import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { data } = useSelector((state) => state.user);
    const nav = useNavigate();
    useEffect(() => {
        if (!data.username) {
            nav('/login');
        }
    });

    return children;
};

export default PrivateRoute;
