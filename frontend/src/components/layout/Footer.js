import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F172A] text-gray-400">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="text-sm space-y-1">
            <p>
              &copy; {new Date().getFullYear()} JNV MAA (Mandaphia Alumni Association)
            </p>
            <Link
              to="/privacy-policy"
              className="hover:text-white hover:underline"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/about" className="font-semibold text-white underline">
              Meet the Developers
            </Link>
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className="absolute -top-5 right-8 bg-secondary text-primary rounded-full p-3 shadow-lg hover:bg-opacity-80 transition transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
}
