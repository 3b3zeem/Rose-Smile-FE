import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/news";

const fetchNews = async ({ page, search, sort }) => {
  try {
    // Only include search parameter if it's not empty
    const searchParam = search ? `&search=${search}` : "";
    const response = await axios.get(
      `${BASE_URL}?page=${page}${searchParam}&sort=${sort}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "حدث خطأ أثناء جلب البيانات"
    );
  }
};

export default function UseNews(
  page = 1,
  search = "",
  sort = "createdAt:desc"
) {
  const {
    data,
    isLoading: loading,
    isFetching,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["news", { page, search, sort }],
    queryFn: () => fetchNews({ page, search, sort }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: data?.data || [],
    total: data?.totalNews || 0,
    page,
    totalPages: Math.ceil((data?.totalNews || 0) / 8),
    loading,
    isFetching,
    error: isError ? queryError?.message || "حدث خطأ أثناء جلب البيانات" : null,
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
