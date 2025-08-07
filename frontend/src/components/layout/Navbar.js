import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import logo1 from "../../Assets/logo1.png"
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useNotifications } from "../../context/NotificationContext";
import NotificationsPanel from "./NotificationsPanel";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const API_URL = (process.env.REACT_APP_API_URL || "").replace("/api", "");

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loggedInNavigation = [
    { name: "Home", href: "/" },
    { name: "Groups", href: "/groups" },
    { name: "Directory", href: "/directory" },
    { name: "Feedback", href: "/feedback" },
    { name: "Developers", href: "/about" },
    ...(isAdmin ? [{ name: "Admin", href: "/admin" }] : []),
  ];

  const guestNavigation = [
    { name: "About", href: "/about" },
    {
      name: "Alumni",
      href: "#notable-alumni",
      onClick: (e) => handleNavClick(e, "#notable-alumni"),
    },
    { name: "Developer", href: "/about" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  const navigation = user ? loggedInNavigation : guestNavigation;

  return (
    <Disclosure
      as="nav"
      className="bg-surface/80 backdrop-blur-sm shadow-md sticky top-0 z-50"
    >
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left Section */}
              <div className="flex items-center">
                <Link
                  to="/"
                  className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary flex items-center shrink-0"
                >
              
                  <img src={logo1} alt="JNV MAA Logo"className="w-10 h-10 sm:w-12 sm:h-12 mr-2 object-contain"/>
                  <span className="hidden sm:block">JNV MAA</span>
                  <span className="sm:hidden">JNV MAA</span>
                </Link>
                <div className="hidden md:ml-6 md:flex md:space-x-4 lg:space-x-6">
                  {navigation.map((item) =>
                    item.onClick ? (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => item.onClick(e, item.href)}
                        className="border-transparent text-muted hover:text-on-surface hover:border-gray-300 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-semibold transition-colors whitespace-nowrap"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "border-primary text-on-surface"
                              : "border-transparent text-muted hover:text-on-surface hover:border-gray-300",
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-semibold transition-colors whitespace-nowrap"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    )
                  )}
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {user ? (
                  <>
                    {/* Desktop Notifications */}
                    <div
                      className="hidden sm:block md:hidden relative"
                    >
                      <button
                        onClick={() =>
                          setNotificationsOpen(!isNotificationsOpen)
                        }
                        className="p-2 rounded-full text-muted hover:text-on-surface hover:bg-gray-100 transition-colors relative"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span>
                        )}
                      </button>
                      {isNotificationsOpen && (
                        <NotificationsPanel
                          onClose={() => setNotificationsOpen(false)}
                        />
                      )}
                    </div>

                    {/* Desktop User Menu */}
                    <Menu as="div" className="hidden sm:block md:hidden relative">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:ring-2 hover:ring-primary/50 transition-all">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
                            src={
                              user.profilePicture?.startsWith("http")
                                ? user.profilePicture
                                : user.profilePicture !== "no-photo.jpg"
                                ? `${API_URL}${user.profilePicture}`
                                : `https://ui-avatars.com/api/?name=${user.fullName}&background=8344AD&color=fff`
                            }
                            alt={user.fullName}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-surface py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-muted hover:text-on-surface"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block w-full text-left px-4 py-2 text-sm text-muted hover:text-on-surface"
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    {/* Mobile Notifications */}
                    <div className="sm:hidden relative">
                      <button
                        onClick={() =>
                          setNotificationsOpen(!isNotificationsOpen)
                        }
                        className="p-2 rounded-full text-muted hover:text-on-surface hover:bg-gray-100 transition-colors"
                      >
                        <BellIcon className="h-6 w-6" />
                        {unreadCount > 0 && (
                          <span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-primary/90 border-2 border-surface"></span>
                        )}
                      </button>
                      {isNotificationsOpen && (
                        <NotificationsPanel
                          onClose={() => setNotificationsOpen(false)}
                        />
                      )}
                    </div>

                    {/* Desktop Notifications for Medium and Large Screens */}
                    <div className="hidden sm:block relative">
                      <button
                        onClick={() =>
                          setNotificationsOpen(!isNotificationsOpen)
                        }
                        className="p-2 rounded-full text-muted hover:text-on-surface hover:bg-gray-100 transition-colors relative"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span>
                        )}
                      </button>
                      {isNotificationsOpen && (
                        <NotificationsPanel
                          onClose={() => setNotificationsOpen(false)}
                        />
                      )}
                    </div>

                    {/* Desktop User Menu for Large Screens */}
                    <Menu as="div" className="hidden md:block relative">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:ring-2 hover:ring-primary/50 transition-all">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={
                              user.profilePicture?.startsWith("http")
                                ? user.profilePicture
                                : user.profilePicture !== "no-photo.jpg"
                                ? `${API_URL}${user.profilePicture}`
                                : `https://ui-avatars.com/api/?name=${user.fullName}&background=8344AD&color=fff`
                            }
                            alt={user.fullName}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-surface py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-muted hover:text-on-surface"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block w-full text-left px-4 py-2 text-sm text-muted hover:text-on-surface"
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>
                    {/* Desktop Auth Buttons */}
                    <div className="hidden sm:flex items-center space-x-2">
                      <Link
                        to="/login"
                        className="text-sm font-semibold text-muted hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                  </>
                )}

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-surface p-2 text-muted hover:bg-gray-100 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3 px-4">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="div"
                  className="w-full text-left"
                >
                  {item.onClick ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        item.onClick(e, item.href);
                        close();
                      }}
                      className="block rounded-md py-3 px-3 text-base font-medium text-muted hover:bg-gray-100 hover:text-on-surface transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={close}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-primary/10 text-primary border-l-4 border-primary"
                            : "text-muted hover:bg-gray-100 hover:text-on-surface",
                          "block rounded-md py-3 px-3 text-base font-medium transition-colors"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                </Disclosure.Button>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 pb-3">
              {user ? (
                <div className="px-4 space-y-1">
                  {/* User Info Section */}
                  <div className="flex items-center justify-between px-3 py-2 mb-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center min-w-0 flex-1">
                      <img
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                        src={
                          user.profilePicture?.startsWith("http")
                            ? user.profilePicture
                            : user.profilePicture !== "no-photo.jpg"
                            ? `${API_URL}${user.profilePicture}`
                            : `https://ui-avatars.com/api/?name=${user.fullName}&background=8344AD&color=fff`
                        }
                        alt={user.fullName}
                      />
                      <div className="ml-3 min-w-0 flex-1">
                        <div className="text-base font-medium text-on-surface truncate">
                          {user.fullName}
                        </div>
                        <div className="text-sm font-medium text-muted truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <Link
                    to="/profile"
                    onClick={close}
                    className="flex items-center w-full rounded-md py-3 px-3 text-base font-medium text-muted hover:bg-gray-100 hover:text-on-surface transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Your Profile
                  </Link>

                  {/* Notifications Link */}
                  <Link
                    to="/notifications"
                    onClick={close}
                    className="flex items-center w-full rounded-md py-3 px-3 text-base font-medium text-muted hover:bg-gray-100 hover:text-on-surface transition-colors"
                  >
                    <BellIcon className="w-5 h-5 mr-3" />
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full rounded-md py-3 px-3 text-base font-medium text-muted hover:bg-gray-100 hover:text-on-surface transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-4">
                  <Link
                    to="/login"
                    onClick={close}
                    className="flex items-center justify-center w-full rounded-md py-3 px-3 text-base font-medium text-muted hover:bg-gray-100 hover:text-on-surface transition-colors border border-gray-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={close}
                    className="flex items-center justify-center w-full rounded-lg bg-primary py-3 px-3 text-base font-semibold text-white shadow-md hover:bg-primary-dark transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
