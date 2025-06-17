import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const BaseURL = `${import.meta.env.VITE_BACK_END}/api/v1/sheet`;

const fetchSheets = async ({ page, size, search }) => {
  const response = await axios.get(
    `${BaseURL}?page=${page}&size=${size}&search=${search}`,
    { withCredentials: true }
  );
  return response.data;
};

const useSheetsActions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 6;
  const search = searchParams.get("search") || "";

  // 📦 Get Sheets
  const {
    data,
    isLoading: loading,
    isFetching,
  } = useQuery({
    queryKey: ["sheets", page, size, search],
    queryFn: () => fetchSheets({ page, size, search }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  // ➕ Add Sheet
  const addMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(BaseURL, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sheets"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطأ أثناء إضافة الشيت");
    },
  });

  // ✏️ Update Sheet
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      console.log(id, data);

      const res = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sheets"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطأ أثناء تعديل الشيت");
    },
  });

  // 🖼️ Update Sheet Image
  const imageMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await axios.put(`${BaseURL}/image/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sheets"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "فشل تحديث صورة الشيت");
    },
  });

  // ❌ Delete Sheet
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sheets"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "فشل حذف الشيت");
    },
  });

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return {
    sheets: data?.sheets || [],
    total: data?.totalSheets || 0,
    page,
    size,
    totalPages: Math.ceil((data?.totalSheets || 0) / size),
    loading,
    isFetching,
    handlePageChange,

    // Mutations
    addSheet: addMutation.mutateAsync,
    addLoading: addMutation.isPending,

    updateSheet: updateMutation.mutateAsync,
    editLoading: updateMutation.isPending,

    updateSheetImage: imageMutation.mutateAsync,
    imageUploadLoading: imageMutation.isPending,

    deleteSheet: deleteMutation.mutateAsync,
    deleteLoading: deleteMutation.isPending,
  };
};

export default useSheetsActions;
