import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useRegister from "../../hooks/Auth/useRegister";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, "يجب أن لا يقل الاسم عن 3 أحرف")
    .max(33)
    .required("الاسم الأول مطلوب"),
  lastName: Yup.string().trim().min(3).max(33).required("الاسم الأخير مطلوب"),
  email: Yup.string()
    .email("بريد إلكتروني غير صالح")
    .matches(
      /^[\w-.]+@([\w-]+\.)+(com|net|org|pro|eg|sa)$/i,
      "البريد الإلكتروني يجب أن ينتهي بـ .com أو .net أو .org أو .pro أو .eg أو .sa"
    )
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
      "كلمة المرور يجب أن تحتوي على أحرف وأرقام و 8 أحرف على الأقل"
    )
    .min(8)
    .max(44)
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
  phone: Yup.string()
    .required("رقم الهاتف مطلوب")
    .matches(
      /^(\+?20|0020)?1[0125][0-9]{8}$|^(\+?966|00966)?5[0-9]{8}$|^(\+?971|00971)?5[0-9]{8}$/,
      "رقم الهاتف غير صالح. استخدم رقم مصري أو سعودي أو إماراتي"
    ),
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
      if (!payload.phone.startsWith("+")) {
        payload.phone = "+20" + payload.phone;
      }
      const res = await register(payload);
      if (res?.success) {
        toast.success("تم التسجيل بنجاح، تحقق من بريدك الإلكتروني");
        setTimeout(() => navigate("/login"), 2000);
      }
    },
  });

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9+]/g, "");
    if (value && !value.startsWith("+")) {
      if (value.startsWith("0")) value = value.replace("0", "+20");
      else if (value.startsWith("9")) value = "+966" + value.substring(1);
      else if (value.startsWith("5") || value.startsWith("7"))
        value = "+971" + value.substring(1);
      else value = "+20" + value;
    }
    formik.setFieldValue("phone", value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="bottom-left" rtl theme="colored" />
      <div className="w-full max-w-xl rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
          إنشاء حساب جديد
        </h2>

        {error && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm text-right"
            dir="rtl"
          >
            ⚠️ {error}
          </div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6 text-right"
          dir="rtl"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                الاسم الأول
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="الاسم الأول"
                className={`w-full p-4 border rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.firstName}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                الاسم الأخير
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="الاسم الأخير"
                className={`w-full p-4 border rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="البريد الإلكتروني"
              className={`w-full p-4 border rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رقم الهاتف
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="رقم الهاتف (مثال: 01234567890)"
              className={`w-full p-4 border rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-right ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.phone}
              onChange={handlePhoneChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                className={`w-full p-4 border rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600 transition"
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                }
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="تأكيد كلمة المرور"
                className={`w-full p-4 border rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600 transition"
                aria-label={
                  showConfirm
                    ? "إخفاء تأكيد كلمة المرور"
                    : "إظهار تأكيد كلمة المرور"
                }
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "جاري التسجيل..." : "تسجيل"}
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-center text-lg">
          لديك حساب بالفعل؟{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:underline font-semibold"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
