import React from "react";
import { Link, useParams } from "react-router-dom";
import useSectionData from "../../../hooks/Sections/UseSections";
import { Calendar, Clock, CheckCircle, Star, ArrowLeft } from "lucide-react";

import Slider from "react-slick";

import { ChevronLeft, ChevronRight } from "lucide-react";
import BookingForm from "../../../components/Booking/BookingForm";
import Loader from "../../../layouts/Loader";

const SectionId = () => {
  const { reference } = useParams();
  const { sectionData, loading, error } = useSectionData(reference);

  // Custom arrows for the slider
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 -right-4 -translate-y-1/2 bg-blue-600 hover:opacity-90 transition-all duration-200 text-white rounded p-2 shadow-lg z-10 cursor-pointer"
    >
      <ChevronRight size={20} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 -left-4 -translate-y-1/2 bg-blue-600 hover:opacity-90 transition-all duration-200 text-white rounded p-2 shadow-lg z-10 cursor-pointer"
    >
      <ChevronLeft size={20} />
    </button>
  );

  // Slider settings
  const settings = {
    dots: false,
    infinite: sectionData?.services?.length > 1,
    speed: 500,
    slidesToShow: Math.min(sectionData?.services?.length || 1, 3),
    slidesToScroll: 1,
    nextArrow: sectionData?.services?.length > 1 ? <NextArrow /> : null,
    prevArrow: sectionData?.services?.length > 1 ? <PrevArrow /> : null,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(sectionData?.services?.length || 1, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-gray-200 dir-rtl font-['Cairo',sans-serif] text-right">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/sections"
          className="inline-flex items-center gap-2 text-blue-600 hover-pink mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة للأقسام
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
                <img
                  src={
                    sectionData.image?.backgroundLarge ||
                    "/api/placeholder/450/400"
                  }
                  alt={sectionData?.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {sectionData?.title}
                </h1>
                <p className="text-gray-200">{sectionData?.subTitle}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Section Details */}
          <div className="lg:w-1/2 space-y-8">
            {/* Section Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                {/* Description */}
                {sectionData?.description &&
                  sectionData?.description?.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-blue-900 mb-4">
                        وصف القسم
                      </h2>
                      <div className="space-y-3">
                        {sectionData?.description.map((desc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-end gap-3 bg-gray-50 p-4 rounded-lg"
                          >
                            <p className="text-gray-700 leading-relaxed">
                              {desc}
                            </p>
                            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Features */}
                {sectionData?.features && sectionData.features?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-900 mb-4">
                      لماذا تختار قسم {sectionData.title} في مجمع ابتسامة
                      الورود؟
                    </h2>
                    <div className="space-y-3">
                      {sectionData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-end gap-3 bg-blue-50 p-4 rounded-lg"
                        >
                          <p className="text-gray-700">{feature}</p>
                          <Star className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section Details */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-end gap-3 text-gray-700">
                      <span>
                        آخر تحديث: {formatDate(sectionData?.updatedAt)}
                      </span>
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex items-center justify-end gap-3 text-gray-700">
                      <span>قسم معتمد من قبل العيادة</span>
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Button */}
            <Link
              to={`/BookADeal/section/${sectionData._id}`}
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
              لماذا تختار أقسامنا؟
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
};

export default SectionId;
