import React from "react";
import {
  XMarkIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const API_URL = process.env.REACT_APP_API_URL.replace("/api", "");

const LinkedInIcon = () => (
  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function AlumniDetailModal({ user, onClose }) {
  if (!user) return null;

  const profileImageUrl = user.profilePicture?.startsWith("http")
    ? user.profilePicture
    : user.profilePicture && user.profilePicture !== "no-photo.jpg"
    ? `${API_URL}${user.profilePicture}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.fullName
      )}&background=8344AD&color=fff&size=128`;

  const formatDate = (dateString) =>
    !dateString
      ? null
      : new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

  const calculateAge = (dob) => {
    if (!dob) return null;
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl animate-slideIn
                   w-full
                   max-w-md sm:max-w-lg
                   lg:max-w-4xl xl:max-w-5xl
                   max-h-[90vh] lg:max-h-[80vh]
                   overflow-y-auto lg:overflow-hidden
                   lg:flex lg:divide-x lg:divide-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-secondary p-2
                     text-gray-900 transition-all duration-200 hover:scale-110
                     hover:bg-gray-300 hover:text-gray-600"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <aside className="hidden lg:flex min-w-[310px] flex-col items-center px-6 py-8 xl:min-w-[360px]">
          <div className="relative w-full">
            <div className="h-24 w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/90 via-primary/50 to-primary/90">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <img
              src={profileImageUrl}
              alt={user.fullName}
              className="absolute left-1/2 top-4 h-32 w-32 -translate-x-1/2 rounded-full
                         border-4 border-white object-cover shadow-2xl"
            />
          </div>

          <div className="mt-20 space-y-3 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{user.fullName}</h2>

            <div className="flex items-center justify-center gap-1 text-lg font-semibold text-blue-600">
              <AcademicCapIcon className="h-5 w-5" />
              Class of {user.batchYear}
            </div>

            {(user.linkedInProfile ||
              user.facebookProfile ||
              user.instagramProfile) && (
              <div className="flex gap-3 justify-center">
                {user.linkedInProfile && (
                  <a
                    href={user.linkedInProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-full bg-blue-50 p-3 transition-all
                               duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white"
                  >
                    <LinkedInIcon />
                  </a>
                )}
                {user.facebookProfile && (
                  <a
                    href={user.facebookProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-full bg-blue-50 p-3 transition-all
                               duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {user.instagramProfile && (
                  <a
                    href={user.instagramProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-full bg-pink-50 p-3 transition-all
                               duration-300 hover:scale-110 hover:bg-gradient-to-r
                               hover:from-pink-500 hover:to-purple-600 hover:text-white"
                  >
                    <InstagramIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>

        <div
          className="flex-1 overflow-y-auto scrollbar-hide
                     px-3 pb-4 pt-16
                     sm:px-6 sm:pt-24
                     lg:px-6 lg:pb-6 lg:pt-8
                     xl:px-8"
        >
          <div className="lg:hidden mb-4 text-center">
            <div className="py-4 flex justify-center bg-primary/90 -mt-10 rounded-lg">
              <img
                src={profileImageUrl}
                alt={user.fullName}
                className="h-32 w-32 rounded-full border-2 border-blue-200 object-cover shadow-lg"
              />
            </div>
            <h2 className="mb-1 text-lg font-bold text-gray-900 sm:text-xl">
              {user.fullName}
            </h2>
            <div className="mb-2 flex items-center justify-center gap-1 text-sm font-semibold text-blue-600">
              <AcademicCapIcon className="h-4 w-4" />
              Class of {user.batchYear}
            </div>
            {(user.linkedInProfile ||
              user.facebookProfile ||
              user.instagramProfile) && (
              <div className="flex justify-center gap-2">
                {user.linkedInProfile && (
                  <a
                    href={user.linkedInProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-full bg-blue-50 p-2 transition-all
                               hover:scale-110 hover:bg-blue-600 hover:text-white"
                  >
                    <LinkedInIcon />
                  </a>
                )}
                {user.facebookProfile && (
                  <a
                    href={user.facebookProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-full bg-blue-50 p-2 transition-all
                               hover:scale-110 hover:bg-blue-600 hover:text-white"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {user.instagramProfile && (
                  <a
                    href={user.instagramProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-full bg-pink-50 p-2 transition-all
                               hover:scale-110 hover:bg-gradient-to-r
                               hover:from-pink-500 hover:to-purple-600 hover:text-white"
                  >
                    <InstagramIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ------------ DETAILS ------------- */}
          <div className="space-y-3 lg:space-y-6">
            {/* Bio */}
            {user.bio && (
              <section className="rounded-lg border border-blue-100 bg-gradient-to-r from-primary/20 to-primary/30 p-2 lg:p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-md bg-blue-100 p-1.5">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-600 lg:h-6 lg:w-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 lg:text-xl">
                    About
                  </span>
                </div>
                <p className="leading-relaxed text-gray-700 text-sm lg:text-lg">
                  {user.bio}
                </p>
              </section>
            )}

            {/* Grid cards */}
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
              {/* Email */}
              <div className="group rounded-lg border border-gray-200 bg-white p-2 transition-all duration-300 hover:shadow-md hover:border-blue-300 lg:p-4">
                <div className="flex items-start gap-2">
                  <div className="rounded-md bg-blue-50 p-1.5 transition-colors group-hover:bg-blue-100">
                    <EnvelopeIcon className="h-4 w-4 text-blue-600 lg:h-6 lg:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xs font-medium text-gray-500 lg:text-base">
                      Email
                    </p>
                    <p className="break-all text-sm font-semibold text-gray-900 lg:text-lg">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Organization */}
              {user.currentOrganization && (
                <div className="group rounded-lg border border-gray-200 bg-white p-2 transition-all duration-300 hover:shadow-md hover:border-green-300 lg:p-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-md bg-green-50 p-1.5 transition-colors group-hover:bg-green-100">
                      <BuildingOfficeIcon className="h-4 w-4 text-green-600 lg:h-6 lg:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-medium text-gray-500 lg:text-base">
                        Current Organization
                      </p>
                      <p className="text-sm font-semibold text-gray-900 lg:text-lg">
                        {user.currentOrganization}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              {user.location && (
                <div className="group rounded-lg border border-gray-200 bg-white p-2 transition-all duration-300 hover:shadow-md hover:border-purple-300 lg:p-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-md bg-purple-50 p-1.5 transition-colors group-hover:bg-purple-100">
                      <MapPinIcon className="h-4 w-4 text-purple-600 lg:h-6 lg:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-medium text-gray-500 lg:text-base">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-gray-900 lg:text-lg">
                        {user.location}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Phone */}
              {user.phoneNumber && (
                <div className="group rounded-lg border border-gray-200 bg-white p-2 transition-all duration-300 hover:shadow-md hover:border-orange-300 lg:p-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-md bg-orange-50 p-1.5 transition-colors group-hover:bg-orange-100">
                      <PhoneIcon className="h-4 w-4 text-orange-600 lg:h-6 lg:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-medium text-gray-500 lg:text-base">
                        Phone
                      </p>
                      <p className="text-sm font-semibold text-gray-900 lg:text-lg">
                        {user.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* DOB */}
              {user.dateOfBirth && (
                <div className="group rounded-lg border border-gray-200 bg-white p-2 transition-all duration-300 hover:shadow-md hover:border-indigo-300 lg:col-span-2 lg:p-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-md bg-indigo-50 p-1.5 transition-colors group-hover:bg-indigo-100">
                      <UserIcon className="h-4 w-4 text-indigo-600 lg:h-6 lg:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-medium text-gray-500 lg:text-base">
                        Date of Birth
                      </p>
                      <p className="text-sm font-semibold text-gray-900 lg:text-lg">
                        {formatDate(user.dateOfBirth)}
                        {calculateAge(user.dateOfBirth) && (
                          <span className="ml-2 font-normal text-gray-500 text-xs lg:text-base">
                            ({calculateAge(user.dateOfBirth)} years old)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(30px) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
