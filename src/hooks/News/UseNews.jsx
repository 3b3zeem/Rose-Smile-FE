import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const BASE_URL = `${import.meta.env.VITE_BACK_END}/api/v1/news`;

const fetchNews = async ({ page, size, search, sort }) => {
  try {
    const searchParam = search ? `&search=${search}` : "";
    const response = await axios.get(
      `${BASE_URL}?page=${page}&size=${size}${searchParam}&sort=${sort}&select=title,subTitle,image,createdAt`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
    );
  }
};

export default function UseNews() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 8;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "createdAt:desc";

  const {
    data,
    isLoading: loading,
    isFetching,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["news", { page, search, sort }],
    queryFn: () => fetchNews({ page, size, search, sort }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search, sort });
  };

  return {
    news: data?.data || [],
    total: data?.totalNews || 0,
    page,
    size,
    totalPages: Math.ceil((data?.totalNews || 0) / size),
    loading,
    isFetching,
    error: isError ? queryError?.message || "حدث خطأ أثناء جلب البيانات" : null,
    handlePageChange,
  };
}

export function NewById(id) {
  const {
    data,
    isLoading: loading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
        );
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    New: data?.data || [],
    loading,
    error: isError ? queryError?.message || "حدث خطأ أثناء جلب البيانات" : null,
  };
}
