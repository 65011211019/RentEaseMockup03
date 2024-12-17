import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Retrieve logged-in user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    setLoggedInUser(null);
    setIsMenuOpen(false); // Close mobile menu on logout
    localStorage.removeItem("loggedInUser");
    window.location.reload(); // Refresh the page after logout
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle mobile menu

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center relative">
      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">RentEase</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <ul className="flex space-x-6">
          <li className="text-gray-300 hover:text-white transition duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="text-gray-300 hover:text-white transition duration-300">
            <Link to="/product">Product</Link>
          </li>
        </ul>

        {/* Desktop Login Section */}
        <div className="flex items-center space-x-4">
          {!loggedInUser ? (
            <Link to="/login" className="text-gray-300 hover:text-white transition duration-300">
              Login
            </Link>
          ) : (
            <DropdownMenu
              loggedInUser={loggedInUser}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 bg-black text-white w-full py-4 px-6 space-y-4 z-10">
          <ul>
            <li className="text-gray-300 hover:text-white transition duration-300">
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="text-gray-300 hover:text-white transition duration-300">
              <Link to="/product" onClick={toggleMenu}>Product</Link>
            </li>
            {!loggedInUser ? (
              <li>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/manage-profile"
                    className="text-gray-300 hover:text-white transition duration-300"
                    onClick={toggleMenu}
                  >
                    Manage Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="text-gray-300 hover:text-white transition duration-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

// Dropdown menu for desktop
const DropdownMenu = ({ loggedInUser, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-300"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{loggedInUser.user_name || "User"}</span>
        <svg
          className="w-4 h-4 transform rotate-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20">
          <ul className="py-2 text-gray-300">
            <li>
              <Link
                to="/manage-profile"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Manage Profile
              </Link>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
