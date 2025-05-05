import axios from "axios";
import React, { useEffect } from "react";

export default  function UseNews(page) {
  const BASE_URL = "http://localhost:5000/api/v1/news/";
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${BASE_URL}?page=${page}`);
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
  }, [page]);
  return { data, loading, error };
}


export function NewById(id) {
  const BASE_URL = "http://localhost:5000/api/v1/news";
  const [New, setNew] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${BASE_URL}/${id}`);
        
        console.log(res);
        setNew(res.data.data || []);
        console.log(New);
      } catch (err) {
        console.error(err);
        setError("فشل في تحميل بيانات الأخبار");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  return { New, loading, error };
}
