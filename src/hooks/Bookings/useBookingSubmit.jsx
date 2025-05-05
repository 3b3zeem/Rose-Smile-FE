import { useState } from "react";

const useBookingSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [defaultSheet, setDefaultSheet] = useState(null);

  const BASE_URL = "http://localhost:5000/api/v1/form/";

  const submitBooking = async (formData) => {
    try {
      setLoading(true);
      setError(null);
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
        setError(data.message || "فشل في إرسال الحجز");
      }
    } catch (err) {
      setError("حدث خطأ أثناء إرسال الحجز");
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultSheet = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`http://localhost:5000/api/v1/sheet/default`);
      const data = await res.json();
      const sheetId = data.sheet;

      if (data.success) {
        setDefaultSheet(sheetId);
        return data.data;
      } else {
        setError(data.message || "فشل في تحميل بيانات الورقة الافتراضية");
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات الورقة");
    } finally {
      setLoading(false);
    }
  };

  return { submitBooking, fetchDefaultSheet, defaultSheet, loading, error, success };
};

export default useBookingSubmit;