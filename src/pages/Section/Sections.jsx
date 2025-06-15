import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useAllSections } from "../../hooks/Sections/UseSections";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../layouts/Loader";

const Sections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortOpen, setIsSortOpen] = useState(false);

  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "";

  const { sections, loading, error, refetch } = useAllSections();

  const navigate = useNavigate()

  if (error) return <div>حدث خطأ: {error}</div>;

  const handleSearch = (value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  const handleSortChange = (sortValue) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", sortValue);
      return newParams;
    });
    setIsSortOpen(false);
    // Recall the API with new sort parameter
    refetch();
  };

  const getSortLabel = () => {
    if (!sortOption) return "الكل";
    return sortOption === "createdAt:desc" ? "ترتيب بالأحدث" : "ترتيب بالأسماء";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
      {/* Header */}
      <div className="flex flex-col items-end mb-8">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          الأقسام المتاحة
        </h1>
        <div className="flex flex-col w-full sm:flex-row gap-4 max-w-2xl">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="...ابحث عن قسم"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-right transition-all duration-200"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full py-2 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 flex items-center justify-between text-right transition-all duration-200 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-1000">
                <button
                  onClick={() => handleSortChange("")}
                  className={`w-full py-2 px-4 text-right transition-all duration-200 ${
                    !sortOption
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => handleSortChange("createdAt:desc")}
                  className={`w-full py-2 px-4 text-right transition-all duration-200 ${
                    sortOption === "createdAt:desc"
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  ترتيب بالأحدث
                </button>
                <button
                  onClick={() => handleSortChange("title:asc")}
                  className={`w-full py-2 px-4 text-right transition-all duration-200 ${
                    sortOption === "title:asc"
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  ترتيب بالأسماء
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col lg:flex-row-reverse gap-6 relative"
        dir="rtl"
      >
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Sections Grid */}
          {loading ? (
            <Loader />
          ) : sections?.length === 0 ? (
            <div className="text-center p-8 text-gray-600">
              لا توجد أقسام متاحة حاليًا.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {sections?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden h-[320px] flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/section/${item._id}`)}
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={item.image?.cardImage}
                      alt={item?.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-blue-800 mb-2 text-right line-clamp-2 truncate">
                      {item?.title}
                    </h3>
                    <p className="text-gray-600 text-right text-sm flex-1 mb-3 leading-relaxed truncate">
                      {item?.subTitle && item.subTitle?.length > 100
                        ? `${item?.subTitle.substring(0, 100)}...`
                        : item?.subTitle || "لا يوجد وصف"}
                    </p>
                    <div className="flex gap-2 justify-end mt-auto">
                      <Link
                        to={`/BookADeal/section/${item._id}`}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-200 text-sm"
                      >
                        احجز موعد
                      </Link>
                      <Link
                        to={`/section/${item._id}`}
                        className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 text-sm"
                      >
                        التفاصيل
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sections;
