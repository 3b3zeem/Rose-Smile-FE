import { useEffect, useState } from "react";
import axios from "axios";

const useDoctorDetails = (doctorId) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/doctor/${doctorId}`);
        setDoctor(res.data.doctor || null);
      } catch (err) {
        setError("فشل في تحميل تفاصيل الطبيب");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  return { doctor, loading, error };
};

export default useDoctorDetails;
