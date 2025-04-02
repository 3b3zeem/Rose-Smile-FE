import React from "react";
import Slider from "react-slick";

import "./Slider.css";

import img1 from "../../../assets/Iamges/4c9b0095724607.5e9e2d86b5d89.jpg";
import img2 from "../../../assets/Iamges/R.jpeg";
import img3 from "../../../assets/Iamges/OIP.jpeg";
import { CircleCheckBig } from "lucide-react";

const DentalClinicSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    rtl: true,
    dotsClass: "slick-dots custom-dots",
    customPaging: () => (
      <div className="w-2 h-2 mx-1 mt-10 bg-pink-500 rounded-full"></div>
    ),
  };

  const slides = [
    {
      id: 1,
      title: "ابتسامة الورود",
      subtitle: "تقديم رعاية صحية عالية الجودة في بيئة مريحة وداعمة",
      buttonText: "احجـز موعدك الآن",
      image: img1,
    },
    {
      id: 2,
      title: "عيادات متخصصة",
      subtitle: "فريق من أمهر الأطباء لتقديم أفضل الخدمات العلاجية",
      buttonText: "استشارة مجانية",
      image: img2,
    },
    {
      id: 3,
      title: "تقنيات حديثة",
      subtitle: "أحدث التقنيات والأجهزة لعلاج مشاكل الأسنان بدقة عالية",
      buttonText: "تعرف على خدماتنا",
      image: img3,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6" dir="rtl">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="relative h-[70vh] sm:h-[80vh] md:h-[550px] bg-cover bg-center rounded-md overflow-hidden"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay gradient - from right to left */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-900/80"></div>

              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-center items-end text-right p-4 sm:p-8 md:p-16 md:max-w-2xl md:ml-auto">
                <h2 className="text-2xl sm:text-3xl md:text-6xl text-white font-bold mb-3 sm:mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-pink-200 mb-6 sm:mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-md transition duration-300 flex items-center justify-center w-full sm:w-auto search cursor-pointer">
                  <span className="flex gap-2 items-center">
                    <CircleCheckBig size={16} />
                    {slide.buttonText}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DentalClinicSlider;
