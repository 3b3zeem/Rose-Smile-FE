import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useBookingSubmit = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [success, setSuccess] = useState(null);

  const BASE_URL = `${import.meta.env.VITE_BACK_END}/api/v1/form/`;

  const submitBooking = async (formData) => {
    try {
      setLoadingSubmit(true);
      setErrorSubmit(null);
      setSuccess(null);

      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("تم إرسال الحجز بنجاح!");
        return data;
      } else {
        setErrorSubmit(data.message || "فشل في إرسال الحجز");
      }
    } catch (err) {
      setErrorSubmit(err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const {
    data: defaultSheet,
    error: errorFetch,
    isLoading: loadingFetch,
  } = useQuery({
    queryKey: ["defaultSheet"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_END}/api/v1/sheet/default`
      );
      const data = await res.json();
      if (!data.success) {
        throw new Error(
          data.message || "فشل في تحميل بيانات الورقة الافتراضية"
        );
      }
      return data.sheet;
    },
    refetchOnWindowFocus: false,
  });

  return {
    submitBooking,
    loadingSubmit,
    errorSubmit,
    success,
    defaultSheet,
    loadingFetch,
    errorFetch,
  };
};

export default useBookingSubmit;
