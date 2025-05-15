import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END}/api/v1/doctor`;

const fetchDoctors = async ({ page, size, search }) => {
  const params = new URLSearchParams({ page, size });
  if (search?.trim()) params.append("search", search);

  try {
    const res = await axios.get(`${BASE_URL}?${params.toString()}`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useDoctors = ({ page = 1, size = 8, search = "" }) => {
  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["doctors", { page, size, search }],
    queryFn: () => fetchDoctors({ page, size, search }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  return {
    doctors: data?.doctors || [],
    totalDoctors: data?.totalDoctors || 0,
    totalPages: data?.totalPages || 1,
    loading,
    error: isError ? error.message : null,
  };
};

export const useSomeDoctors = ({ page = 1, size = 5 }) => {
  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["some-doctors", { page, size }],
    queryFn: () => fetchDoctors({ page, size, search: "" }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  return {
    doctors: data?.doctors || [],
    loading,
    error: isError ? error.message : null,
  };
};
