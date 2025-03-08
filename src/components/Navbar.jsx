import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if token exists on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Converts token presence into a boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo Section */}
      <Link to="/">
        <h1 className="w-32 cursor-pointer">RESUME ANALYST</h1>
      </Link>

      {/* Navigation Links (Only shown if logged in) */}
      <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/analyze-resume" className="hover:text-blue-500">
                Analyze Resume
              </Link>
            </li>
            <li>
              <Link to="/search-jobs" className="hover:text-blue-500">
                Search Jobs
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* User Dropdown or Create Account Button */}
      <div className="relative">
        {isLoggedIn ? (
          // User Dropdown
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
          >
            <FaUserCircle className="text-3xl" />
          </button>
        ) : (
          // Create Account Button
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Create Account
          </Link>
        )}

        {/* Dropdown Menu */}
        {dropdownOpen && isLoggedIn && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
