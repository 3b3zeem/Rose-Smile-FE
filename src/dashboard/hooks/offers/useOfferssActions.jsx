import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const BaseURL = `${import.meta.env.VITE_BACK_END}/api/v1/offer`;

const fetchOffers = async ({ page, size, search }) => {
  const response = await axios.get(
    `${BaseURL}?page=${page}&size=${size}&search=${search}`,
    { withCredentials: true }
  );
  return response.data;
};

const useOffersActions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 8;
  const search = searchParams.get("search") || "";

  // 📦 Get Offers (with cache)
  const {
    data,
    isLoading: loading,
    isFetching,
  } = useQuery({
    queryKey: ["offers", page, search],
    queryFn: () => fetchOffers({ page, size, search }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // ➕ Add Offer
  const addMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(BaseURL, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("حدث خطأ أثناء إضافة العرض");
      }
    },
  });

  // ✏️ Update Offer
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("حدث خطأ أثناء تحديث العرض");
      }
    },
  });

  // 🖼️ Update Image
  const imageMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await axios.put(`${BaseURL}/image/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("حدث خطأ أثناء تحديث صورة العرض");
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
      queryClient.invalidateQueries(["offers"]);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("حدث خطأ أثناء حذف العرض");
      }
    },
  });

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return {
    offers: data?.offers || [],
    total: data?.totalOffers || 0,
    page,
    size,
    totalPages: Math.ceil((data?.totalOffers || 0) / size),
    loading,
    isFetching,
    handlePageChange,

    // mutations
    addOffer: addMutation.mutateAsync,
    addLoading: addMutation.isPending,

    updateOffer: updateMutation.mutateAsync,
    editLoading: updateMutation.isPending,

    updateOfferImage: imageMutation.mutateAsync,
    imageUploadLoading: imageMutation.isPending,

    deleteOffer: deleteMutation.mutateAsync,
    deleteLoading: deleteMutation.isPending,
  };
};

export default useOffersActions;
