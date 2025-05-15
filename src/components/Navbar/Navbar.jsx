import React, { useEffect, useState } from "react";
import { LayoutDashboard, LogOut, Menu, X, User } from "lucide-react";
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

  const avatarUrl = userData?.image?.url;
  const FirstName = userData?.firstName || "User";
  const LastName = userData?.lastName || "User";

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const toggleDrawer = (open) => () => {
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

  const navItems = [
    { text: "الرئيسية", href: "/" },
    { text: "الأطباء", href: "/doctors" },
    { text: "خدماتنا", href: "/Services" },
    { text: "الاقسام المتاحة", href: "/sections" },
    { text: "آخر الأخبار", href: "/News" },
  ];

  const renderAvatar = () => {
    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt={FirstName}
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full">
        <User size={20} />
      </div>
    );
  };

  return (
    <React.Fragment>
      <nav
        className="sticky top-0 right-0 bg-white shadow-md w-full py-3 px-6 flex flex-col justify-between z-500"
        dir="rtl"
      >
        <div className="flex items-center justify-between">
          {/* Navigation links - desktop view */}
          <div className="hidden md:flex items-center gap-8">
            {/* Login/Register button */}
            {isLogin ? (
              <div
                className="cursor-pointer relative"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-pink-400 transition-colors duration-200">
                  {renderAvatar()}
                </div>

                {isOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg z-50 border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="text-sm text-gray-600">مرحباً بك</p>
                      <p className="font-bold text-gray-800">
                        {FirstName} {LastName}
                      </p>
                    </div>
                    {user.role !== "user" && (
                      <button
                        onClick={handleDashboardRedirect}
                        className="flex items-center gap-3 w-full text-right px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>لوحة التحكم</span>
                      </button>
                    )}
                    <button
                      onClick={() => navigate("/profile")}
                      className="flex items-center gap-3 w-full text-right px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100"
                    >
                      <User className="w-5 h-5" />
                      <span>الصفحة الشخصية</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full text-right px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                تسجيل دخول
              </button>
            )}

            {/* Navigation links */}
            <div className="flex items-center gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-gray-700 hover:text-blue-800 font-semibold NavLinks"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-5">
            <button
              className="text-gray-700 hover:text-blue-800 transition-colors duration-200"
              onClick={toggleDrawer(true)}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-90 transition-opacity duration-200"
          >
            <img src={logo} alt="logo" className="w-[100px] object-contain" />
          </Link>
        </div>

        <div className="h-[3px] w-full bg-gray-100 absolute bottom-0 left-0">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-pink-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 280 }} role="presentation" dir="rtl">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-bold text-lg">القائمة</span>
              <button
                onClick={toggleDrawer(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              {isLogin && (
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center gap-3 mb-6 border-b border-gray-100 relative cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    {renderAvatar()}
                  </div>
                  <div className="flex flex-col mt-4">
                    <p className="text-sm text-gray-500">مرحباً بك</p>
                    <p className="font-bold text-gray-800">
                      {FirstName} {LastName}
                    </p>
                  </div>

                  {isOpen && (
                    <div className="absolute right-0 top-18 w-52 bg-white rounded-xl shadow-lg z-50 border border-gray-100 overflow-hidden">
                      {user.role !== "user" && (
                        <button
                          onClick={handleDashboardRedirect}
                          className="flex items-center gap-3 w-full text-right px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                          <LayoutDashboard className="w-5 h-5" />
                          <span>لوحة التحكم</span>
                        </button>
                      )}
                      <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-3 w-full text-right px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100"
                      >
                        <User className="w-5 h-5" />
                        <span>الصفحة الشخصية</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-right px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>تسجيل الخروج</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="text-gray-700 hover:text-blue-800 font-semibold transition-colors duration-200"
                    onClick={toggleDrawer(false)}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>

              {!isLogin && (
                <button
                  onClick={() => {
                    navigate("/login");
                    toggleDrawer(false)();
                  }}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
                >
                  تسجيل دخول
                </button>
              )}
            </div>
          </Box>
        </Drawer>
      </nav>
    </React.Fragment>
  );
};

export default ArabicNavbar;
