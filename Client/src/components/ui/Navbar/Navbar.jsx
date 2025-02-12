import React from "react";
import Logo from "./Logo";
import Cart from "./Cart";
import Profile from "./Profile";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md flex items-center justify-between h-16 px-4 lg:px-24">
      {/* Logo & Search Bar */}
      <div className="flex items-center flex-grow gap-10">
        <div className="flex-shrink-0 relative top-[-10px]">
          <Logo />
        </div>
        <div className="flex-grow max-w-sm">
          <Search />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10 text-green-900 font-semibold items-center order-3">
        <a href="/" className="hover:text-gray-600 text-xl">
          HOME PAGE
        </a>
        <a href="#" className="hover:text-gray-600 text-xl">
          PACKAGE
        </a>
        <a href="#" className="hover:text-gray-600 text-xl">
          ABOUT US
        </a>
        {/* Icons */}
        <div className="flex items-center space-x-3">
          <Cart />
          <div className="h-6 w-[1.5px] bg-gray-400 -mx-1"></div>
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar