import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useResetPassword from "../../hooks/Auth/useResetPassword";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const validationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
      "كلمة المرور يجب أن تحتوي على أحرف وأرقام و8 أحرف على الأقل"
    )
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .max(44, "كلمة المرور يجب ألا تتجاوز 44 حرفًا")
    .required("كلمة المرور مطلوبة"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, loading, error } = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await resetPassword(token, {
        newPassword: values.password, 
        confirmPassword: values.confirmPassword,
      });
      if (res?.message) {
        toast.success(" تم تعيين كلمة المرور بنجاح");
        setTimeout(() => navigate("/login"), 2000);
      }
    }    
  });

  useEffect(() => {
    if (error?.toLowerCase().includes("token")) {
      toast.error("الرابط غير صالح أو منتهي الصلاحية");
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [error, navigate]);

  return (
    <div className="min-h-screen max-w-md mx-auto px-4 py-12 text-right" dir="rtl">
      <ToastContainer position="bottom-left" rtl theme="colored" />
      <h2 className="text-3xl font-bold text-blue-800 mb-6">إعادة تعيين كلمة المرور</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Password field */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور الجديدة"
            className={`w-full p-3 border rounded pr-10 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-blue-800"
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
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}

        {/* Confirm Password field */}
        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="تأكيد كلمة المرور"
            className={`w-full p-3 border rounded pr-10 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-500"
                : "border-blue-800"
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
          <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-800 text-white rounded hover:bg-blue-900 transition"
        >
          {loading ? "جارٍ التحديث..." : "تعيين كلمة المرور"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
