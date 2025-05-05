import React, { useEffect, useState } from "react";
import UseNews from "../../hooks/News/UseNews";
import { Link, useSearchParams } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function News() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const { data, error, loading } = UseNews(page);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = data.filter((news) =>
      news.title.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const handlePageChange = (newPage) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage);
    window.history.pushState({}, "", `?${newSearchParams.toString()}`);
  };

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(data.length / 3), // Assuming 3 items per page
    totalItems: data.length,
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        حدث خطأ أثناء تحميل الأخبار
      </div>
    );
  }

  return (
<div className="container mx-auto my-10 px-4" style={{ direction: "rtl" }}>
  <div className="grid gap-6">
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="بحث عن خبر"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredData.map((news) => (
        <div key={news._id} className="w-full">
          <div className="bg-white rounded-lg shadow-sm h-full flex flex-col overflow-hidden">
            <img
              src={news.image.url}
              alt={news.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h6 className="text-gray-500 mb-2 flex items-center gap-1">
                <AccessTimeFilledIcon fontSize="small" />
                {new Date(news.createdAt).toLocaleDateString("ar-EG")}
              </h6>
              <h5 className="text-lg font-bold mb-1">{news.title}</h5>
              <h6 className="text-gray-600 mb-2 truncate">{news.subTitle}</h6>
              <Link
                to={`/news/${news._id}`}
                className="mt-auto inline-block text-center text-blue-600 border border-blue-600 rounded-md py-2 px-4 hover:bg-blue-50 transition-all duration-200"
              >
                تفاصيل الخبر
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination */}
    {pagination && pagination.totalPages > 1 && (
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pagination.totalPages || loading}
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-all duration-200"
        >
          التالي
        </button>
        <span className="text-gray-600">
          الصفحة {page} من {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1 || loading}
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-all duration-200"
        >
          السابق
        </button>
      </div>
    )}
  </div>
</div>
  );
}
