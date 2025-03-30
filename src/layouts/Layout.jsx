import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const LayOut = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};

export default LayOut;
