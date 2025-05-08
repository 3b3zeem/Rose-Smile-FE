import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 6;
  const search = searchParams.get("search") || "";

  const BaseURL = "http://localhost:5000/api/v1/section";

  const fetchsection = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseURL}?page=${page}&size=${size}&search=${search}`,
        {
          withCredentials: true,
        }
      );
      setSections(response.data.sections || []);
      setTotal(response.data.totalsections || 0);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSection = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BaseURL}/add`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchsection();
      return { success: true, message: response.data.section };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء الإضافة",
      };
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BaseURL}/update?sectionId=${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      await fetchsection();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء التحديث",
      };
    } finally {
      setLoading(false);
    }
  };
  const updatesectionImage = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BaseURL}/update?sectionId=${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      await fetchsection();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء التحديث",
      };
    } finally {
      setLoading(false);
    }
  };



  const deleteSection = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BaseURL}/${id}`, {
        withCredentials: true, // Include credentials in the request
      });
      await fetchsection();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "خطأ أثناء الحذف",
      };
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchsection();
  }, [page, size, search]);


    return {
        sections,
        loading,
        total,
        fetchsection,
        addSection,
        updateSection,
        updatesectionImage,
        deleteSection,
        setSearchParams,
    };
}
