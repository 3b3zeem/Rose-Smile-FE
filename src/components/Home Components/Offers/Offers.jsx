import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

import img1 from "../../../assets/Iamges/offer1.png";
import img2 from "../../../assets/Iamges/offer2.png";
import img3 from "../../../assets/Iamges/offer3.png";

const Offers = () => {
  // Sample services data
  const services = [
    {
      id: 1,
      image: img1,
      title: "زراعة الأسنان",
      description: "زراعة الأسنان بأحدث التقنيات وأفضل الخامات",
      buttonText: "احجـز موعدك",
    },
    {
      id: 2,
      image: img2,
      title: "تركيبات الأسنان",
      description: "تركيبات أسنان طبيعية بأعلى جودة",
      buttonText: "احجـز موعدك",
    },
    {
      id: 3,
      image: img3,
      title: "تجميل الأسنان",
      description: "خدمات تجميل الأسنان لابتسامة مثالية",
      buttonText: "احجـز موعدك",
    },
    {
      id: 4,
      image: img2,
      title: "تركيبات الأسنان",
      description: "تركيبات أسنان طبيعية بأعلى جودة",
      buttonText: "احجـز موعدك",
    },
  ];

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
      {/* Header Section */}
      <div className="text-center mb-12 rtl">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">عروضنا</h2>
        <p className="md:text-lg text-md text-gray-700 max-w-2xl mx-auto">
          نهتم بابتسامتك ونوفر لك أفضل العروض على خدمات العناية بالأسنان. لتتمكن
          من الحصول على رعاية متكاملة بأسعار تنافسية. لا تفوت الفرصة واستفد من
          خصوماتنا الحصرية!
        </p>
      </div>

      {/* Services Slider */}
      <div className="px-2 md:px-4">
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service.id} className="p-2 md:p-3 h-full">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-80 md:h-96">
                {/* Image covering entire card */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
                />

                {/* Gradient overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>

                {/* Text content overlay */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end items-end">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-100 text-sm md:text-base mb-4 md:mb-6">
                    {service.description}
                  </p>
                  <button className="bg-blue-600 text-white py-2 px-4 md:px-6 rounded w-full md:w-fit search cursor-pointer">
                    <span className="flex items-center gap-2 justify-center">
                      <Calendar size={16} />
                      {service.buttonText}
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

export default Offers;
