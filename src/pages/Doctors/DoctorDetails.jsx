import React from "react";
import { useParams } from "react-router-dom";
import doctors from "../Doctors/MockData.js";

const DoctorDetail = () => {
  const { slug } = useParams();
  const doctor = doctors.find((doc) => doc.slug === slug);

  if (!doctor) {
    return (
      <div className="text-center mt-20 text-red-500">الطبيب غير موجود</div>
    );
  }

  return (
    <div className="min-h-[60vh]" dir="rtl">
      <div
        className="max-w-6xl mx-auto py-12 px-4 md:px-8 text-right"
        dir="rtl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              {doctor.name}
            </h2>
            <p>
              <strong>التخصص:</strong> {doctor.specialty}
            </p>
            <p>
              <strong>الشهادات:</strong> {doctor.certifications}
            </p>
            <p>
              <strong>الخبرة:</strong> {doctor.experience} سنة
            </p>
            <button className="bg-cyan-500 text-white py-2 px-6 mt-4 rounded hover:bg-cyan-600 transition-all">
              الاتصال مع الدكتور {doctor.firstName}
            </button>
          </div>
          <div>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
