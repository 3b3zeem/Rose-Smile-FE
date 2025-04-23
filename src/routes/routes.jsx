import { createBrowserRouter } from "react-router-dom";
import LayOut from "../layouts/Layout.jsx";
import { lazy, Suspense } from "react";
import NotFound from "../components/NotFound/NotFound.jsx";

const Loader = lazy(() => import("../layouts/Loader.jsx"));
const Home = lazy(() => import("../pages/Home/Home.jsx"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy.jsx"));
const Services = lazy(() => import("../pages/Service/Services.jsx"));
const ServiceId = lazy(() => import("../pages/Service/ServiceId/ServiceId.jsx"));
const Sections = lazy(() => import("../pages/Section/Sections.jsx"));
const SectionId = lazy(() => import("../pages/Section/SectionId/SectionId.jsx"));
const DoctorList = lazy(() => import("../pages/Doctors/DoctorList.jsx"));
const DoctorDetail = lazy(() => import("../pages/Doctors/DoctorDetails.jsx"));
const Register = lazy(() => import("../pages/Auth/Register.jsx"));
const Login = lazy(() => import("../pages/Auth/Login.jsx"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword.jsx"));
const Profile = lazy(() => import("../pages/User/Profile.jsx"));

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
      {
        path: "doctors",
        element: (
          <Suspense fallback={<Loader />}>
            <DoctorList />
          </Suspense>
        ),
      },
      {
        path: "doctor/:doctorId",
        element: (
          <Suspense fallback={<Loader />}>
            <DoctorDetail />
          </Suspense>
        ),
      },
      { 
        
        path: "register",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "resetPassword/:token",
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        ),
      },
      { path: "*", element: <NotFound /> },

    ],
  },
]);

export default routes;
