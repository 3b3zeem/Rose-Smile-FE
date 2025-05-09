import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSheetsActions = () => {
  const [sheets, setSheets] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const BaseURL = 'http://localhost:5000/api/v1/sheet';

  const page = parseInt(searchParams.get('page')) || 1;
  const size = 6;
  const search = searchParams.get('search') || '';

  // Get All Sheets
  const fetchSheets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseURL}?page=${page}&size=${size}&search=${search}`,
        {
          withCredentials: true,
        }
      );
      setSheets(response.data.sheets || []);
      setTotal(response.data.totalSheets || 0);
    } catch (error) {
      console.error('Failed to fetch sheets:', error);
    } finally {
      setLoading(false);
    }
  };
  // Add Sheet
  const addSheet = async (formData) => {
    setAddLoading(true);
    try {
      const response = await axios.post(BaseURL, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchSheets();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'خطأ أثناء الإضافة',
      };
    } finally {
      setAddLoading(false);
    }
  };
  // Update Sheet
  const updateSheet = async (id, data) => {
    setEditLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      await fetchSheets();
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

  // Update Sheet Image
  const updateSheetImage = async (id, formData) => {
    setImageUploadLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/image/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchSheets();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'فشل تحديث الصورة',
      };
    } finally {
      setImageUploadLoading(false);
    }
  };
  // Delete Sheet
  const deleteSheet = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      await fetchSheets();
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
    fetchSheets();
  }, [page, size, search]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return {
    sheets,
    total,
    page,
    size,
    totalPages: Math.ceil(total / size),
    loading,
    addLoading,
    editLoading,
    deleteLoading,
    imageUploadLoading,
    addSheet,
    updateSheet,
    updateSheetImage,
    deleteSheet,
    handlePageChange,
  };
};

export default useSheetsActions;
