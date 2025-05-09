import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useCustomerDataActions = () => {
  const [customerData, setCustomerData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const BaseURL = 'http://localhost:5000/api/v1/form';

  const page = parseInt(searchParams.get('page')) || 1;
  const size = 6;
  const search = searchParams.get('search') || '';

  // Get All Customer Data
  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseURL}?page=${page}&size=${size}&search=${search}`,
        {
          withCredentials: true,
        }
      );
      setCustomerData(response.data.forms || []);
      setTotal(response.data.totalForms || 0);
    } catch (error) {
      console.error('Failed to fetch forms:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add Comment
  const addComment = async (id, data) => {
    setEditLoading(true);
    try {
      const response = await axios.patch(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      await fetchCustomerData();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'خطأ أثناء الإضافة',
      };
    } finally {
      setEditLoading(false);
    }
  };

  // Update Customer Data
  const updateCustomerData = async (id, data) => {
    setEditLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      await fetchCustomerData();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'خطأ أثناء التعديل',
      };
    } finally {
      setEditLoading(false);
    }
  };

  // Delete Customer Data
  const deleteCustomerData = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      await fetchCustomerData();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'فشل في الحذف',
      };
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [page, size, search]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return {
    customerData,
    total,
    page,
    size,
    totalPages: Math.ceil(total / size),
    loading,
    editLoading,
    deleteLoading,
    addComment,
    updateCustomerData,
    deleteCustomerData,
    handlePageChange,
  };
};

export default useCustomerDataActions;
