import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import doctors from "../Doctors/MockData.js";

const DoctorList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("الكل");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 8;
  const specialties = ["الكل", ...new Set(doctors.map((doc) => doc.specialty))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "الكل" || doc.specialty === filter;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  const filtersAreActive = search.trim() !== "" || filter !== "الكل";

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const handleReset = () => {
    setSearch("");
    setFilter("الكل");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-12 text-center" dir="rtl">
      <h2 className="text-4xl font-bold text-blue-800 mb-6">فريق الأطباء</h2>
      <p className="text-gray-700 mb-10">
        في مجمع ابتسامة الورود، نفخر بفريقنا الطبي المتميز من أطباء الأسنان.
      </p>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden text-right mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-blue-800 text-white px-4 py-2 rounded font-semibold"
        >
          {showFilters ? "إخفاءالفلاتر" : "إظهار الفلاتر"}
        </button>
      </div>

      {/* Filters */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:flex flex-col md:flex-row flex-wrap gap-4 mb-8 justify-between items-center space-y-4 md:space-y-0`}
      >
        <input
          type="text"
          placeholder="ابحث باسم الطبيب أو التخصص..."
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-[48%] focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-[48%] focus:outline-none "
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {specialties.map((specialty, index) => (
            <option key={index} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {/* Reset & count */}
      {filtersAreActive && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-3">
          <button
            onClick={handleReset}
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
          >
            إعادة تعيين الفلاتر
          </button>
          <span className="text-gray-700 font-medium text-lg">
            عدد النتائج: {filteredDoctors.length}{" "}
            {filteredDoctors.length === 1 ? "طبيب" : "أطباء"}
          </span>
        </div>
      )}

      {/* No results */}
      {filteredDoctors.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-blue-800 text-lg flex flex-col items-center gap-8">
            <Stethoscope size={100} className="text-blue-800" />
            <span className="text-xl font-semibold">
              {doctors.length === 0
                ? "لا يوجد أطباء حالياً في النظام."
                : "لا يوجد أطباء مطابقين للبحث أو الفلاتر المحددة"}
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden text-center"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full object-cover"
                />
                <div className="p-4 bg-blue-50">
                  <h3 className="text-blue-800 font-semibold">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    نبذة عن {doctor.name}
                  </p>
                  <Link
                    to={`/doctor/${doctor.slug}`}
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
