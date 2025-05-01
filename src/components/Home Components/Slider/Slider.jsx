import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import useHero from "../../../hooks/Hero/useHero";
import "./Slider.css";

const DentalClinicSlider = () => {
  const { heroes, loading, error } = useHero();

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-10px] md:right-[-15px] top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 transition-all duration-200 text-gray-600 rounded-full p-2 shadow-lg z-10 cursor-pointer border border-gray-200"
    >
      <ChevronRight size={20} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-10px] md:left-[-15px] top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 transition-all duration-200 text-gray-600 rounded-full p-2 shadow-lg z-10 cursor-pointer border border-gray-200"
    >
      <ChevronLeft size={20} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: heroes.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
    customPaging: () => <div className="dot"></div>,
  };

  if (loading)
    return <p className="text-center text-gray-600">جاري التحميل...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto -mt-4" dir="rtl">
      <Slider {...settings}>
        {heroes.map((hero) => (
          <div key={hero._id}>
            <div
              className="relative h-[85vh] md:h-[85vh] bg-cover bg-center bg-no-repeat overflow-hidden shadow-lg group"
              style={{
                backgroundImage: `url(${hero.image?.backgroundLarge})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 transition-opacity duration-300 group-hover:opacity-90"></div>

              <div className="relative z-20 h-full flex flex-col justify-center items-end text-right p-6 sm:p-8 md:p-16 md:max-w-2xl md:ml-auto">
                <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-bold mb-3 sm:mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  {hero.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                  {hero.subtitle}
                </p>
                <Link
                  to={hero.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-5 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  <CircleCheckBig size={18} />
                  <span>{hero.buttonText}</span>
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DentalClinicSlider;
