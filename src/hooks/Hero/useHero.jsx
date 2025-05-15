import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END}/api/v1/hero`;

const fetchHeroes = async () => {
  try {
    const response = await axios.get(BASE_URL);
    if (response.data?.success) {
      return response.data.heroes;
    } else {
      throw new Error("فشل في جلب البيانات");
    }
  } catch (err) {
    throw new Error(err.response?.data?.message || "حدث خطأ أثناء جلب البيانات");
  }
};

const useHero = () => {
  const {
    data: heroes = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["heroes"],
    queryFn: fetchHeroes,
    staleTime: 1000 * 60 * 5,
  });

  return {
    heroes,
    loading,
    error: isError ? error.message : null,
  };
};

export default useHero;
