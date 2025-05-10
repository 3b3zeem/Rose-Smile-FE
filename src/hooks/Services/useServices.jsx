import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const BASE_URL = `${import.meta.env.VITE_BACK_END}/api/v1/service`;

export const useAllServices = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 6;
  const searchTerm = searchParams.get("search") || "";
  const sectionIds = searchParams.getAll("sectionIds") || "";
  const sort = searchParams.get("sort") || "createdAt:desc";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sectionIdsQuery =
          sectionIds.length > 0
            ? sectionIds.map((id) => `sectionIds=${id}`).join("&")
            : "";
        const query = `page=${page}&size=${size}&search=${searchTerm}${
          sectionIdsQuery ? `&${sectionIdsQuery}` : ""
        }&sort=${sort}`;
        const res = await axios.get(`${BASE_URL}?${query}`);
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
  }, [page, size, searchTerm, sectionIds.join(","), sort]);

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

export const useServiceTitles = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = `${import.meta.env.VITE_BACK_END}/api/v1/service/`;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}?select=title,_id`);
        const data = await response.json();
        if (data.success) {
          const serviceData = data.services.map((service) => ({
            id: service._id,
            title: service.title,
          }));
          setServices(serviceData);
        } else {
          setError("Failed to fetch service titles");
        }
      } catch (err) {
        setError("An error occurred while fetching service titles");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};
