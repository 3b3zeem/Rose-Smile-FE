import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useRegister from "../../hooks/Auth/useRegister";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const validationSchema = Yup.object({
  firstName: Yup.string().trim().min(3, "يجب أن لا يقل الاسم عن 3 أحرف").max(33).required("الاسم الأول مطلوب"),
  lastName: Yup.string().trim().min(3).max(33).required("الاسم الأخير مطلوب"),
  email: Yup.string()
    .email("بريد إلكتروني غير صالح")
    .matches(/^[\w-.]+@([\w-]+\.)+(com|net|org|pro|eg|sa)$/i, "البريد الإلكتروني يجب أن ينتهي بـ .com أو .net أو .org أو .pro أو .eg أو .sa")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "كلمة المرور يجب أن تحتوي على أحرف وأرقام و 8 أحرف على الأقل")
    .min(8)
    .max(44)
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
  phone: Yup.string(),
});

const Register = () => {
  const { register, loading, error } = useRegister();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = { ...values };
    
      // If phone is just whitespace or empty, remove it
      if (!payload.phone?.trim()) {
        delete payload.phone;
      }
      // Add +2 if present
      else if (!payload.phone.startsWith("+2")) {
        payload.phone = `+2${payload.phone}`;
      }
      const res = await register(payload);
      if (res?.success) {
        toast.success("تم التسجيل بنجاح، تحقق من بريدك الإلكتروني");
        setTimeout(() => navigate("/login"), 2000);
      }
    }
    
  });

  return (
    <div className="min-h-screen max-w-md mx-auto px-4 py-12 text-center">
      <ToastContainer position="bottom-left" rtl theme="colored" />
      <h2 className="text-3xl font-bold text-blue-800 mb-6">إنشاء حساب جديد</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-right" dir="rtl">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4 text-right" dir="rtl">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              name="firstName"
              type="text"
              placeholder="الاسم الأول"
              className={`p-3 border rounded w-full ${
                formik.touched.firstName && formik.errors.firstName ? "border-red-500" : "border-blue-800"
              }`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
            )}
          </div>
          <div>
            <input
              name="lastName"
              type="text"
              placeholder="الاسم الأخير"
              className={`p-3 border rounded w-full ${
                formik.touched.lastName && formik.errors.lastName ? "border-red-500" : "border-blue-800"
              }`}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            )}
          </div>
        </div>

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

        {/* Password Field */}
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

        {/* Confirm Password Field */}
        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="تأكيد كلمة المرور"
            className={`w-full p-3 border rounded pr-10 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : "border-blue-800"
            }`}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute left-3 top-3 text-gray-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        )}

        {/* Phone */}
        <input
          name="phone"
          type="text"
          placeholder="رقم الهاتف (اختياري)"
          className={`w-full p-3 border rounded  ${
            formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-blue-800"
          }`}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm">{formik.errors.phone}</div>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-blue-800 text-white rounded hover:bg-blue-900 transition"
          disabled={loading}
        >
          {loading ? "جاري التسجيل..." : "تسجيل"}
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        لديك حساب بالفعل؟{" "}
        <Link to="/login" className="text-blue-800 hover:underline">
          تسجيل الدخول
       </Link>
      </p>
    </div>
  );
};

export default Register;
