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
                className={`transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isSortOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handleSortChange("")}
                  className={`w-full py-2 px-4 text-right transition-all duration-200 ${!sortOption ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-blue-100"
                    }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => handleSortChange("createdAt:desc")}
                  className={`w-full py-2 px-4 text-right transition-all duration-200 ${sortOption === "createdAt:desc" ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-blue-100"
                    }`}
                >
                  ترتيب بالأحدث
                </button>
                <button
                  onClick={() => handleSortChange("title:asc")}
                  className={`w-full py-2 px-4 text-right transition-all duration-200 ${sortOption === "title:asc" ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-blue-100"
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
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar (Hidden on mobile by default) */}
        <div
          className={`fixed md:static inset-0 top-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 p-6 transform transition-transform duration-300 md:w-1/4 md:transform-none ${isFilterOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
            }`}
        >
          <div className="flex justify-end items-center mb-6 md:hidden mt-20">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-600 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              الأقسام
            </h3>
            {sectionsError ? (
              <div className="text-red-600">{sectionsError}</div>
            ) : (
              <div className="space-y-2">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center gap-3 text-right"
                  >
                    <div className="checkbox-wrapper-23">
                      <input
                        type="checkbox"
                        id={`check-23-${section.id}`}
                        name="sectionIds"
                        value={section.id}
                        checked={selectedSectionIds.includes(section.id)}
                        onChange={() => handleCategoryChange(section.id)}
                      />
                      <label
                        htmlFor={`check-23-${section.id}`}
                        style={{ "--size": "24px" }}
                      >
                        <svg viewBox="0,0,50,50">
                          <path d="M5 30 L 20 45 L 45 5"></path>
                        </svg>
                      </label>
                    </div>
                    <span
                      className="checkbox-label truncate"
                      onClick={() => handleCategoryChange(section.id)}
                    >
                      {section.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Toggle Filter Button (Mobile) */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden flex items-center justify-end gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 cursor-pointer hover:bg-blue-500 transition-all duration-200"
        >
          <Briefcase size={20} />
          <span>الاقسام</span>
        </button>

        {/* Services Grid */}
        <div className="flex-1">
          {error ? (
            <div className="text-center p-8 text-red-600">{error}</div>
          ) : services.length === 0 ? (
            <div className="text-center p-8 text-gray-600">
              لا توجد خدمات مطابقة
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden h-96 flex flex-col transition-transform duration-200 hover:scale-103"
                  >
                    <img
                      src={service.image.url}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-blue-800 mb-2 truncate">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm flex-1 line-clamp-3 truncate">
                        {service.desc}
                      </p>
                      <div className="flex gap-2 mt-4 justify-between">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-500 transition-all duration-200">
                          احجز موعد
                        </button>
                        <Link
                          to={`/service/${service._id}`}
                          className="bg-gray-200 text-gray-800 py-2 px-4 rounded cursor-pointer hover:bg-gray-300 transition-all duration-200"
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
                    onClick={() => handlePageChange(Math.max(page - 1, 1))}
                    disabled={page === 1 || loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 cursor-pointer hover:bg-blue-500 transition-all duration-200"
                  >
                    السابق
                  </button>
                  <span className="text-gray-600">
                    الصفحة {page} من {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination.totalPages || loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 cursor-pointer hover:bg-blue-500 transition-all duration-200"
                  >
                    التالي
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
