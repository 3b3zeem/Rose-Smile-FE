import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/Auth/useLogin";
import * as Yup from "yup";
import { useFormik } from "formik";
import ForgotPasswordModal from "../../components/Auth/ForgotPasswordModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("بريد إلكتروني غير صالح")
    .matches(
      /^[\w-.]+@([\w-]+\.)+(com|net|org|pro|eg|sa)$/i,
      "البريد الإلكتروني يجب أن ينتهي بـ com أو net أو org أو pro أو eg أو sa"
    )
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "كلمة المرور يجب أن تحتوي على أحرف وأرقام")
    .required("كلمة المرور مطلوبة"),
});

const Login = () => {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      const res = await login(payload);
      if (res?.success) {
        toast.success("تم تسجيل الدخول بنجاح");
      
        const user = res?.user || JSON.parse(localStorage.getItem("user"));
      
        setTimeout(() => {
          if (user?.role === "admin" || user?.role === "superadmin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        }, 500);
      }
    },
  });

  return (
    <div className="min-h-screen max-w-md mx-auto px-4 py-12 text-center ">
      <ToastContainer position="bottom-left" rtl theme="colored" />

      <h2 className="text-3xl font-bold text-blue-800 mb-6">تسجيل الدخول</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-right" dir="rtl">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4 text-right" dir="rtl">
        <input
          name="email"
          type="email"
          placeholder="البريد الإلكتروني"
          className={`w-full p-3 border rounded ${
            formik.touched.email && formik.errors.email ? "border-red-500" : "border-blue-800"
          }`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        {/* Password with toggle */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور"
            className={`w-full p-3 border rounded pr-10 ${
              formik.touched.password && formik.errors.password ? "border-red-500" : "border-blue-800"
            }`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-3 text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}

        <div className="text-left">
          <button
            type="button"
            className="text-blue-800 hover:underline text-sm"
            onClick={() => setShowForgot(true)}
          >
            نسيت كلمة المرور؟
          </button>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-800 text-white rounded hover:bg-blue-900 transition"
          disabled={loading}
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        ليس لديك حساب؟{" "}
        <Link to="/register" className="text-blue-800 hover:underline">
          إنشاء حساب
        </Link>
      </p>

      <ForgotPasswordModal isOpen={showForgot} onClose={() => setShowForgot(false)} />
    </div>
  );
};

export default Login;
