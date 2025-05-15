import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const BASE_URL = `${import.meta.env.VITE_BACK_END}/api/v1/service`;

export const useAllServices = () => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 6;
  const searchTerm = searchParams.get("search") || "";
  const sectionIds = searchParams.getAll("sectionIds") || [];
  const sort = searchParams.get("sort") || "createdAt:desc";

  const queryKey = ["services", page, size, searchTerm, sectionIds.join(","), sort];

  const queryFn = async () => {
    const sectionIdsQuery = sectionIds.length
      ? sectionIds.map((id) => `sectionIds=${id}`).join("&")
      : "";

    const query = `page=${page}&size=${size}&search=${searchTerm}${
      sectionIdsQuery ? `&${sectionIdsQuery}` : ""
    }&sort=${sort}`;

    const res = await axios.get(`${BASE_URL}?${query}`);
    return {
      data: res.data.services || [],
      pagination: {
        currentPage: page,
        totalPages: res.data.totalPages || 1,
        totalItems: res.data.totalServices || 0,
      },
    };
  };

  const { data, isLoading, isError } = useQuery({ queryKey, queryFn });

  return {
    data: data?.data || [],
    pagination: data?.pagination || null,
    loading: isLoading,
    error: isError ? "فشل في تحميل بيانات الخدمات" : null,
  };
};

export const useSomeServices = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["someServices"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}?page=1&size=5`);
      return res.data.services || [];
    },
  });

  return {
    data: data || [],
    loading: isLoading,
    error: isError ? "فشل في تحميل بيانات الخدمات" : null,
  };
};

export const useServiceDetails = (reference) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviceDetails", reference],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/${reference}`);
      return res.data.service;
    },
    enabled: !!reference, 
  });

  return {
    data,
    loading: isLoading,
    error: isError ? "فشل في تحميل بيانات الخدمة" : null,
  };
};

export const useServiceTitles = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["serviceTitles"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}?select=title,_id`);
      const json = await res.json();
      if (json.success) {
        return json.services.map((service) => ({
          id: service._id,
          title: service.title,
        }));
      } else {
        throw new Error("Failed to fetch");
      }
    },
  });

  return {
    services: data || [],
    loading: isLoading,
    error: isError ? "فشل في تحميل العناوين" : null,
  };
};
