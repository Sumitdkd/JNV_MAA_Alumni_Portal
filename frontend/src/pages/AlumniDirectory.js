import React, { useState, useEffect } from "react";
import userService from "../services/userService";
import Spinner from "../components/common/Spinner";
import AlumniDetailModal from "../components/directory/AlumniDetailModal";
import toast from "react-hot-toast";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  FunnelIcon,
} from "@heroicons/react/24/solid";

const API_URL = process.env.REACT_APP_API_URL.replace("/api", "");

export default function AlumniDirectory() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  // New filtering system
  const [filterType, setFilterType] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    batchYear: "",
    currentOrganization: "",
    location: "",
  });

  const filterOptions = [
    {
      value: "name",
      label: "Name",
      icon: UserGroupIcon,
      placeholder: "Search by name...",
    },
    {
      value: "batchYear",
      label: "Batch Year",
      icon: AcademicCapIcon,
      placeholder: "e.g., 2020",
    },
    {
      value: "currentOrganization",
      label: "Organization",
      icon: BuildingOfficeIcon,
      placeholder: "Search by company/institute...",
    },
    {
      value: "location",
      label: "Location",
      icon: MapPinIcon,
      placeholder: "Search by location...",
    },
  ];

  const getCurrentFilter = () =>
    filterOptions.find((option) => option.value === filterType);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const activeFilters = {
        page,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "")
        ),
      };
      const res = await userService.getAlumniDirectory(activeFilters);
      setUsers(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error("Could not fetch alumni.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, filters]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const newFilters = { ...filters, [filterType]: searchValue };
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      batchYear: "",
      currentOrganization: "",
      location: "",
    });
    setSearchValue("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterTypeChange = (newType) => {
    setFilterType(newType);
    setSearchValue(filters[newType] || "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
              <UserGroupIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Alumni Directory
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Connect with fellow alumni and expand your professional network.
            Search by name, batch year, organization, or location.
          </p>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Search & Filter
            </h2>
          </div>

          <form onSubmit={handleFilterSubmit} className="space-y-4 sm:space-y-6">
            {/* First Row: Filter Type and Search Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Filter Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter By
                </label>
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => handleFilterTypeChange(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 appearance-none transition-colors text-sm"
                  >
                    {filterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Value
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {React.createElement(getCurrentFilter().icon, {
                      className: "w-5 h-5 text-gray-400",
                    })}
                  </div>
                  <input
                    type={filterType === "batchYear" ? "number" : "text"}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={getCurrentFilter().placeholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-lg hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg text-sm transform hover:scale-105"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Second Row: Clear Button and Active Filters */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Clear All Filters</span>
              </button>

              {/* Active Filters Display */}
              {Object.values(filters).some(value => value !== "") && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Active filters:</span>
                  {Object.entries(filters).map(([key, value]) => 
                    value && (
                      <span key={key} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                        {filterOptions.find(opt => opt.value === key)?.label}: {value}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center py-8 sm:py-12">
              <Spinner />
            </div>
          ) : users.length > 0 ? (
            <>
              {/* Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="bg-gray-50 rounded-xl p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-primary/20"
                  >
                    <div className="text-center">
                      <img
                        src={
                          user.profilePicture?.startsWith("http")
                            ? user.profilePicture
                            : user.profilePicture !== "no-photo.jpg"
                            ? `${API_URL}${user.profilePicture}`
                            : `https://ui-avatars.com/api/?name=${user.fullName}&background=8344AD&color=fff&size=128`
                        }
                        alt={user.fullName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 object-cover border-2 border-primary/20"
                      />
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate">
                        {user.fullName}
                      </h3>
                      <p className="text-primary text-xs sm:text-sm font-medium mb-2">
                        Class of {user.batchYear}
                      </p>
                      {user.currentOrganization && (
                        <p className="text-gray-600 text-xs sm:text-sm truncate mb-1">
                          {user.currentOrganization}
                        </p>
                      )}
                      {user.location && (
                        <p className="text-gray-500 text-xs truncate">
                          📍 {user.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-6 sm:mt-8 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing page {pagination.currentPage} of {pagination.totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage <= 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage >= pagination.totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                No Alumni Found
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Alumni Detail Modal */}
      {selectedUser && (
        <AlumniDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
