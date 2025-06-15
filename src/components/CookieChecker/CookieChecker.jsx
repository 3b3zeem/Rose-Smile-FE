// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";

// const fetchUser = async () => {
//   const res = await axios.get(
//     `${import.meta.env.VITE_BACK_END}/api/v1/user/profile`,
//     {
//       withCredentials: true,
//     }
//   );
//   return res.data.user;
// };

// const SkeletonBox = ({
//   width = "100%",
//   height = "20px",
//   margin = "10px 0",
// }) => (
//   <div
//     style={{
//       width,
//       height,
//       margin,
//       backgroundColor: "#eee",
//       borderRadius: "4px",
//       animation: "pulse 1.5s ease-in-out infinite",
//     }}
//   />
// );

// const CookieErrorOverlay = () => (
//   <div
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(0,0,0,0.85)",
//       color: "white",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       textAlign: "center",
//       fontSize: "18px",
//       padding: "20px",
//       zIndex: 9999,
//     }}
//   >
//     <p>
//       الموقع يحتاج تفعيل الكوكيز علشان يشتغل بشكل صحيح.
//       <br />
//       برجاء تفعيل الكوكيز من إعدادات المتصفح وإعادة تحميل الصفحة.
//     </p>
//   </div>
// );

// const CookieChecker = () => {
//   const [showOverlay, setShowOverlay] = useState(true);
//   const { isLoading, isError } = useQuery({
//     queryKey: ["user"],
//     queryFn: fetchUser,
//     retry: false,
//     refetchOnWindowFocus: false,
//   });

//   if (isLoading) {
//     return (
//       <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
//         <SkeletonBox width="60%" height="30px" margin="0 0 20px 0" />
//         <SkeletonBox width="100%" height="15px" />
//         <SkeletonBox width="100%" height="15px" />
//         <SkeletonBox width="80%" height="15px" />
//         <style>{`
//           @keyframes pulse {
//             0% { opacity: 1; }
//             50% { opacity: 0.4; }
//             100% { opacity: 1; }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (isError) {
//     return <CookieErrorOverlay />;
//   }

//   return null;
// };

// const checkCookiesAfterLogin = async () => {
//   try {
//     const user = await fetchUser();
//     return { success: true, user };
//   } catch (error) {
//     return { success: false };
//   }
// };

// const handleLoginSuccess = async (userData) => {
//   const result = await checkCookiesAfterLogin();

//   if (result.success) {
//     localStorage.setItem("isLogin", "true");
//     localStorage.setItem("userData", JSON.stringify(userData));
//     return true;
//   } else {
//     return false;
//   }
// };

// const LoginHandler = ({ userData }) => {
//   const [showCookieError, setShowCookieError] = useState(false);

//   const onLogin = async () => {
//     const success = await handleLoginSuccess(userData);
//     if (!success) {
//       setShowCookieError(true);
//     }
//   };

//   if (showCookieError) {
//     return <CookieErrorOverlay />;
//   }

//   return <button onClick={onLogin}>Login</button>;
// };

// export default CookieChecker;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"; // هنستخدم useState عشان التحكم في ظهور الـ overlay

const fetchUser = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACK_END}/api/v1/user/profile`,
    {
      withCredentials: true,
    }
  );
  return res.data.user;
};

const SkeletonBox = ({
  width = "100%",
  height = "20px",
  margin = "10px 0",
}) => (
  <div
    style={{
      width,
      height,
      margin,
      backgroundColor: "#eee",
      borderRadius: "4px",
      animation: "pulse 1.5s ease-in-out infinite",
    }}
  />
);

const CookieChecker = () => {
  const [showOverlay, setShowOverlay] = useState(true); // state عشان التحكم في ظهور الـ overlay

  const { isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
        <SkeletonBox width="60%" height="30px" margin="0 0 20px 0" />
        <SkeletonBox width="100%" height="15px" />
        <SkeletonBox width="100%" height="15px" />
        <SkeletonBox width="80%" height="15px" />
        <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  if (isError && showOverlay) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "10px",
          backgroundColor: "rgba(0,0,0,0.85)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "18px",
          padding: "20px",
          zIndex: 9999,
          width: "500px",
          borderRadius: "10px",
        }}
      >
        <p>
          الموقع يحتاج تفعيل الكوكيز علشان يشتغل بشكل صحيح.
          <br />
          برجاء تفعيل الكوكيز من إعدادات المتصفح وإعادة تحميل الصفحة.
        </p>
        <button
          onClick={() => setShowOverlay(false)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          إغلاق
        </button>
      </div>
    );
  }

  return null;
};

export default CookieChecker;
