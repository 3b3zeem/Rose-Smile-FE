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
