import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useAdminServices = () => {
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
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
      const normalizedServices = (response.data.services || []).map(service => ({
        ...service,
        description: Array.isArray(service.description) ? service.description : [],
        features: Array.isArray(service.features) ? service.features : [],
      }));
      setServices(normalizedServices);
      setTotal(response.data.totalServices || 0);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (formData) => {
    try {
      await axios.post(`${BaseURL}/`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchServices();
      return true;
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  };

  const updateService = async (id, data) => {
    try {
      await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      await fetchServices();
      return true;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  };

  const updateServiceImage = async (id, formData) => {
    try {
      await axios.put(`${BaseURL}/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchServices();
      return true;
    } catch (error) {
      console.error('Error updating service image:', error);
      throw error;
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      await fetchServices();
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, size, searchTerm]);

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage.toString(),
      size: size.toString(),
      searchTerm,
    });
  };

  return {
    services,
    total,
    loading,
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
