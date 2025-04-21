import { useState, useEffect } from "react";

const useSectionData = (reference) => {
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000/api/v1/section";

  const url = reference ? `${BASE_URL}${reference}` : BASE_URL;

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data, "sectionData");

        if (data.success) {
          setSectionData(data.sections);
          console.log(sectionData, "sectionData");
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

export default useSectionData;
