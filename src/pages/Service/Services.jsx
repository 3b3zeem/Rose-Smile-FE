import React, { useState } from "react";
import { Search, X, ChevronDown, Briefcase } from "lucide-react";
import { useAllServices } from "../../hooks/Services/useServices";
import { Link, useSearchParams } from "react-router-dom";
import { useSectionTitles } from "../../hooks/Sections/UseSections";

import "./Services.css";

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const searchTerm = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const selectedSectionIds = searchParams.getAll("sectionIds");
  const sortOption = searchParams.get("sort") || "";

  const { data: services, loading, error, pagination } = useAllServices();
  const {
    sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useSectionTitles();

  // * Search term state
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newSearchTerm) {
        newParams.set("search", newSearchTerm);
        newParams.set("page", "1");
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  // * Pagination state
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", newPage.toString());
      return newParams;
    });
  };

  // * Selected section ids state
  const handleCategoryChange = (sectionId) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const currentSectionIds = newParams.getAll("sectionIds");

      if (currentSectionIds.includes(sectionId)) {
        // Remove the sectionId if already selected
        newParams.delete("sectionIds");
        currentSectionIds
          .filter((id) => id !== sectionId)
          .forEach((id) => newParams.append("sectionIds", id));
      } else {
        newParams.append("sectionIds", sectionId);
      }

      newParams.set("page", "1");
      return newParams;
    });
  };

  // * Sort option state
  const handleSortChange = (sortValue) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", sortValue);
      newParams.set("page", "1");
      return newParams;
    });
    setIsSortOpen(false);
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
          كل الخدمات
        </h1>
        <div className="flex flex-col w-full sm:flex-row gap-4 max-w-2xl">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="...ابحث عن خدمة"
              value={searchTerm}
              onChange={handleSearch}
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
      <div className="flex flex-col lg:flex-row-reverse gap-6 relative">
        {/* Filter Sidebar - Mobile */}
        <div
          className={`fixed lg:static inset-y-0 right-0 z-[50] w-80 max-w-[80%] bg-white shadow-sm lg:w-1/4 lg:bg-transparent p-6 transform transition-all duration-300 ease-in-out ${
            isFilterOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
          style={{ top: "0" }}
          dir="rtl"
        >
          {/* Close button - Mobile */}
          <div className="sticky top-0 flex justify-between items-center mb-8 lg:hidden bg-white pb-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">الأقسام</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-600 hover:text-pink-500 transition-colors duration-200 cursor-pointer p-2 hover:bg-pink-50/50 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sections List */}
          <div className="h-full overflow-y-auto">
            {sectionsError ? (
              <div className="text-red-600">{sectionsError}</div>
            ) : (
              <div className="space-y-1.5">
                <span className="text-gray-700 text-xl">الاقسام</span>
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center gap-3 text-right hover:bg-gray-50/80 p-2.5 rounded-lg transition-all duration-200 group pt-5"
                  >
                    <label className="relative flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedSectionIds.includes(section.id)}
                        onChange={() => handleCategoryChange(section.id)}
                      />
                      <div className="w-4.5 h-4.5 border-2 border-gray-300 rounded flex items-center justify-center peer-checked:border-pink-400 peer-checked:bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-200 group-hover:border-pink-300">
                        <svg
                          className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </label>
                    <span
                      className="flex-1 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 cursor-pointer text-sm font-medium"
                      onClick={() => handleCategoryChange(section.id)}
                    >
                      {section.title}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-pink-400 transition-colors duration-200">
                      {/* يمكنك إضافة عدد الخدمات في كل قسم هنا إذا كان متوفراً */}
                      {/* {section.servicesCount} */}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Selected Filters Summary */}
          {selectedSectionIds.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev);
                      newParams.delete("sectionIds");
                      return newParams;
                    });
                  }}
                  className="text-xs text-pink-500 hover:text-pink-600 transition-colors duration-200"
                >
                  مسح التصفية
                </button>
                <span className="text-xs text-gray-500">
                  {selectedSectionIds.length} قسم محدد
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Overlay for mobile */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-500 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          >
            <div
              className={`fixed lg:static inset-y-0 right-0 z-[50] w-80 max-w-[80%] bg-white shadow-sm lg:w-1/4 lg:bg-transparent p-6 transform transition-all duration-300 ease-in-out ${
                isFilterOpen
                  ? "translate-x-0"
                  : "translate-x-full lg:translate-x-0"
              }`}
              style={{ top: "0" }}
              dir="rtl"
            >
              {/* Close button - Mobile */}
              <div className="sticky top-0 flex justify-between items-center mb-8 lg:hidden bg-white pb-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">الأقسام</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-600 hover:text-pink-500 transition-colors duration-200 cursor-pointer p-2 hover:bg-pink-50/50 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Sections List */}
              <div className="h-full overflow-y-auto">
                {sectionsError ? (
                  <div className="text-red-600">{sectionsError}</div>
                ) : (
                  <div className="space-y-1.5">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        className="flex items-center gap-3 text-right hover:bg-gray-50/80 p-2.5 rounded-lg transition-all duration-200 group pt-5"
                      >
                        <label className="relative flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={selectedSectionIds.includes(section.id)}
                            onChange={() => handleCategoryChange(section.id)}
                          />
                          <div className="w-4.5 h-4.5 border-2 border-gray-300 rounded flex items-center justify-center peer-checked:border-pink-400 peer-checked:bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-200 group-hover:border-pink-300">
                            <svg
                              className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </label>
                        <span
                          className="flex-1 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 cursor-pointer text-sm font-medium"
                          onClick={() => handleCategoryChange(section.id)}
                        >
                          {section.title}
                        </span>
                        <span className="text-xs text-gray-400 group-hover:text-pink-400 transition-colors duration-200">
                          {/* يمكنك إضافة عدد الخدمات في كل قسم هنا إذا كان متوفراً */}
                          {/* {section.servicesCount} */}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer - Selected Filters Summary */}
              {selectedSectionIds.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSearchParams((prev) => {
                          const newParams = new URLSearchParams(prev);
                          newParams.delete("sectionIds");
                          return newParams;
                        });
                      }}
                      className="text-xs text-pink-500 hover:text-pink-600 transition-colors duration-200"
                    >
                      مسح التصفية
                    </button>
                    <span className="text-xs text-gray-500">
                      {selectedSectionIds.length} قسم محدد
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Toggle Filter Button (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg mb-4 cursor-pointer hover:bg-blue-700 transition-all duration-200 w-full"
          >
            <Briefcase size={20} />
            <span className="text-base">عرض الأقسام</span>
          </button>

          {/* Services Grid */}
          {error ? (
            <div className="text-center p-8 text-red-600">{error}</div>
          ) : services.length === 0 ? (
            <div className="text-center p-8 text-gray-600">
              لا توجد خدمات مطابقة
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden h-[380px] flex flex-col transition-all duration-300"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={service.image.url}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 text-right line-clamp-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-right text-sm flex-1 mb-3 leading-relaxed">
                        {service.subTitle && service.subTitle.length > 100
                          ? `${service.subTitle.substring(0, 100)}...`
                          : service.subTitle || "لا يوجد وصف"}
                      </p>
                      <div className="flex gap-2 sm:gap-3 justify-end mt-auto">
                        <Link
                          to={`/BookADeal/service/${service._id}`}
                          className="bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base"
                        >
                          احجز موعد
                        </Link>
                        <Link
                          to={`/service/${service._id}`}
                          className="bg-gray-100 text-gray-800 py-2 px-3 sm:px-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
                        >
                          التفاصيل
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-8 items-center">
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination.totalPages || loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 cursor-pointer hover:bg-blue-500 transition-all duration-200"
                  >
                    التالي
                  </button>
                  <span className="text-gray-600">
                    الصفحة {page} من {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(Math.max(page - 1, 1))}
                    disabled={page === 1 || loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 cursor-pointer hover:bg-blue-500 transition-all duration-200"
                  >
                    السابق
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
