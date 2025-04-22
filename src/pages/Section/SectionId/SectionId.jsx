import React from "react";
import { Link, useParams } from "react-router-dom";
import useSectionData from "../../../hooks/Sections/UseSections";

import Slider from "react-slick";

import { ChevronLeft, ChevronRight } from "lucide-react";
import BookingForm from "../../../components/Booking/BookingForm";

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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-600 font-bold font-['Cairo',sans-serif] dir-rtl">
        جاري التحميل...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-red-600 font-bold font-['Cairo',sans-serif] dir-rtl">
        {error}
      </div>
    );

  return (
    <div className="bg-white max-w-6xl mx-auto">
      {/* Main Section Content */}
      <div className="flex flex-col md:flex-row p-4 md:p-8 gap-8">
        <div className="lg:w-1/2">
          <div className="bg-white rounded shadow-md p-6">
            <h1 className="text-3xl font-semibold text-blue-900 mb-4 text-right">
              {sectionData.title}
            </h1>
            <p className="text-lg text-gray-700 mb-6 text-right">
              {sectionData.desc}
            </p>
            <img
              src={
                sectionData.image?.backgroundLarge || "/api/placeholder/450/400"
              }
              alt={sectionData.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-white rounded shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 text-right">
              احجز موعدك الآن
            </h2>
            <BookingForm sectionData={sectionData} />
          </div>
        </div>
      </div>

      {/* Services Slider */}
      {sectionData.services && sectionData.services.length > 0 && (
        <div className="p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-blue-800 text-right mb-6">
            الخدمات المتاحة للقسم
          </h2>
          <Slider {...settings}>
            {sectionData.services.map((service) => (
              <div
                key={service._id}
                className="p-4 flex flex-col rounded hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="rounded overflow-hidden">
                  <img
                    src={service.image?.url}
                    alt={service.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4 text-right flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-blue-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.desc.slice(0, 150)}
                    {service.desc.length > 150 && "..."}
                  </p>
                </div>

                <div className="px-4 pb-4 mt-auto">
                  <Link
                    to={`/service/${service._id}`}
                    className="block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 search"
                  >
                    <span>تفاصيل الخدمة</span>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default SectionId;
