import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSheet = (name) => {
  return useQuery({
    queryKey: ["sheet", name],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END}/api/v1/sheet/${name}`
      );
      return res.data.sheet;
    },
    enabled: !!name,
  });
};

const API_BASE_URL = `${import.meta.env.VITE_BACK_END}/api/v1`;

export const fetchServicesBySection = async (sectionId) => {
  if (!sectionId) return [];
  try {
    const response = await axios.get(
      `${API_BASE_URL}/service/?page=1&size=20&select=title&sectionIds=${sectionId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const services = Array.isArray(response.data?.services)
      ? response.data.services
      : [];
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const postForm = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/form`,
      {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        section: formData.section,
        service: formData.service,
        spreadsheetId: formData.spreadsheetId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(response.data.message, {
      position: "top-right",
      style: {
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
        textAlign: "right",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting form:", error);
    throw error;
  }
};
