"use client";
import React from "react";
import Link from "next/link";  
import Logo from "./Logo";
import Cart from "./Cart";
import Profile from "./Profile";
import Search from "./Search";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const hiddenNavbar = ["/login", "/register", "/admin"];

  if (hiddenNavbar.includes(pathname)) return null;

  return (
    <nav className="bg-white border-b border-gray-200 flex items-center justify-between h-20 px-4 lg:px-8">
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
      <div className="hidden md:flex items-center space-x-12">
        <Link 
          href="/" 
          className="text-[#2A8470] hover:text-[#1f6254] font-medium text-lg transition-colors"
        >
          HOME PAGE
        </Link>
        <Link 
          href="/Package" 
          className="text-[#2A8470] hover:text-[#1f6254] font-medium text-lg transition-colors"
        >
          PACKAGE
        </Link>
        <Link 
          href="/about-us" 
          className="text-[#2A8470] hover:text-[#1f6254] font-medium text-lg transition-colors"
        >
          ABOUT US
        </Link>
        
        {/* Icons */}
        <div className="flex items-center space-x-4 ml-8">
          <div className="hover:opacity-80 transition-opacity">
            <Cart />
          </div>
          <div className="h-6 w-[1px] bg-gray-300"></div>
          <div className="hover:opacity-80 transition-opacity">
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;