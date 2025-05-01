import React from "react";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowLeft,
  Info,
} from "lucide-react";

import useOffers from "../../../hooks/HomeComponents/useOffers";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const { offers, loading } = useOffers();
  const navigate = useNavigate();

  const handleNavigate = (type, reference) => {
    const path = `/${type}/${reference}`;
    navigate(path);
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const truncateTitle = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Custom arrows for the slider
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white hover:bg-gray-50 transition-all duration-200 text-gray-600 rounded-full p-2 shadow-lg z-10 cursor-pointer border border-gray-200"
    >
      <ChevronRight size={20} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white hover:bg-gray-50 transition-all duration-200 text-gray-600 rounded-full p-2 shadow-lg z-10 cursor-pointer border border-gray-200"
    >
      <ChevronLeft size={20} />
    </button>
  );

  // Slider settings
  const settings = {
    dots: false,
    infinite: offers.length > 1,
    speed: 500,
    slidesToShow: Math.min(offers.length, 3),
    slidesToScroll: 1,
    nextArrow: offers.length > 1 ? <NextArrow /> : null,
    prevArrow: offers.length > 1 ? <PrevArrow /> : null,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(offers.length, 2),
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
    <div className="max-w-6xl mx-auto px-4 py-16 font-sans">
      {/* Header Section */}
      <div className="text-center mb-12 rtl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          عروضنا
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
        <p className="md:text-lg text-md text-gray-600 max-w-2xl mx-auto leading-relaxed">
          نهتم بابتسامتك ونوفر لك أفضل العروض على خدمات العناية بالأسنان. لتتمكن
          من الحصول على رعاية متكاملة بأسعار تنافسية. لا تفوت الفرصة واستفد من
          خصوماتنا الحصرية!
        </p>
      </div>

      {/* Services Slider */}
      <div className="px-2 md:px-4">
        {loading ? (
          <p className="text-center text-lg text-gray-600">
            جارٍ تحميل العروض...
          </p>
        ) : !offers.length ? (
          <p className="text-center text-gray-500">
            لا توجد عروض متاحة حالياً.
          </p>
        ) : (
          <Slider {...settings}>
            {offers.map((offer) => (
              <div key={offer.id} className="p-2 md:p-3 h-full">
                <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={offer.image.cardImage}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow rtl">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[28px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {truncateTitle(offer.title)}
                    </h3>
                    <p
                      className="text-gray-600 text-sm mb-4 flex-grow min-h-[48px] overflow-hidden text-right"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {truncateText(offer.desc)}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() =>
                          handleNavigate(offer.type, offer.reference)
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                      >
                        <Calendar size={16} />
                        <span>احجز الان</span>
                        <ArrowLeft size={14} />
                      </button>
                      <button
                        onClick={() =>
                          handleNavigate(offer.type, offer.reference)
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 bg-pink-50 hover:bg-pink-100 text-pink-600 py-2 px-3 rounded-lg transition-colors duration-200 text-sm border border-pink-200"
                      >
                        <Info size={16} />
                        <span>التفاصيل</span>
                        <ArrowLeft size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Offers;
