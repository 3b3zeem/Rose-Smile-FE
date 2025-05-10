import { useEffect, useState } from "react";

const useFetchOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACK_END
          }/api/v1/offer?page=1&size=5&display=yes`
        );
        const data = await response.json();
        setOffers(data.offers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading };
};

export default useFetchOffers;
