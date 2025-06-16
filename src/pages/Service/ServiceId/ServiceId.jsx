import React from "react";
import { useParams, Link } from "react-router-dom";
// import useServiceDetails from "../../../hooks/Services/useServices";
import { Calendar, Clock, CheckCircle, Star, ArrowLeft } from "lucide-react";
import Loader from "../../../layouts/Loader";
import { useServiceDetails } from "../../../hooks/Services/useServices";

export default function Service() {
  const { reference } = useParams();
  const { data, loading, error } = useServiceDetails(reference);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "gregory", // Force Gregorian calendar
    };
    return new Date(dateString).toLocaleDateString("ar-SA", options);
  };

  if (loading)
    return (
      <Loader />
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-red-600 font-bold font-['Cairo',sans-serif] dir-rtl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-gray-200 dir-rtl font-['Cairo',sans-serif]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-blue-600 hover-pink mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة للخدمات
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/3]">
                <img
                  src={data?.image.backgroundLarge}
                  alt={data?.title || "لا يوجد وصف"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {data?.title}
                </h1>
                <p className="text-gray-200">{data?.subTitle || "لا يوجد وصف "}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Service Details */}
          <div className="lg:w-1/2 space-y-8" dir="rtl">
            {/* Service Info */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="space-y-6">
                {/* Description */}
                {data?.description && data?.description.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-900 mb-4">
                      وصف الخدمة
                    </h2>
                    <div className="space-y-3">
                      {data.description.map((desc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-end gap-3 bg-gray-50 p-4 rounded-lg"
                        >
                          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed w-full break-words">
                            {desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {data?.features && data.features?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-900 mb-4">
                      لماذا تختار مجمع ابتسامة الورود للحصول على {data.title} ؟
                    </h2>
                    <div className="space-y-3">
                      {data.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-start gap-3 bg-blue-50 p-4 rounded-lg"
                        >
                          <Star className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Details */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-start gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span>آخر تحديث: {formatDate(data?.updatedAt)}</span>
                    </div>
                    <div className="flex items-center justify-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>خدمة معتمدة من قبل العيادة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Button */}
            <Link
              to={`/BookADeal/service/${data._id}`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 px-6 rounded-xl font-bold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              احجز الآن
            </Link>
          </div>
        </div>

        {/* Static Content - Moved to bottom on mobile */}
        <div className="mt-12 lg:hidden">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              لماذا تختار خدماتنا؟
            </h3>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                في عيادتنا، نقدم خدمات طبية متخصصة بأعلى معايير الجودة والرعاية.
                فريقنا من الأطباء المتخصصين يعملون بجد لتقديم أفضل الخدمات
                الطبية لمرضانا.
              </p>
              <p className="leading-relaxed">
                نستخدم أحدث التقنيات والأجهزة الطبية لتقديم تشخيص دقيق وعلاج
                فعال. نحن نؤمن بأن كل مريض يستحق رعاية شخصية واهتمام خاص.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
