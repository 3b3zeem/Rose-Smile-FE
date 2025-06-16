import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const LayOut = () => {
  const location = useLocation();
  const hideFooter =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/resetPassword");

  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      {!hideFooter && <Footer />}
    </React.Fragment>
  );
};

export default LayOut;
