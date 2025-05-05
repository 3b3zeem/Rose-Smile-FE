import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Tag,
  Briefcase,
  Layers,
  LogOut,
  Menu,
  X,
  Stethoscope,
  FileText,
  Megaphone,
} from "lucide-react";

import logo from "../../../assets/Iamges/logo.png";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isLogin = localStorage.getItem("isLogin");
  const user = isLogin ? JSON.parse(localStorage.getItem("user")) : null;
  const superAdmin = user.role === "superadmin";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const SidebarItem = ({ to, icon, label, isOpen, className = "" }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded transition cursor-pointer ${
          isActive
            ? "bg-gray-800 text-blue-50 font-semibold"
            : "hover:bg-gray-200"
        } ${className}`
      }
    >
      {icon}
      {isOpen && <span className="text-sm">{label}</span>}
    </NavLink>
  );

  return (
    <>
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } h-screen bg-gray-100 text-gray-900 flex flex-col transition-all duration-300 sticky top-0 border-r border-gray-300`}
      >
        {/* Toggle button */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-400">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer hover:bg-gray-300 p-1 transition-all duration-200"
          >
            <Menu />
          </button>
          {isOpen && <span className="font-bold">القائمة</span>}
        </div>

        <div className="hidden md:flex justify-center py-2 border-b border-gray-300">
          <img src={logo} alt="logo" width={100} />
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-2">
          <SidebarItem
            to="/admin-dashboard"
            icon={<LayoutDashboard />}
            label="لوحة التحكم"
            isOpen={isOpen}
          />
          {superAdmin && (
            <>
              <SidebarItem
                to="/admin-dashboard/categories"
                icon={<Layers />}
                label="الرئيسية"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/users"
                icon={<Users />}
                label="المستخدمين"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/doctors"
                icon={<Stethoscope />}
                label="الدكاترة"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/offers"
                icon={<Tag />}
                label="العروض"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/services"
                icon={<Briefcase />}
                label="الخدمات"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/categories"
                icon={<Layers />}
                label="الأقسام"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/categories"
                icon={<FileText />}
                label="شيتات"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/categories"
                icon={<Megaphone />}
                label="الاعلانات"
                isOpen={isOpen}
              />
            </>
          )}
        </nav>

        <div className="p-2 border-t border-gray-700">
          <SidebarItem
            icon={<LogOut />}
            label="تسجيل الخروج"
            isOpen={isOpen}
            className="text-red-400 hover:text-red-600"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
