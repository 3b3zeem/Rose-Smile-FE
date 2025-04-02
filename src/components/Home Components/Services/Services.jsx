import React from "react";
import Slider from "react-slick";
import { Calendar, Info, ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "../../../assets/Iamges/offer1.png";
import img2 from "../../../assets/Iamges/offer2.png";
import img3 from "../../../assets/Iamges/offer3.png";

const Services = () => {
  const services = [
    {
      id: 1,
      image: img1,
      title: "خدمة زراعة الأسنان",
    },
    {
      id: 2,
      image: img2,
      title: "خدمة زراعة الأسنان",
    },
    {
      id: 3,
      image: img3,
      title: "خدمة زراعة الأسنان",
    },
    {
      id: 4,
      image: img2,
      title: "خدمة تجميل الأسنان",
    },
  ];

  // Custom arrows for the slider
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/3 -right-4 -translate-y-1/2 bg-blue-600 hover:opacity-90 transition-all duration-200 text-white rounded p-2 shadow-lg z-10 cursor-pointer"
    >
      <ChevronRight size={20} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/3 -left-4 -translate-y-1/2 bg-blue-600 hover:opacity-90 transition-all duration-200 text-white rounded p-2 shadow-lg z-10 cursor-pointer"
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12 rtl">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3 md:mb-4">
          خدماتنا
        </h2>
        <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto">
          نحن نوفر لك رعاية متكاملة لصحة فمك وأسنانك، من خلال مجموعة واسعة من
          الخدمات التي تضمن لك الابتسامة المثالية. فريقنا من الأطباء المتخصصين
          يستخدم أحدث التقنيات لضمان راحة وأمان جميع مرضانا.
        </p>
      </div>

      {/* Services Slider */}
      <div className="px-2 md:px-4">
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service.id} className="p-2 md:p-3">
              <div className="flex flex-col items-center text-center">
                {/* Image Container */}
                <div className="w-full rounded-lg overflow-hidden mb-2 md:mb-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/3] md:aspect-[16/9] object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-pink-500 mb-2 md:mb-4">
                  {service.title}
                </h3>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full justify-center mt-2">
                  <button className="bg-blue-600 text-white py-2 px-3 md:px-4 rounded flex items-center justify-center gap-2 w-full md:w-auto search cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>احجـز موعدك</span>
                    </span>
                  </button>

                  <button className="bg-blue-600 text-white py-2 px-3 md:px-4 rounded flex items-center justify-center gap-2 w-full md:w-auto search cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Info size={16} />
                      <span>التفاصيل</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Services;
