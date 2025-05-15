import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useAllSections = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "createdAt:desc";

  const BASE_URL = `${
    import.meta.env.VITE_BACK_END
  }/api/v1/section?search=${searchTerm}&sort=${sort}`;

  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sections", searchTerm, sort],
    queryFn: async () => {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      if (!data.success) {
        throw new Error("Failed to fetch sections");
      }
      return data.sections;
    },
  });

  return {
    sections: data || [],
    loading,
    error: isError ? error.message : null,
  };
};

const useSectionData = (reference) => {
  const BASE_URL = `${
    import.meta.env.VITE_BACK_END
  }/api/v1/section/${reference}`;

  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["section", reference],
    queryFn: async () => {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      if (!data.success) {
        throw new Error("Failed to fetch section data");
      }
      return data.section;
    },
    enabled: !!reference,
  });

  return {
    sectionData: data || null,
    loading,
    error: isError ? error.message : null,
  };
};

const useSectionTitles = () => {
  const BASE_URL = `${
    import.meta.env.VITE_BACK_END
  }/api/v1/section?select=title,_id`;

  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sectionTitles"],
    queryFn: async () => {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      if (!data.success) {
        throw new Error("Failed to fetch section titles");
      }
      return data.sections.map((section) => ({
        id: section._id,
        title: section.title,
      }));
    },
  });

  return {
    sections: data || [],
    loading,
    error: isError ? error.message : null,
  };
};

export { useSectionTitles };
export default useSectionData;
