import { useEffect, useState } from "react";
import axios from "axios";

const useDoctors = ({ page = 1, size = 8, search = "" }) => {
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ page, size });
        if (search.trim()) params.append("search", search);

        const res = await axios.get(
          `${import.meta.env.VITE_BACK_END}/api/v1/doctor?${params.toString()}`
        );
        setDoctors(res.data.doctors || []);
        setTotalDoctors(res.data.totalDoctors || 0);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        setError("فشل في تحميل بيانات الأطباء");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page, size, search]);

  return { doctors, totalDoctors, totalPages, loading, error };
};

export const useSomeDoctors = ({ page = 1, size = 5 }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ page, size });

        const res = await axios.get(
          `${import.meta.env.VITE_BACK_END}/api/v1/doctor?${params.toString()}`
        );
        setDoctors(res.data.doctors || []);
      } catch (err) {
        setError("فشل في تحميل بيانات الأطباء");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page, size]);

  return { doctors, loading, error };
};

export default useDoctors;
