import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import React, { useEffect, useState } from "react";
import Up_top from "./components/Up-to-top/Up-to-top";
import CookieChecker from "./components/CookieChecker/CookieChecker";
import Social from "./components/Social/Social";
import { Toaster } from "react-hot-toast";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  return (
    <React.Fragment>
      <Up_top />
      <Social />
      {isLoggedIn && <CookieChecker />}
      <RouterProvider router={routes} />
      <Toaster position="top-center" reverseOrder={false} />
    </React.Fragment>
  );
}

export default App;
