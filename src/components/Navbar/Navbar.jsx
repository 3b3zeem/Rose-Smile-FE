import React, { useEffect, useRef, useState } from "react";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Iamges/logo.png";
import { useAuthContext } from "../../context/Auth/AuthContext";
import { useUserProfile } from "../../hooks/User/UseProfile";

const ArabicNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const isLogin = localStorage.getItem("isLogin");
  const user = isLogin ? JSON.parse(localStorage.getItem("user")) : null;

  const { userData, fetchUserProfile } = useUserProfile();

  const avatarUrl = userData?.image?.url || null;
  const FirstName = userData?.firstName || "User";
  const LastName = userData?.lastName || "User";

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const toggleDrawer = (open) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDashboardRedirect = () => {
    if (!user) return;
    if (user.role === "admin" || user.role === "superadmin")
      navigate("/admin-dashboard");
    else navigate("/dashboard");
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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const navItems = [
    { text: "الرئيسية", href: "/" },
    { text: "الأطباء", href: "/doctors" },
    { text: "خدماتنا", href: "/Services" },
    { text: "الاقسام المتاحة", href: "/sections" },
    { text: "آخر الأخبار", href: "#" },
    // { text: "تواصل معنا", href: "#" },
    { text: "الخصوصية", href: "/PrivacyPolicy" },
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
            {isLogin ? (
              <div
                className="cursor-pointer relative"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                  <img
                    src={avatarUrl}
                    alt={FirstName}
                    className="rounded-full"
                  />
                </div>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50">
                    <p className="text-center text mt-2 mb-2 text-gray-700 font-bold">
                      Hello, {FirstName} {LastName}
                    </p>
                    {user.role !== "user" && (
                      <button
                        onClick={handleDashboardRedirect}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <LayoutDashboard />
                        لوحة التحكم
                      </button>
                    )}
                    <button
                      onClick={() => navigate("/profile")}
                      className="flex items-center gap-3 w-full text-right px-4 py-4 hover:bg-gray-100 cursor-pointer border-b"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                        </svg>
                      </div>
                      الصفحة الشخصية
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full text-right px-4 py-3 text-red-600 hover:bg-gray-100 hover:rounded-xl cursor-pointer"
                    >
                      <LogOut />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-800 text-white font-bold py-2 px-4 rounded me-5 cursor-pointer"
              >
                تسجيل دخول
              </button>
            )}

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
                  onClick={toggleDrawer(false)}
                >
                  {item.text}
                </Link>
              ))}
            </div>
            {/* Login/Register button for mobile */}
            {isLogin ? (
              <div
                className="cursor-pointer relative"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div className="flex items-center gap-2 ms-3 mt-4">
                  <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                    <img
                      src={avatarUrl}
                      alt={FirstName}
                      className="rounded-full"
                    />
                  </div>
                  {/* <p className="text-center text mt-2 mb-2 text-gray-700 font-bold">
                    {FirstName} {LastName}
                  </p> */}
                </div>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50">
                    {user.role !== "user" && (
                      <button
                        onClick={() => {
                          handleDashboardRedirect();
                          toggleDrawer(false)();
                        }}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <LayoutDashboard />
                        لوحة التحكم
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        toggleDrawer(false)();
                      }}
                      className="flex items-center gap-3 w-full text-right px-4 py-4 hover:bg-gray-100 cursor-pointer border-b"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                        </svg>
                      </div>
                      الصفحة الشخصية
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleDrawer(false)();
                      }}
                      className="flex items-center gap-3 w-full text-right px-4 py-3 text-red-600 hover:bg-gray-100 hover:rounded-xl cursor-pointer"
                    >
                      <LogOut />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  toggleDrawer(false)();
                }}
                className="bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer ms-3 mt-4"
              >
                تسجيل دخول
              </button>
            )}
          </Box>
        </Drawer>
      </nav>
    </React.Fragment>
  );
};

export default ArabicNavbar;
