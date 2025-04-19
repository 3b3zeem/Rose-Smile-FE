import React from "react";
import { useParams } from "react-router-dom";
import useSectionData from "../../../hooks/Sections/UseSections";

import Slider from "react-slick";

import { ChevronLeft, ChevronRight } from "lucide-react";

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

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white max-w-6xl mx-auto">
      {/* Main Section Content */}
      <div className="flex flex-col md:flex-row p-4 md:p-8">
        {/* صورة القسم */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <div className="relative bg-blue-100 rounded-xl p-6 w-full h-full">
            <img
              src={sectionData.image.heroBanner || "/api/placeholder/450/400"}
              alt={sectionData.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* المحتوى النصي */}
        <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 text-right mb-3">
              {sectionData.title}
            </h1>
            <p className="text-gray-600 text-right mb-6">{sectionData.desc}</p>
          </div>
        </div>
      </div>

      {/* Services Slider */}
      {sectionData.services && sectionData.services.length > 0 && (
        <div className="p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-blue-800 text-right mb-6">
            الخدمات
          </h2>
          <Slider {...settings}>
            {sectionData.services.map((service) => (
              <div key={service._id} className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={service.image.url || "/api/placeholder/300/200"}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-right">
                    <h3 className="text-lg font-bold text-blue-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.desc.slice(0, 150)}
                      {service.desc.length > 150 && "..."}
                    </p>
                  </div>
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
