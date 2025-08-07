import React from 'react';
import { CakeIcon, XMarkIcon } from '@heroicons/react/24/solid';

const API_URL = process.env.REACT_APP_API_URL.replace("/api", "");

export default function BirthdayCard({ user, onDismiss }) {

    // It determines which image to show: the uploaded one or a default avatar.
    const profileImageUrl = user.profilePicture?.startsWith('http')
        ? user.profilePicture
        : user.profilePicture && user.profilePicture !== 'no-photo.jpg'
            ? `${API_URL}${user.profilePicture}`
            : `https://ui-avatars.com/api/?name=${user.fullName}&background=A066CB&color=fff`;

    return (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Profile Picture */}
                <div className="relative">
                    <img
                        src={profileImageUrl}
                        alt={user.fullName}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-pink-200 shadow-sm"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-pink-500 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white text-xs sm:text-sm font-bold">🎂</span>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {user.fullName}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                        Class of {user.batchYear}
                    </p>
                    {user.currentOrganization && (
                        <p className="text-gray-500 text-xs truncate">
                            {user.currentOrganization}
                        </p>
                    )}
                </div>

                {/* Dismiss Button */}
                <button
                    onClick={() => onDismiss(user._id)}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
                    title="Dismiss"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
