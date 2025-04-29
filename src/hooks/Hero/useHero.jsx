import { useEffect, useState } from "react";
import axios from "axios";

const useHero = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/hero/all"
        );
        if (response.data?.success) {
          setHeroes(response.data.heroes);
        } else {
          throw new Error("Failed to fetch heroes");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  return { heroes, loading, error };
};

export default useHero;
