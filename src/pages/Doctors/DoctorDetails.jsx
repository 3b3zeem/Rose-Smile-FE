import React from "react";
import { useParams } from "react-router-dom";
import useDoctorDetails from "../../hooks/Doctors/useDoctorDetails";
import CaseGallery from "../../components/Doctor/CaseGallery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../../layouts/Loader";

const MAX_INLINE_LINES = 6;

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const { doctor, loading, error } = useDoctorDetails(doctorId);

  if (loading) return <Loader />;

  if (error || !doctor) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error || "الطبيب غير موجود"}
      </div>
    );
  }

  // Ensure description is an array
  const description = Array.isArray(doctor?.description)
    ? doctor?.description
    : [doctor?.description];

  const inlineDescription = description.slice(0, MAX_INLINE_LINES);
  const extraDescription = description.slice(MAX_INLINE_LINES);

  return (
    <div className="min-h-[80vh] bg-white relative" dir="rtl">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 md:px-8 text-right">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10 mb-16">
          {/* Image */}
          <div className="flex-shrink-0 w-full max-w-xs md:max-w-sm">
            <img
              src={doctor?.image?.url}
              alt={doctor?.name}
              className="rounded-xl shadow-lg w-full h-[400px] object-cover object-top"
            />
          </div>

          {/* Info */}
          <div className="flex-1 w-full max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-900 mb-2">
              {doctor?.name}
              <span className="block w-1/4 h-1 bg-blue-200 mt-1 rounded"></span>
            </h1>

            <p className="text-base sm:text-lg text-blue-700 font-medium mb-4">
              {doctor?.specialization}
            </p>

            <div className="border border-blue-100 rounded-xl p-4 sm:p-6 shadow-sm text-gray-800">
              <h2 className="text-base sm:text-xl font-semibold text-blue-800 mb-3">
                الوصف:
              </h2>
              <ul className="list-disc pr-4 space-y-2 text-sm leading-loose">
                {inlineDescription.map((line, idx) => (
                  <li key={idx} className="break-words">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* More Info (only if lines > 7 lines) */}
        {extraDescription?.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-4 border-t pt-6">
              معلومات إضافية
            </h2>
            <ul className="list-disc pr-6 space-y-2 text-sm leading-loose text-gray-800">
              {extraDescription.map((line, idx) => (
                <li key={idx} className="break-words">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Divider */}
        <div className="w-full border-t border-gray-200 my-12"></div>

        {/* Static Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            رؤيتنا في رعاية المرضى
          </h2>
          <p className="text-gray-700 leading-loose max-w-3xl mx-auto text-base sm:text-lg">
            نحن نؤمن بأهمية التفاعل الإنساني بين الطبيب والمريض، ونركز على تقديم
            رعاية شاملة ومريحة لجميع الحالات. هدفنا هو دمج أحدث التقنيات مع
            تعاطف حقيقي لنمنحك أفضل تجربة علاجية ممكنة.
          </p>
        </section>

        {/* Case Gallery */}
        <section className="border-t pt-10">
          <h3 className="text-2xl text-blue-900 font-semibold text-center mb-6">
            الحالات الخاصة بالطبيب {doctor.name}
          </h3>
          <CaseGallery cases={doctor?.cases || []} doctorName={doctor?.name} />
        </section>
      </div>
    </div>
  );
};

export default DoctorDetail;
