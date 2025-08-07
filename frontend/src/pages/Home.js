import React from 'react';
import useAuth from '../hooks/useAuth';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Spinner from '../components/common/Spinner';

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-background">
                <Spinner />
            </div>
        );
    }

    // If 'user' object exists, they are logged in -> show Dashboard
    // If 'user' is null, they are a guest -> show LandingPage
    return user ? <Dashboard /> : <LandingPage />;
}