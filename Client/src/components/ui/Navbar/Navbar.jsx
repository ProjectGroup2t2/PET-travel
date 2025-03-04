// Navbar.jsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";  
import Logo from "./Logo";
import Cart from "./Cart";
import Profile from "./Profile";
import Search from "./Search";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const hiddenNavbar = ["/login", "/register", "/admin"];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // ฟังก์ชันตรวจสอบ JWT และ user
  const checkAuth = () => {
    const token = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");
    
    if (token) {
      setIsAuthenticated(true);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // ตรวจสอบเมื่อ mount และเมื่อ localStorage เปลี่ยนแปลง
  useEffect(() => {
    // เรียกครั้งแรกเมื่อ mount
    checkAuth();

    // เพิ่ม event listener สำหรับการเปลี่ยนแปลงของ storage
    const handleStorageChange = (e) => {
      if (e.key === "jwt" || e.key === "user") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // cleanup listener เมื่อ component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // dependency array ว่างเปล่าเพื่อ run เฉพาะตอน mount/unmount

  // ฟังก์ชัน logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    // window.location.href = "/login"; // ถ้าต้องการ redirect
  };

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
        <Link 
          href="/payment" 
          className="text-[#2A8470] hover:text-[#1f6254] font-medium text-lg transition-colors"
        >
          ชำระเงิน
        </Link>
        
        {/* Icons */}
        <div className="flex items-center space-x-4 ml-8">
          <div className="hover:opacity-80 transition-opacity">
            <Cart />
          </div>
          <div className="h-6 w-[1px] bg-gray-300"></div>
          <div className="hover:opacity-80 transition-opacity">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Profile user={user} onLogout={handleLogout} />
              </div>
            ) : (
              <div className="flex gap-2">
                <Link 
                  href="/login"
                  className="text-[#2A8470] hover:text-[#1f6254] font-medium text-lg transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
                <span className="text-[#2A8470]">/</span>
                <Link 
                  href="/register"
                  className="text-[#2A8470] hover:text-[#1f6254] font-medium text-lg transition-colors"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;