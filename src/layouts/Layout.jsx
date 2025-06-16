import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Social from "../components/Social/Social";

const LayOut = () => {
  const location = useLocation();
  const hideFooter =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/resetPassword");

  const isAdminRoute = location.pathname.startsWith("/admin-dashboard");

  return (
    <React.Fragment>
      <Navbar />
      {!isAdminRoute && <Social />}
      <Outlet />
      {!hideFooter && <Footer />}
    </React.Fragment>
  );
};

export default LayOut;
