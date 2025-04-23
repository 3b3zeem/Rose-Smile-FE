// src/hooks/Auth/useLogin.js
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/Auth/AuthContext"; 

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { check } = useAuthContext();                           // ← grab check()

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        credentials,
        { withCredentials: true }
      );

      //  whenever login succeeds, re‑fetch `/me`
      if (res.data.success) {
        await check();
        localStorage.setItem("user", JSON.stringify(res.data.user));
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
