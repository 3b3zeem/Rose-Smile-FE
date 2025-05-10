import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const BaseURL = `${import.meta.env.VITE_BACK_END}/api/v1/hero`;

const fetchHeros = async ({ page, size, search }) => {
  const response = await axios.get(
    `${BaseURL}?page=${page}&size=${size}&search=${search}`,
    { withCredentials: true }
  );
  console.log(response?.data);
  return response.data;
};

const useHeroActions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = searchParams.get("size") || 8;
  const search = searchParams.get("search") || "";

  // 📦 Get Offers (with cache)
  const {
    data,
    isLoading: loading,
    isFetching,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["heroes", page, search],
    queryFn: () => fetchHeros({ page, size, search }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // ➕ Add Hero
  const addMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(BaseURL, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hero"]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("حدث خطأ أثناء إضافة الصورة الرئيسية");
      }
    },
  });

  // ✏️ Update Hero
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hero"]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("حدث خطأ أثناء تحديث الصورة الرئيسية");
      }
    },
  });

  // 🖼️ Update Image
  const imageMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await axios.put(`${BaseURL}/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hero"]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("حدث خطأ أثناء تحديث صورة الصورة الرئيسية");
      }
    },
  });

  // ❌ Delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hero"]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("حدث خطأ أثناء حذف الصورة الرئيسية");
      }
    },
  });

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return {
    heroes: data?.heroes || [],
    total: data?.totalHeroes || 0,
    page,
    totalPages: Math.ceil((data?.totalHeroes || 0) / size),
    loading,
    isFetching,
    handlePageChange,
    error: isError ? queryError?.message || "حدث خطأ أثناء جلب البيانات" : null,
    // mutations
    addHero: addMutation.mutateAsync,
    addLoading: addMutation.isPending,

    updateHero: updateMutation.mutateAsync,
    editLoading: updateMutation.isPending,

    updateHeroImage: imageMutation.mutateAsync,
    imageUploadLoading: imageMutation.isPending,

    deleteHero: deleteMutation.mutateAsync,
    deleteLoading: deleteMutation.isPending,
  };
};

export default useHeroActions;
