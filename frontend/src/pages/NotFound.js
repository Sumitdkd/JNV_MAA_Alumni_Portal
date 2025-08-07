import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="text-center py-16">
            <h1 className="text-9xl font-extrabold text-brand-blue">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 inline-block bg-brand-blue text-white px-6 py-2 rounded-md hover:bg-blue-800">
                Go to Homepage
            </Link>
        </div>
    );
}
