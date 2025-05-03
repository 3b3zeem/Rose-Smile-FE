import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useAllSections = () => {
  const [searchParams] = useSearchParams();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchTerm = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "createdAt:desc";

  const BASE_URL = useMemo(() => {
    return `http://localhost:5000/api/v1/section?search=${searchTerm}&sort=${sort}`;
  }, [searchTerm, sort]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data.success) {
          setSections(data.sections);
        } else {
          setError("Failed to fetch sections");
        }
      } catch (err) {
        setError("An error occurred while fetching sections");
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [BASE_URL]);

  return { sections, loading, error };
};

const useSectionData = (reference) => {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000/api/v1/section/";

  const url = reference ? `${BASE_URL}${reference}` : BASE_URL;

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setSectionData(data.section);
        } else {
          setError("Failed to fetch section data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [reference]);

  return { sectionData, loading, error };
};

const useSectionTitles = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000/api/v1/section/";

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}?select=title,_id`);
        const data = await response.json();
        if (data.success) {
          const sectionData = data.sections.map((section) => ({
            id: section._id,
            title: section.title,
          }));
          setSections(sectionData);
        } else {
          setError("Failed to fetch section titles");
        }
      } catch (err) {
        setError("An error occurred while fetching section titles");
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, loading, error };
};

export { useSectionTitles };
export default useSectionData;
