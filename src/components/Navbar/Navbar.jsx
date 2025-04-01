import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import "./Navbar.css";
import { Link } from "react-router-dom";

const ArabicNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "الرئيسية", href: "#" },
    { text: "الأطباء", href: "#" },
    { text: "خدماتنا", href: "#" },
    { text: "آخر الأخبار", href: "#" },
    { text: "تواصل معنا", href: "#" },
  ];

  return (
    <React.Fragment>
      <nav
        className="bg-white shadow-md w-full py-4 px-6 flex items-center justify-between"
        dir="rtl"
      >
        {/* Navigation links - desktop view */}
        <div className="hidden md:flex items-center">
          {/* Login/Register button */}
          <button className="bg-blue-800 text-white font-bold py-2 px-4 rounded me-5 search cursor-pointer">
            <span>تسجيل دخول</span>
          </button>

          {/* Navigation links Normal mode */}
          <div>
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`text-gray-700 hover:text-blue-800 font-bold px-3 NavLinks`}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-5">
          <button
            className="text-gray-700 cursor-pointer"
            onClick={toggleDrawer(true)}
          >
            <Menu size={24} />
          </button>

          {/* Login/Register button for mobile */}
          <button className="bg-blue-800 text-white font-bold py-2 px-4 rounded me-3 search">
            <span>تسجيل دخول</span>
          </button>
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

        {/* MUI Drawer for mobile navigation */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            dir="rtl"
          >
            <div className="flex justify-between items-center p-4 border-b cursor-pointer">
              <span className="font-bold text-lg">القائمة</span>
              <button onClick={toggleDrawer(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-start mt-4 gap-5 j">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`text-gray-700 hover:text-blue-800 font-bold px-3 ms-2 NavLinks`}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </Box>
        </Drawer>
      </nav>
    </React.Fragment>
  );
};

export default ArabicNavbar;
