import React from "react";
import { Link } from "react-router-dom";
import doctors from "../Doctors/MockData.js";

const DoctorList = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center" dir="rtl" >
      <h2 className="text-4xl font-bold text-blue-900 mb-6">فريق الأطباء</h2>
      <p className="text-gray-700 mb-10">
        في مجمع ابتسامة الورود، نفخر بفريقنا الطبي المتميز من أطباء الأسنان.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden text-center"
          >
            <img src={doctor.image} alt={doctor.name} className="w-full object-cover" />
            <div className="p-4 bg-blue-50">
              <h3 className="text-blue-900 font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-500 text-sm mt-1">نبذة عن {doctor.name}</p>
              <Link
                to={`/doctor/${doctor.slug}`}
                className="text-blue-600 mt-2 inline-block underline"
              >
                رابط الموقع الشخصي
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
