import { useQuery } from "@tanstack/react-query";

const useFetchOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACK_END
        }/api/v1/offer?page=1&size=5&display=yes`
      );
      const data = await res.json();
      return data.offers;
    },
  });
};

export default useFetchOffers;
