import React, { useEffect, useState, useMemo } from "react";
import UseNews from "../../hooks/News/UseNews";
import { Link, useSearchParams } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Loader2 } from "lucide-react";

export default function News() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const { data, error, loading } = UseNews(page);

  // Memoize filtered data to prevent unnecessary re-renders
  const filteredNews = useMemo(() => {
    if (!data) return [];
    return data;
  }, [data]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = data.filter((news) =>
      news.title.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", newPage);
      return newParams;
    });
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(data?.length / 8) || 1, // 8 items per page (2 rows of 4)
    totalItems: data?.length || 0,
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg shadow-sm">
          حدث خطأ أثناء تحميل الأخبار
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4" style={{ direction: "rtl" }}>
      <div className="grid gap-8">
        {/* Search Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                placeholder="ابحث عن خبر..."
                aria-label="Search"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.map((news) => (
            <div key={news._id} className="group">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={news.image.url}
                    alt={news.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <AccessTimeFilledIcon fontSize="small" />
                    <span>
                      {new Date(news.createdAt).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {news.subTitle}
                  </p>
                  <Link
                    to={`/news/${news._id}`}
                    className="mt-auto inline-flex items-center justify-center text-blue-600 border border-blue-600 rounded-lg py-2 px-4 hover:bg-blue-50 transition-all duration-200 text-sm font-medium"
                  >
                    اقرأ المزيد
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1 || loading}
              className="bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              السابق
            </button>
            <span className="text-gray-600 font-medium">
              الصفحة {page} من {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === pagination.totalPages || loading}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all duration-200 font-medium"
            >
              التالي
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
