import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Stethoscope,
  Info,
  GlobeLock,
} from "lucide-react";
import { Tooltip } from "@mui/material";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-blue-900 text-white py-10 px-6 md:px-12 lg:px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold mb-3">ميديكال</h2>
            <p className="text-sm">الريادة في التميز الطبي، رعاية موثوقة</p>
          </div>

          {/* Important Links */}
          <div className="flex flex-col items-end">
            <h3 className="text-lg font-semibold mb-4">روابط مهمة</h3>
            <ul className="space-y-2 text-right">
              <li onClick={() => navigate('/doctors')} className="flex items-center justify-end gap-2 cursor-pointer NavLinks">
                <span>الأطباء</span>
                <Stethoscope className="w-4 h-4" />
              </li>
              <li onClick={() => navigate('/services')} className="flex items-center justify-end gap-2 cursor-pointer NavLinks">
                <span>الخدمات</span>
                <User className="w-4 h-4" />
              </li>
              <li className="flex items-center justify-end gap-2 cursor-pointer NavLinks">
                <Link to={"/PrivacyPolicy"}>سياسة الخصوصية</Link>
                <GlobeLock className="w-4 h-4" />
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-end">
            <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
            <ul className="space-y-2 text-right">
              <li className="flex items-center justify-end gap-2 cursor-pointer">
                <a
                  href="tel:+966508533232"
                  className="text-white hover:underline flex items-center gap-2 duration-200 transition-all"
                >
                  <span dir="ltr" className="">+966 50 853 3232</span>
                  <Phone className="w-4 h-4" />
                </a>
              </li>
              <li className="flex items-center justify-end gap-2 cursor-pointer">
                <span>fildineesoe@gmail.com</span>
                <Mail className="w-4 h-4" />
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-blue-500" />

        {/* Copyright */}
        <div className="text-center text-sm">
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
