import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Tag,
  Briefcase,
  Layers,
  Menu,
  Stethoscope,
  FileText,
  Megaphone,
  BookUser,
} from "lucide-react";

import logo from "../../../assets/Iamges/logo.png";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isLogin = localStorage.getItem("isLogin");
  const user = isLogin ? JSON.parse(localStorage.getItem("user")) : null;
  const superAdmin = user.role === "superadmin";
  const admin = user.role === "admin";

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
          {superAdmin && (
            <>
              <SidebarItem
                to="/admin-dashboard/heroes"
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
                label="الاطباء"
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
                to="/admin-dashboard/sections"
                icon={<Layers />}
                label="الأقسام"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/news"
                icon={<Layers />}
                label="الاخبار"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/sheets"
                icon={<FileText />}
                label="فورمات"
                isOpen={isOpen}
              />
              <SidebarItem
                to="/admin-dashboard/customers"
                icon={<BookUser />}
                label="بيانات العملاء"
                isOpen={isOpen}
              />
            </>
          )}

          {admin && (
            <>
              <SidebarItem
                to="/admin-dashboard/customers"
                icon={<BookUser />}
                label="بيانات العملاء"
                isOpen={isOpen}
              />
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
