// src/hooks/Auth/useLogin.js
import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_END}/api/v1/auth/login`,
        credentials,
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isLogin", "true");
      }

      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "فشل في تسجيل الدخول");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
