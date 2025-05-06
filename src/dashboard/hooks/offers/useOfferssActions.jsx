import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useOffersActions = () => {
  const [offers, setOffers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const BaseURL = "http://localhost:5000/api/v1/offer";

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 8;
  const search = searchParams.get("search") || "";

  // Get All Doctors
  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseURL}?page=${page}&size=${size}&search=${search}`,
        {
          withCredentials: true,
        }
      );
      setOffers(response.data.offers || []);
      setTotal(response.data.totalOffers || 0);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setLoading(false);
    }
  };
  // Add Doctor
  const addOffer = async (formData) => {
    setAddLoading(true);
    try {
      const response = await axios.post(BaseURL, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchOffers();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء الإضافة",
      };
    } finally {
      setAddLoading(false);
    }
  };
  // Update Doctor
  const updateOffer = async (id, data) => {
    setEditLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      await fetchOffers();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء التعديل",
      };
    } finally {
      setEditLoading(false);
    }
  };
  // Update Doctor Image
  const updateOfferImage = async (id, formData) => {
    setImageUploadLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/image/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchOffers();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "فشل تحديث الصورة",
      };
    } finally {
      setImageUploadLoading(false);
    }
  };
  // Delete Doctor
  const deleteOffer = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      await fetchOffers();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "فشل في الحذف",
      };
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [page, size, search]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return {
    offers,
    total,
    page,
    size,
    totalPages: Math.ceil(total / size),
    loading,
    addLoading,
    editLoading,
    deleteLoading,
    imageUploadLoading,
    addOffer,
    updateOffer,
    updateOfferImage,
    deleteOffer,
    handlePageChange,
  };
};

export default useOffersActions;
