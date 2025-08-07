import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from './common/Spinner';
import authService from '../services/authService';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [checkingRole, setCheckingRole] = React.useState(true);
    const location = useLocation();

    React.useEffect(() => {
        const checkAdminRole = async () => {
            if (user && adminOnly) {
                try {
                    const res = await authService.getMe();
                    if (res.data.data.role === 'admin') {
                        setIsAdmin(true);
                    }
                } catch (error) {
                    console.error("Error checking user role", error);
                }
            }
            setCheckingRole(false);
        };

        if (!loading) {
            checkAdminRole();
        }
    }, [user, adminOnly, loading]);


    if (loading || (adminOnly && checkingRole)) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
