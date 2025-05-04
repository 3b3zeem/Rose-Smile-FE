import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useDoctorsActions = () => {
  const [doctors, setDoctors] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const BaseURL = "http://localhost:5000/api/v1/doctor";

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 6;
  const search = searchParams.get("search") || "";


// Get All Doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseURL}?page=${page}&size=${size}&search=${search}`, {
        withCredentials: true,
      });
      setDoctors(response.data.doctors || []);
      setTotal(response.data.totalDoctors || 0);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };
  // Add Doctor
  const addDoctor = async (formData) => {
    setAddLoading(true);
    try {
      const response = await axios.post(BaseURL, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchDoctors();
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
  const updateDoctor = async (id, data) => {
    setEditLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/${id}`, data, {
        withCredentials: true,
      });
      await fetchDoctors();
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
  // Add Doctor Cases
  const addCaseToDoctor = async (doctorId, formData) => {
    try {
      const response = await axios.put(
        `${BaseURL}/cases/${doctorId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await fetchDoctors();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "فشل في إضافة الحالة",
      };
    }
  };
 //delete Doctor Case
  const deleteDoctorCase = async (doctorId, caseId) => {
    try {
      const response = await axios.delete(
        `${BaseURL}/cases/${doctorId}`,
        {
          data: { caseId },
          withCredentials: true,
        }
      );
      await fetchDoctors();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "فشل في حذف الحالة",
      };
    }
  };
  
  // Update Doctor Image
  const updateDoctorImage = async (id, formData) => {
    setImageUploadLoading(true);
    try {
      const response = await axios.put(`${BaseURL}/image/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchDoctors();
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
  const deleteDoctor = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true,
      });
      await fetchDoctors();
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
    fetchDoctors();
  }, [page, size, search]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return {
    doctors,
    total,
    page,
    size,
    totalPages: Math.ceil(total / size),
    loading,
    addLoading,
    editLoading,
    deleteLoading,
    imageUploadLoading,
    addDoctor,
    updateDoctor,
    updateDoctorImage,
    deleteDoctor,
    handlePageChange,
    addCaseToDoctor,       
    deleteDoctorCase 
  };
};

export default useDoctorsActions;
