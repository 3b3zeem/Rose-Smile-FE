import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import Loader from "../../layouts/Loader";
import UseNews from "../../hooks/News/UseNews";
import { Link } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

// Sort Component
const SortDropdown = ({ sortOption, onSortChange }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const getSortLabel = () => {
    switch (sortOption) {
      case "createdAt:desc":
        return "الأحدث";
      case "createdAt:asc":
        return "الأقدم";
      case "title:asc":
        return "ترتيب بالأسماء";
      default:
        return "الأحدث";
    }
  };

  return (
    <div className="relative w-full sm:w-48">
      <button
        onClick={() => setIsSortOpen(!isSortOpen)}
        className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 flex items-center justify-between text-right transition-all duration-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{getSortLabel()}</span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isSortOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isSortOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <button
            onClick={() => {
              onSortChange("createdAt:desc");
              setIsSortOpen(false);
            }}
            className={`w-full py-2 px-4 text-right transition-all duration-200 ${
              sortOption === "createdAt:desc"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            الأحدث
          </button>
          <button
            onClick={() => {
              onSortChange("createdAt:asc");
              setIsSortOpen(false);
            }}
            className={`w-full py-2 px-4 text-right transition-all duration-200 ${
              sortOption === "createdAt:asc"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            الأقدم
          </button>
          <button
            onClick={() => {
              onSortChange("title:asc");
              setIsSortOpen(false);
            }}
            className={`w-full py-2 px-4 text-right transition-all duration-200 ${
              sortOption === "title:asc"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            ترتيب بالأسماء
          </button>
        </div>
      )}
    </div>
  );
};

// News Card Component
const NewsCard = ({ news }) => {
  const navigate = useNavigate()
  return (
    <div className="group cursor-pointer" onClick={() => navigate(`/news/${news?._id}`)}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col overflow-hidden">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={news?.image?.cardImage}
            alt={news?.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <AccessTimeFilledIcon fontSize="small" />
            <span>{new Date(news?.createdAt).toLocaleDateString("ar-EG")}</span>
          </div>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {news?.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            {news?.subTitle}
          </p>
          <Link
            to={`/news/${news?._id}`}
            className="mt-auto inline-flex items-center justify-center text-blue-600 border border-blue-600 rounded-lg py-2 px-4 hover:bg-blue-50 transition-all duration-200 text-sm font-medium"
          >
            اقرأ المزيد
          </Link>
        </div>
      </div>
    </div>
  );
};

// News Grid Component
const NewsGrid = ({ data, loading }) => {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((news) => (
            <NewsCard key={news?._id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
};

// Pagination Component
const Pagination = ({ page, totalPages, onPageChange, loading }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1 || loading}
        className="bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-all duration-200 font-medium"
      >
        السابق
      </button>
      <span className="text-gray-600 font-medium">
        الصفحة {page} من {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || loading}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all duration-200 font-medium"
      >
        التالي
      </button>
    </div>
  );
};

// Main Component
export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const {
    news: data,
    loading,
    error,
    totalPages,
    page,
    handlePageChange,
  } = UseNews();

  const handleSearch = (value) => {
    setSearchValue(value);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value.trim()) {
        newParams.set("search", value.trim());
      } else {
        newParams.delete("search");
      }
      newParams.set("page", "1");
      return newParams;
    });
  };

  const handleSortChange = (sortValue) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", sortValue);
      newParams.set("page", "1");
      return newParams;
    });
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-[60vh] flex items-center justify-center">
  //       <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4" style={{ direction: "rtl" }}>
      <div className="grid gap-8">
        {/* Search and Sort Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* <SearchBar searchValue={searchValue} onSearchChange={handleSearch} /> */}
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="ابحث عن خبر..."
              aria-label="Search"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>
          <SortDropdown
            sortOption={searchParams.get("sort") || "createdAt:desc"}
            onSortChange={handleSortChange}
          />
        </div>

        {/* News Grid */}
        <NewsGrid data={data} loading={loading} />

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>
    </div>
  );
}
