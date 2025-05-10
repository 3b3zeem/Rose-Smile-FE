import { useState } from "react";
import axios from "axios";

const useSendResetLink = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendResetLink = async (email) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await axios.post(
        `${import.meta.env.VITE_BACK_END}/api/v1/auth/sendCode`,
        { email }
      );

      if (res?.data?.message) {
        setSuccess(true);
        return { success: true };
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "فشل في إرسال الرابط";
      setError(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { sendResetLink, loading, error, success, resetState };
};

export default useSendResetLink;
