import React, { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import "./Navbar.css";
import { Link } from "react-router-dom";

import logo from "../../assets/Iamges/logo.png"

const ArabicNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleDrawer = (open) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { text: "الرئيسية", href: "/" },
    { text: "الأطباء", href: "/doctors" },
    { text: "خدماتنا", href: "/Services" },
    { text: "السكاشن المتاحة", href: "/sections" },
    { text: "آخر الأخبار", href: "#" },
    { text: "تواصل معنا", href: "#" },
  ];

  return (
    <React.Fragment>
      <nav
        className="sticky top-0 bg-white shadow-md w-full p-2 px-6 flex flex-col justify-between z-100 relative"
        dir="rtl"
      >
        <div className="flex items-center justify-between">
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
            <img src={logo} alt="logo" width={90} />
          </div>
        </div>

        <div className="h-[3px] w-full bg-gray-200 absolute bottom-0 left-0">
          <div
            className="h-full bg-blue-800 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          ></div>
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
