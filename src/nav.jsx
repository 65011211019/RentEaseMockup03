import React, { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = () => {
    alert(`Searching for: ${searchText}`); // Replace with your search functionality
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 text-white z-10 relative bg-black">
      {/* Logo */}
      <h1 className="text-xl font-semibold">RentEase</h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <ul className="flex space-x-6">
          {["Home", "Product"].map((item) => (
            <li
              key={item}
              className="text-gray-300 hover:text-white transition duration-300"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-button-pink"
          />
          <button
            onClick={handleSearch}
            className="bg-button-pink px-4 py-2 rounded-md text-white hover:bg-pink-500 transition duration-300"
          >
            ค้นหา
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden text-gray-300 hover:text-white"
        onClick={toggleMenu}
      >
        <span className="material-icons">menu</span>
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-black text-white md:hidden`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4">
          {["Home", "Product"].map((item) => (
            <li
              key={item}
              className="text-gray-300 hover:text-white transition duration-300"
            >
              {item}
            </li>
          ))}

          {/* Search Bar in Mobile */}
          <div className="flex flex-col items-center space-y-2 w-11/12">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-button-pink"
            />
            <button
              onClick={handleSearch}
              className="bg-button-pink px-4 py-2 rounded-md text-white hover:bg-pink-500 transition duration-300 w-full"
            >
              ค้นหา
            </button>
          </div>

          {/* Mobile Buttons (Cart and Login) */}
          <li className="text-gray-300 hover:text-white transition duration-300">
            <button>ตะกร้า</button>
          </li>
          <li className="text-gray-300 hover:text-white transition duration-300">
            <button className="bg-button-pink px-4 py-2 rounded-md text-white">
              เข้าสู่ระบบ
            </button>
          </li>
        </ul>
      </div>

      {/* Right Buttons (Desktop) */}
      <div className="hidden md:flex space-x-4">
        <button className="text-gray-300 hover:text-white">ตะกร้า</button>
        <button className="bg-button-pink px-4 py-2 rounded-md text-white">
          เข้าสู่ระบบ
        </button>
      </div>
    </nav>
  );
};

export default Nav;
