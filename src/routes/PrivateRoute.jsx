import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRole } from '../services/userService';
import { useState } from 'react';
import { useEffect } from 'react';

const PrivateRoute = ({ allowedRoles }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const roleId = useSelector((state) => state.user.account.roleId);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRole = async () => {
        let result = await getRole();
        if (result.success) {
            setRoles(result.data);
        } else {
            console.log(result.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRole();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const userRole = roles.find(role => role.role_Id === roleId);

    if (!userRole || (allowedRoles && !allowedRoles.includes(userRole.name))) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};


export default PrivateRoute;
