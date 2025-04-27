import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Tag,
  Briefcase,
  Layers,
  LogOut,
} from "lucide-react";

import logo from "../../../assets/Iamges/logo.png";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 text-gray-900 flex flex-col sticky top-0 left-0 bottom-0">
      <div className="flex justify-center pt-5 border-b border-gray-300">
        <img src={logo} alt="logo" width={100} />
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 transition ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <LayoutDashboard />
          لوحة التحكم
        </NavLink>
        <NavLink
          to="/admin-dashboard/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 transition ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <Users size={20} />
          المستخدمين
        </NavLink>
        <NavLink
          to="/admin-dashboard/offers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 transition ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <Tag size={20} />
          العروض
        </NavLink>
        <NavLink
          to="/admin-dashboard/services"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 transition ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <Briefcase size={20} />
          الخدمات
        </NavLink>
        <NavLink
          to="/admin-dashboard/sections"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 transition ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <Layers size={20} />
          الأقسام
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-300">
        <button className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 px-4 rounded cursor-pointer">
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
