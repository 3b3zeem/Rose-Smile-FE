import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useAdminServices = () => {
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const BaseURL = "http://localhost:5000/api/v1/service";

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 6;
  const searchTerm = searchParams.get("search") || "";

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseURL}/?page=${page}&size=${size}&search=${searchTerm}`
      );
      const normalizedServices = (response.data.services || []).map(
        (service) => ({
          ...service,
          description: Array.isArray(service.description)
            ? service.description
            : [],
          features: Array.isArray(service.features) ? service.features : [],
        })
      );
      console.log("data", normalizedServices);
      
      setServices(normalizedServices);
      setTotal(response.data.totalServices || 0);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (formData) => {
    setAddLoading(true);
    try {
      const response = await axios.post(`${BaseURL}/`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchServices();
      return {
        success: true,
        message: response.data.message || "Service added successfully",
      };
    } catch (error) {
      console.error("Error adding service:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong while adding service",
      };
    } finally {
      setAddLoading(false);
    }
  };

  const updateService = async (id, data) => {
    setEditLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      await fetchServices();
      return {
        success: true,
        message: response.data.message || "Service updated successfully",
      };
    } catch (error) {
      console.error("Error updating service:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong while updating service",
      };
    } finally {
      setEditLoading(false);
    }
  };

  const updateServiceImage = async (id, formData) => {
    setImageUploadLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/${id}`, formData, {
        withCredentials: true,
      });
      await fetchServices();
      return {
        success: true,
        message: response.data.message || "Image updated successfully",
      };
    } catch (error) {
      console.error("Error updating service image:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong while updating image",
      };
    } finally {
      setImageUploadLoading(false);
    }
  };

  const deleteService = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      await fetchServices();
      return {
        success: true,
        message: response.data.message || "Service deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting service:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong while deleting service",
      };
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, size, searchTerm]);

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage.toString(),
      size: size.toString(),
      search: searchTerm,
    });
  };

  return {
    services,
    total,
    loading,
    addLoading,
    editLoading,
    deleteLoading,
    imageUploadLoading,
    page,
    size,
    totalPages: Math.ceil(total / size),
    handlePageChange,
    addService,
    updateService,
    deleteService,
    updateServiceImage,
  };
};

export default useAdminServices;
