import { createBrowserRouter } from "react-router-dom";
import LayOut from "../layouts/Layout.jsx";
import { lazy, Suspense } from "react";
import NotFound from "../components/NotFound/NotFound.jsx";
import ServicesPage from "../pages/Home/ServicesPage.jsx";

const Home = lazy(() => import("../pages/Home/Home.jsx"));
const Loader = lazy(() => import("../layouts/Loader.jsx"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {path:"/Services", element:<ServicesPage/>},
      { path: "*", element: <NotFound /> },

    ],
  },
]);

export default routes;
