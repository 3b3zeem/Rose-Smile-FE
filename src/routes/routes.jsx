import { createBrowserRouter } from "react-router-dom";
import LayOut from "../layouts/Layout.jsx";
import { lazy, Suspense } from "react";
import NotFound from "../components/NotFound/NotFound.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy.jsx";

const Loader = lazy(() => import("../layouts/Loader.jsx"));
const Home = lazy(() => import("../pages/Home/Home.jsx"));
const Services = lazy(() => import("../pages/Service/Services.jsx"));
const ServiceId = lazy(() => import("../pages/Service/ServiceId/ServiceId.jsx"));
const Sections = lazy(() => import("../pages/Section/Sections.jsx"));
const SectionId = lazy(() => import("../pages/Section/SectionId/SectionId.jsx"));

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
      {
        path: "services",
        element: (
          <Suspense fallback={<Loader />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "service/:reference",
        element: (
          <Suspense fallback={<Loader />}>
            <ServiceId />
          </Suspense>
        ),
      },
      {
        path: "sections",
        element: (
          <Suspense fallback={<Loader />}>
            <Sections />
          </Suspense>
        ),
      },
      {
        path: "section/:reference",
        element: (
          <Suspense fallback={<Loader />}>
            <SectionId />
          </Suspense>
        ),
      },
      {
        path: "PrivacyPolicy",
        element: (
          <Suspense fallback={<Loader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      { path: "*", element: <NotFound /> },

    ],
  },
]);

export default routes;
