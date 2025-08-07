import React, { useState, useEffect } from "react";
import userService from "../services/userService";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import useAuth from "../hooks/useAuth";
import {
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  UserIcon,
  GlobeAltIcon,
  CalendarIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import {
  UserCircleIcon,
  GlobeAltIcon as GlobeOutline,
} from "@heroicons/react/24/outline";

const API_URL = process.env.REACT_APP_API_URL.replace("/api", "");

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    currentOrganization: "",
    location: "",
    linkedInProfile: "",
    instagramProfile: "",
    facebookProfile: "",
    phoneNumber: "",
    dateOfBirth: "",
    admissionNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userService.getUserProfile();
        setProfile(res.data.data);
        setFormData({
          fullName: res.data.data.fullName || "",
          bio: res.data.data.bio || "",
          currentOrganization: res.data.data.currentOrganization || "",
          location: res.data.data.location || "",
          linkedInProfile: res.data.data.linkedInProfile || "",
          instagramProfile: res.data.data.instagramProfile || "",
          facebookProfile: res.data.data.facebookProfile || "",
          phoneNumber: res.data.data.phoneNumber || "",
          dateOfBirth: res.data.data.dateOfBirth
            ? new Date(res.data.data.dateOfBirth).toISOString().split("T")[0]
            : "",
          admissionNumber: res.data.data.admissionNumber || "",
        });
      } catch (error) {
        toast.error("Could not fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    // Only try to fetch if the user object is available
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await userService.updateProfile(formData);
      setProfile(res.data.data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };
  // Add this function to handle profile picture upload
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Basic validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const formData = new FormData();
    formData.append("profilePicture", file);

    setUploading(true);
    try {
      const res = await userService.updateProfilePicture(formData);
      setProfile((prev) => ({
        ...prev,
        profilePicture: res.data.data.profilePicture,
      }));
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile picture");
    } finally {
      setUploading(false);
    }
  };
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to calculate age
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Helper function to get social media icon
  const getSocialIcon = (platform) => {
    switch (platform) {
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      default:
        return <GlobeAltIcon className="w-5 h-5" />;
    }
  };

  // console.log("Profile data:", profile);
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <UserCircleIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-red-500 text-lg font-medium">
            Could not load profile. Please try logging in again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 py-2">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 py-8 px-4 sm:px-6">
            <div className="absolute inset-0 bg-black/20 pointer-events-none rounded-t-2xl"></div>
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                <div className="relative group">
                  <img
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    src={
                      profile.profilePicture?.startsWith("http")
                        ? profile.profilePicture
                        : profile.profilePicture !== "no-photo.jpg"
                        ? `${API_URL}${profile.profilePicture}`
                        : `https://ui-avatars.com/api/?name=${profile.fullName}&background=8344AD&color=fff&size=128`
                    }
                    alt={profile.fullName}
                  />

                  <label className="absolute bottom-2 right-2 bg-white text-gray-700 rounded-full p-2 cursor-pointer shadow-lg hover:bg-gray-100 transition-all duration-200 group-hover:scale-110">
                    <CameraIcon className="w-4 h-4" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      disabled={uploading}
                    />
                  </label>

                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>

                <div className="text-white text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                    {profile.fullName}
                  </h1>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm sm:text-base opacity-90">
                    <span className="flex items-center gap-1">
                      <AcademicCapIcon className="w-4 h-4" />
                      Class of {profile.batchYear}
                    </span>
                    {profile.currentOrganization && (
                      <span className="flex items-center gap-1">
                        <BuildingOfficeIcon className="w-4 h-4" />
                        {profile.currentOrganization}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    isEditing
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } shadow-lg`}
                >
                  {isEditing ? (
                    <>
                      <XMarkIcon className="w-4 h-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <PencilIcon className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mobile: Show main content first (order-1), Desktop: Show as second column (lg:order-2) */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {isEditing ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <PencilIcon className="w-5 h-5 text-blue-600" />
                      Edit Profile
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Organization
                          </label>
                          <input
                            name="currentOrganization"
                            type="text"
                            value={formData.currentOrganization}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                          </label>
                          <input
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>

                        {/* <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                          </label>
                          <input
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div> */}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                          </label>
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Tell us about yourself..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              LinkedIn Profile
                            </label>
                            <input
                              name="linkedInProfile"
                              type="url"
                              value={formData.linkedInProfile}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="https://linkedin.com/in/..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Facebook Profile
                            </label>
                            <input
                              name="facebookProfile"
                              type="url"
                              value={formData.facebookProfile}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="https://facebook.com/..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Instagram Profile
                            </label>
                            <input
                              name="instagramProfile"
                              type="url"
                              value={formData.instagramProfile}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="https://instagram.com/..."
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                          <button
                            type="submit"
                            disabled={loading || uploading}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-primary/70 text-white font-medium rounded-lg hover:bg-primary/70 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                          >
                            {loading ? (
                              <>
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <CheckIcon className="w-4 h-4" />
                                Save Changes
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 bg-red-300  text-gray-700 font-medium rounded-lg hover:bg-red-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
                        About Me
                      </h2>

                      {profile.bio ? (
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {profile.bio}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <UserCircleIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500 text-lg">
                            No bio added yet
                          </p>
                          <p className="text-gray-400 text-sm mt-2">
                            Click "Edit Profile" to add your bio and tell others
                            about yourself!
                          </p>
                        </div>
                      )}

                      {profile.currentOrganization && (
                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-blue-900">
                              Currently Working At
                            </span>
                          </div>
                          <p className="text-blue-800 text-lg font-semibold">
                            {profile.currentOrganization}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Social Media Links */}
                    {(profile.linkedInProfile ||
                      profile.facebookProfile ||
                      profile.instagramProfile) && (
                      <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <GlobeAltIcon className="w-5 h-5 text-blue-600" />
                          Social Media
                        </h2>
                        <div className="space-y-3">
                          {profile.linkedInProfile && (
                            <a
                              href={profile.linkedInProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                              <div className="text-blue-600">
                                {getSocialIcon("linkedin")}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  LinkedIn
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  View Profile
                                </p>
                              </div>
                            </a>
                          )}

                          {profile.facebookProfile && (
                            <a
                              href={profile.facebookProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                              <div className="text-blue-600">
                                {getSocialIcon("facebook")}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  Facebook
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  View Profile
                                </p>
                              </div>
                            </a>
                          )}

                          {profile.instagramProfile && (
                            <a
                              href={profile.instagramProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors"
                            >
                              <div className="text-pink-600">
                                {getSocialIcon("instagram")}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  Instagram
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  View Profile
                                </p>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Mobile: Show sidebar second (order-2), Desktop: Show as first column (lg:order-1) */}
            <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{profile.email}</p>
                    </div>
                  </div>

                  {profile.phoneNumber && (
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">
                          {profile.phoneNumber}
                        </p>
                      </div>
                    </div>
                  )}

                  {profile.location && (
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">
                          {profile.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5 text-blue-600" />
                  Academic Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Batch Year</p>
                      <p className="font-medium text-gray-900">
                        {profile.batchYear}
                      </p>
                    </div>
                  </div>

                  {profile.admissionNumber && (
                    <div className="flex items-center gap-3">
                      <IdentificationIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Admission Number</p>
                        <p className="font-medium text-gray-900">
                          {profile.admissionNumber}
                        </p>
                      </div>
                    </div>
                  )}

                  {profile.dateOfBirth && (
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(profile.dateOfBirth)}
                          {calculateAge(profile.dateOfBirth) && (
                            <span className="text-gray-500 ml-2">
                              ({calculateAge(profile.dateOfBirth)} years old)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
