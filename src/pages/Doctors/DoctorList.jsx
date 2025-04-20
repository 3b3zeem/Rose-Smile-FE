import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import useDoctors from "../../hooks/Doctors/useDoctor";

const DoctorList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

  const { doctors, totalDoctors, totalPages, loading, error } = useDoctors({
    page: currentPage,
    size: doctorsPerPage,
    search,
  });

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
      <p className="text-gray-700 mb-10">
        في مجمع ابتسامة الورود، نفخر بفريقنا الطبي المتميز من أطباء الأسنان.
      </p>

      {/* Mobile search toggle */}
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
            عدد النتائج: {doctors.length} {doctors.length === 1 ? "طبيب" : "أطباء"}
          </span>
        </div>
      )}

      {/* Loading / Error / Results */}
      {loading ? (
        <p className="text-blue-700 text-lg mt-20">جاري تحميل الأطباء...</p>
      ) : error ? (
        <p className="text-red-500 mt-20">{error}</p>
      ) : doctors.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-blue-800 text-lg flex flex-col items-center gap-8">
            <Stethoscope size={100} className="text-blue-800" />
            <span className="text-xl font-semibold">لا يوجد أطباء مطابقين</span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden text-center"
              >
                <img
                  src={doctor.image.url}
                  alt={doctor.name}
                  className="w-full object-cover"
                />
                <div className="p-4 bg-blue-50">
                  <h3 className="text-blue-800 font-semibold">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    نبذة عن {doctor.name}
                  </p>
                  <Link
                    to={`/doctor/${doctor._id}`}
                    className="text-blue-800 mt-2 inline-block underline"
                  >
                    رابط الموقع الشخصي
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
