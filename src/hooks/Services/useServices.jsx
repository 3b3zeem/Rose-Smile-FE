import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000/api/v1/service";

export const useAllServices = (page = 1, size = 6) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching services: page=${page}, size=${size}`);
        const res = await axios.get(`${BASE_URL}?page=${page}&size=${size}`);
        console.log("API Response:", res.data);
        setData(res.data.services || []);
        setPagination({
          currentPage: page,
          totalPages: res.data.totalPages || 1,
          totalItems: res.data.totalServices || 0,
        });
      } catch (err) {
        setError("فشل في تحميل بيانات الخدمات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size]);

  return { data, loading, error, pagination };
};

export function useSomeServices() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}?page=1&size=5`);
        setData(res.data.services || []);
      } catch (err) {
        setError("فشل في تحميل بيانات الخدمات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default function useServiceDetails(reference) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${reference}`);
        setData(res.data.service);
      } catch (err) {
        setError("فشل في تحميل بيانات الخدمة");
      } finally {
        setLoading(false);
      }
    };

    if (reference) fetchData();
  }, [reference]);

  return { data, loading, error };
}
