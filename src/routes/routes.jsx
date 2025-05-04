import { createBrowserRouter } from "react-router-dom";
import LayOut from "../layouts/Layout.jsx";
import AdminLayout from "../dashboard/layouts/Layout.jsx";
import { lazy, Suspense } from "react";
import NotFound from "../components/NotFound/NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import BookADeal from "../components/BookADeal/BookADeal.jsx";
import NewsId from "../pages/News/NewsId/NewsId.jsx";

const Loader = lazy(() => import("../layouts/Loader.jsx"));
const Home = lazy(() => import("../pages/Home/Home.jsx"));
const PrivacyPolicy = lazy(() =>
  import("../pages/PrivacyPolicy/PrivacyPolicy.jsx")
);
const Services = lazy(() => import("../pages/Service/Services.jsx"));

const News = lazy(() => import("../pages/News/News.jsx"));

const ServiceId = lazy(() =>
  import("../pages/Service/ServiceId/ServiceId.jsx")
);
const Sections = lazy(() => import("../pages/Section/Sections.jsx"));
const SectionId = lazy(() =>
  import("../pages/Section/SectionId/SectionId.jsx")
);
const DoctorList = lazy(() => import("../pages/Doctors/DoctorList.jsx"));
const DoctorDetail = lazy(() => import("../pages/Doctors/DoctorDetails.jsx"));
const Register = lazy(() => import("../pages/Auth/Register.jsx"));
const Login = lazy(() => import("../pages/Auth/Login.jsx"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword.jsx"));
const Profile = lazy(() => import("../pages/User/Profile.jsx"));

// * Admin
const Dashboard = lazy(() => import("../dashboard/pages/Home/Dashboard.jsx"));
const Users = lazy(() => import("../dashboard/pages/Users/Users.jsx"));
const AdminServices = lazy(() =>
  import("../dashboard/pages/Services/AdminServices.jsx")
);
// DashBoard Doctor
const AdminDoctors = lazy(() =>
  import("../dashboard/pages/Doctors/AdminDoctors.jsx")
);
const AddDoctor = lazy(() =>
  import("../dashboard/pages/Doctors/AddDoctorModal.jsx")
);
const EditDoctor = lazy(() =>
  import("../dashboard/pages/Doctors/EditDoctorModal.jsx")
);



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
        path: "news",
        element: (
          <Suspense fallback={<Loader />}>
            <News />
          </Suspense>
        ),
      },
      {
        path: "news/:newId",
        element: (
          <Suspense fallback={<Loader />}>
            <NewsId />
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
        path: "BookADeal/:reference",
        element: (
          <Suspense fallback={<Loader />}>
            <BookADeal />
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
      {
        path: "admin-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
            <Suspense fallback={<Loader />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "users", // /admin-dashboard/users
            element: (
              <Suspense fallback={<Loader />}>
                <Users />
              </Suspense>
            ),
          },
          // {
          //   path: "offers", // /admin-dashboard/offers
          //   element: (
          //     <Suspense fallback={<Loader />}>
          //       <Offers />
          //     </Suspense>
          //   ),
          // },
          {
            path: "services", // /admin-dashboard/services
            element: (
              <Suspense fallback={<Loader />}>
                <AdminServices />
              </Suspense>
            ),
          },
          {
            path: "doctors", // /admin-dashboard/doctors
            element: (
              <Suspense fallback={<Loader />}>
                <AdminDoctors />
              </Suspense>
            ),
          },
          {
            path: "doctors/add", // /admin-dashboard/doctors/add
            element: (
              <Suspense fallback={<Loader />}>
                <AddDoctor />
              </Suspense>
            ),
          },
          {
            path: "doctors/edit/:doctorId", // /admin-dashboard/doctors/edit/123
            element: (
              <Suspense fallback={<Loader />}>
                <EditDoctor />
              </Suspense>
            ),
          },
          
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
