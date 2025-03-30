import React from "react";

import "./Navbar.css";

const ArabicNavbar = () => {
  const navItems = [
    { text: "تواصل معنا", href: "#" },
    { text: "آخر الأخبار", href: "#" },
    { text: "خدماتنا", href: "#" },
    { text: "الأطباء", href: "#" },
    { text: "الرئيسية", href: "#" },
  ];

  return (
    <nav
      className="bg-white shadow-md w-full py-4 px-6 flex items-center justify-between"
      dir="rtl"
    >
      {/* Navigation links */}
      <div className="flex items-center">
        {/* Login/Register button */}
        <button className="bg-blue-800 text-white font-bold py-2 px-4 rounded me-5 search">
          <span>تسجيل دخول</span>
        </button>

        <div>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`text-gray-700 hover:text-blue-800 font-bold px-3 NavLinks`}
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="flex items-center">
        <svg
          width="50"
          height="40"
          viewBox="0 0 50 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 5C18 15 8 18 8 25C8 32 15 37 25 37C35 37 42 32 42 25C42 18 32 15 25 5Z"
            fill="white"
            stroke="#FF4081"
            strokeWidth="2"
          />
          <path
            d="M25 5C28 12 32 15 35 18C30 18 20 18 15 18C18 15 22 12 25 5Z"
            fill="#FF4081"
          />
          <path
            d="M15 25C15 22 18 20 25 20C32 20 35 22 35 25C35 28 32 30 25 30C18 30 15 28 15 25Z"
            fill="white"
            stroke="#FF4081"
            strokeWidth="1"
          />
        </svg>
      </div>
    </nav>
  );
};

export default ArabicNavbar;
