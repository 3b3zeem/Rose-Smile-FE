import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const BaseURL = `${import.meta.env.VITE_BACK_END}/api/v1/form`;

const fetchCustomerData = async ({ page, size, search }) => {
  const response = await axios.get(
    `${BaseURL}?page=${page}&size=${size}&search=${search}`,
    { withCredentials: true }
  );
  return response.data;
};

const useCustomerDataActions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 6;
  const search = searchParams.get("search") || "";

  // 📦 Fetch data
  const {
    data,
    isLoading: loading,
    isFetching,
  } = useQuery({
    queryKey: ["customers", page, search],
    queryFn: () => fetchCustomerData({ page, size, search }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  // ➕ Add Comment
  const addCommentMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.patch(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطأ أثناء الإضافة");
    },
  });

  // ✏️ Update Customer
  const updateCustomerMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطأ أثناء التعديل");
    },
  });

  // ❌ Delete Customer
  const deleteCustomerMutation = useMutation({
    mutationFn: async ({ id }) => {
      const res = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "فشل في الحذف");
    },
  });

  // 📄 Pagination
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return {
    customerData: data?.forms || [],
    total: data?.totalForms || 0,
    page,
    size,
    totalPages: Math.ceil((data?.totalForms || 0) / size),
    loading,
    isFetching,
    handlePageChange,

    // Mutations
    addComment: addCommentMutation.mutateAsync,
    addLoading: addCommentMutation.isPending,

    updateCustomerData: updateCustomerMutation.mutateAsync,
    editLoading: updateCustomerMutation.isPending,

    deleteCustomerData: deleteCustomerMutation.mutateAsync,
    deleteLoading: deleteCustomerMutation.isPending,
  };
};

export default useCustomerDataActions;
