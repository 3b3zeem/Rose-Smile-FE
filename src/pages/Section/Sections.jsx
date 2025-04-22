import React from "react";

import { useAllSections } from "../../hooks/Sections/UseSections";
import { Link, useSearchParams } from "react-router-dom";

const Sections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const { sections, loading, error } = useAllSections();

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>حدث خطأ: {error}</div>;

  const handleSearch = (value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set("search", value);
        newParams.set("page", "1");
      } else {
        newParams.delete("search");
        newParams.set("page", "1");
      }
      return newParams;
    });
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-['Cairo',sans-serif]">
        {/* Title and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-3xl font-bold text-blue-900 text-right order-2">
            الأقسام المتاحة
          </h2>

          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="ابحث عن قسم..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right bg-white transition duration-200"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Sections Grid */}
        {sections.length === 0 ? (
          <div className="text-center text-gray-500 text-lg font-medium py-12">
            لا توجد أقسام متاحة حاليًا.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded shadow-sm overflow-hidden flex flex-col"
              >
                <img
                  src={item.image?.cardImage}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="flex-grow p-5">
                  <h3 className="text-xl font-bold text-blue-900 text-right mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-right line-clamp-3">
                    {item.desc}
                  </p>
                </div>
                <div className="px-5 pb-5 text-right">
                  <Link to={`/section/${item._id}`}>
                    <button className=" bg-blue-600 text-white font-semibold rounded-lg py-2 px-4 text-[17px] transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 search cursor-pointer">
                      <span>احجز ميعادك</span>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Sections;
