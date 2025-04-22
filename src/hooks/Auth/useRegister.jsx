import { useState } from "react";
import axios from "axios";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post("http://localhost:5000/api/v1/auth/register", formData);
      return res.data;
    } catch (err) {
      const backendErrors = err?.response?.data?.errors;
      console.error("🛑 Full backend validation:", backendErrors || err?.response?.data);
      setError(err?.response?.data?.message || "حدث خطأ أثناء التسجيل");
      return null;
    } finally {
      setLoading(false);
    }
  };
  

  return { register, loading, error };
};

export default useRegister;
