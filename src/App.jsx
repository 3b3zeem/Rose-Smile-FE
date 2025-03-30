import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <React.Fragment>
        <RouterProvider router={routes} />
    </React.Fragment>
  );
}

export default App;
