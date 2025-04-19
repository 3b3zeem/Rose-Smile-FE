import { useState, useEffect } from "react";

const useSectionData = (reference) => {
  const [sectionData, setSectionData] = useState({
    title: "",
    desc: "",
    image: { heroBanner: "" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000/api/v1/section/";

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}${reference}`
        );
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

    if (reference) {
      fetchSection();
    }
  }, [reference]);

  return { sectionData, loading, error };
};

export default useSectionData;