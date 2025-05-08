import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function useNews() {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const BASE_URL = "http://localhost:5000/api/v1/news/";

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}?page=${page}&search=${search}`);
      console.log(res);
      setNews(res.data.data || []);
    } catch (error) {
      console.error(error);
      setError("فشل في تحميل بيانات الأخبار");
    } finally {
      setLoading(false);
    }
  };

  const createNew = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      await fetchNews();
      return { success: true, message: res.data.message };
    } catch (error) {
      setError("فشل في إضافة الأخبار");
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء التحديث",
      };
    } finally {
      setLoading(false);
    }
  };

  const updateNew = async (id, formData) => {
    setLoading(true);
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, formData);
      console.log(res);
      await fetchNews();
      return { success: true, message: res.data.message };
    } catch (error) {
      console.error(error);
      setError("فشل في تحديث الأخبار");
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء التحديث",
      };
    } finally {
      setLoading(false);
    }
  };

  const updateImage = async (id, formData) => {
    setLoading(true);
    try {
      const res = await axios.put(`${BASE_URL}/image/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      await fetchNews();
      return { success: true, message: res.data.message };
    } catch (error) {
      console.error(error);
      setError("فشل في تحديث صورة الأخبار");
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء التحديث",
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteNew = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      console.log(res);
      await fetchNews();
      return { success: true, message: res.data.message };
    } catch (error) {
      console.error(error);
      setError("فشل في حذف الأخبار");
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء الحذف",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    error,
    page,
    fetchNews,
    createNew,
    updateNew,
    updateImage,
    deleteNew,
  };
}
