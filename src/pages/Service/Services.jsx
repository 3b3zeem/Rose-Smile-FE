import React, { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { useAllServices } from "../../hooks/Services/useServices";

const Services = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const size = 6;

  const {
    data: services,
    loading,
    error,
    pagination,
  } = useAllServices(page, size);

  const filteredServices = useMemo(() => {
    let result = services;
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((service) =>
        service.title.toLowerCase().includes(lowerSearch)
      );
    }
    return result;
  }, [services, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          كل الخدمات
        </h1>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="ابحث عن خدمة..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-right transition-all duration-200"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar (Hidden on mobile by default) */}
        <div
          className={`fixed md:static inset-0 top-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 p-6 transform transition-transform duration-300 md:w-1/4 md:transform-none ${
            isFilterOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex justify-between items-center mb-6 md:hidden mt-20">
            <h2 className="text-xl font-bold text-blue-800">الفلاتر</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-600 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          <h2 className="text-xl font-bold text-blue-800 mb-4 hidden md:block">
            الفلاتر
          </h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">الفئة</h3>
          </div>
        </div>

        {/* Toggle Filter Button (Mobile) */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 cursor-pointer hover:bg-blue-500 transition-all duration-200"
        >
          <Filter size={20} />
          <span>الفلاتر</span>
        </button>

        {/* Services Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center p-8">جاري التحميل...</div>
          ) : error ? (
            <div className="text-center p-8 text-red-600">{error}</div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center p-8 text-gray-600">
              لا توجد خدمات مطابقة
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden h-96 flex flex-col transition-transform duration-200 hover:scale-103"
                  >
                    <img
                      src={service.image.url || "/api/placeholder/300/200"}
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
                      <div className="flex gap-2 mt-4">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded flex-1 cursor-pointer hover:bg-blue-500 transition-all duration-200">
                          احجز موعد
                        </button>
                        <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded flex-1 cursor-pointer hover:bg-gray-300 transition-all duration-200">
                          التفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1 || loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 cursor-pointer hover:bg-blue-500 transition-all duration-200"
                  >
                    السابق
                  </button>
                  <span className="text-gray-600">
                    الصفحة {page} من {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
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
