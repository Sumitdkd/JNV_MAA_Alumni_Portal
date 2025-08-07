import React from 'react';

export default function Button({ children, onClick, type = 'button', disabled = false, className = '' }) {
    const baseClasses = "group relative w-full flex justify-center py-2 sm:py-2.5 px-3 sm:px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-brand-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
    const disabledClasses = "disabled:bg-blue-300 disabled:cursor-not-allowed";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${disabledClasses} ${className}`}
        >
            {children}
        </button>
    );
}