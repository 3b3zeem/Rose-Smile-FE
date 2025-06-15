import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useDoctors } from "../../hooks/Doctors/useDoctor";

const DoctorList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

  const { doctors, totalPages, loading, error } = useDoctors({
    page: currentPage,
    size: doctorsPerPage,
    search,
  });

  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleReset = () => {
    setSearch("");
    setCurrentPage(1);
  };

  const filtersAreActive = search.trim() !== "";

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-12 text-center" dir="rtl">
      <h2 className="text-4xl font-bold text-blue-800 mb-6">فريق الأطباء</h2>
      <p className="text-gray-700 mb-10 w-full md:w-[70%] mx-auto">
        في ابتسامة الورود، نفخر بفريقنا الطبي المميز من أطباء الأسنان ذوي الخبرة والكفاءة العالية.
        نحرص على اختيار أفضل الكفاءات في مختلف تخصصات طب الأسنان، ليضمن لك كل طبيب أفضل رعاية وأفضل نتائج.
      </p>

      {/* Mobile Search Toggle */}
      <div className="md:hidden text-right mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-blue-800 text-white px-4 py-2 rounded font-semibold"
        >
          {showFilters ? "إخفاء البحث" : "إظهار البحث"}
        </button>
      </div>

      {/* Search Input */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:flex flex-col md:flex-row flex-wrap gap-4 mb-8 justify-between items-center`}
      >
        <input
          type="text"
          placeholder="ابحث باسم الطبيب أو التخصص..."
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-[98%] focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Reset button and result count */}
      {filtersAreActive && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-3">
          <button
            onClick={handleReset}
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
          >
            إعادة تعيين البحث
          </button>
          <span className="text-gray-700 font-medium text-lg">
            عدد النتائج: {doctors.length}{" "}
            {doctors?.length === 1 ? "طبيب" : "أطباء"}
          </span>
        </div>
      )}

      {/* Loading / Error / Results */}
      {loading ? (
        <p className="text-blue-700 text-lg mt-20">جاري تحميل الأطباء...</p>
      ) : error ? (
        <p className="text-red-500 mt-20">{error}</p>
      ) : doctors?.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-blue-800 text-lg flex flex-col items-center gap-8">
            <Stethoscope size={100} className="text-blue-800" />
            <span className="text-xl font-semibold">لا يوجد أطباء مطابقين</span>
          </div>
        </div>
      ) : (
        <>
          {/* Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden text-center hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate(`/doctor/${doctor?._id}`)}
              > 
               <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                  <img
                    src={doctor?.image?.url}
                    alt={doctor?.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="p-4 bg-blue-50">
                  <h3 className="text-blue-800 font-semibold text-lg">{doctor?.name}</h3>
                  <p className="text-gray-600">{doctor?.specialization || "غير محدد"}</p>
                  
                    <Link
                      to={`/doctor/${doctor?._id}`}
                      className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 font-medium"
                    >
                      <span>عرض الملف الشخصي</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                السابق
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded ${
                    currentPage === pageNum
                      ? "bg-blue-800 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorList;
