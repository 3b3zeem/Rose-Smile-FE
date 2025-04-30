import React from "react";
import { useParams, Link } from "react-router-dom";
import useDoctorDetails from "../../hooks/Doctors/useDoctorDetails";
import CaseGallery from "../../components/Doctor/CaseGallery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const { doctor, loading, error } = useDoctorDetails(doctorId);

  if (loading)
    return <div className="text-center mt-20 text-blue-600">جاري التحميل...</div>;

  if (error || !doctor) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error || "الطبيب غير موجود"}
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-white relative" dir="rtl">
      {/* Main content */}
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-8 text-right">

        {/* Doctor Header: Image + Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
          {/* Image */}
          <div className="flex-shrink-0 w-full max-w-xs">
            <img
              src={doctor.image.url}
              alt={doctor.name}
              className="rounded-xl shadow-lg w-full h-[400px] object-cover object-top"
            />
          </div>

          {/* Info */}
          <div className="text-center md:text-right flex-1">
            <h1 className="text-4xl font-semibold text-blue-900 mb-2">
              {doctor.name}
              <span className="block w-1/3 mx-auto md:mx-0 h-1 bg-blue-200 mt-1 rounded"></span>
            </h1>

            <p className="text-xl text-blue-800 font-semibold mb-4">{doctor.specialization}</p>

            <div className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              <strong className="text-blue-900 block mb-2">الوصف:</strong>
              {Array.isArray(doctor.description) ? (
                <ul className="list-disc pr-4 space-y-1">
                  {doctor.description.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              ) : (
                <span>• {doctor.description}</span>
              )}
            </div>
          </div>
        </div>

        {/* Static Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">رؤيتنا في رعاية المرضى</h2>
          <p className="text-gray-700 leading-loose max-w-3xl mx-auto">
            نحن نؤمن بأهمية التفاعل الإنساني بين الطبيب والمريض، ونركز على تقديم رعاية شاملة ومريحة
            لجميع الحالات. هدفنا هو دمج أحدث التقنيات مع تعاطف حقيقي لنمنحك أفضل تجربة علاجية ممكنة.
          </p>
        </section>

        {/* Case Gallery Component*/}
        <section className="border-t pt-10">
          <h3 className="text-2xl text-blue-900 font-semibold text-center mb-6">
            الحالات الخاصة بالدكتور {doctor.name}
          </h3>
          <CaseGallery cases={doctor.cases || []} doctorName={doctor.name} />
        </section>
      </div>
    </div>
  );
};

export default DoctorDetail;
