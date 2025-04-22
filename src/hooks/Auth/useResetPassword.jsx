import { useState } from "react";
import axios from "axios";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetPassword = async (token, data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`http://localhost:5000/api/v1/auth/reset/${token}`, data);
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "حدث خطأ أثناء العملية");
      return null;
    } finally {
      setLoading(false);
    }
  };
  

  return { resetPassword, loading, error };
};

export default useResetPassword;
