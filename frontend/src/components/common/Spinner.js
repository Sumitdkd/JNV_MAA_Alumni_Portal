import React from 'react';
export default function Spinner() {
    return (
        <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
    );
}