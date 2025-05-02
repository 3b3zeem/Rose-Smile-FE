import axios from "axios";
import React, { useEffect } from "react";

export default function UseNews() {
  const BASE_URL = "http://localhost:5000/api/v1/news/";
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${BASE_URL}`);
        setData(res.data.data || []);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError("فشل في تحميل بيانات الأخبار");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  return { data, loading, error };
}
