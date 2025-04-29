import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, CircleCheckBig } from "lucide-react";
import useHero from "../../../hooks/Hero/useHero";
import "./Slider.css";

const DentalClinicSlider = () => {
  const { heroes, loading, error } = useHero();

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-10px] md:right-[-15px] top-1/2 -translate-y-1/2 bg-blue-600 hover:opacity-90 transition-all duration-200 text-white rounded p-2 shadow-lg z-10 cursor-pointer"
    >
      <ChevronRight size={20} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-10px] md:left-[-15px] top-1/2 -translate-y-1/2 bg-blue-600 hover:opacity-90 transition-all duration-200 text-white rounded p-2 shadow-lg z-10 cursor-pointer"
    >
      <ChevronLeft size={20} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: heroes.length > 1,
    speed: 500,
    slidesToShow: Math.min(heroes.length, 1),
    slidesToScroll: 1,
    nextArrow: heroes.length > 1 ? <NextArrow /> : null,
    prevArrow: heroes.length > 1 ? <PrevArrow /> : null,
    rtl: true,
    dotsClass: "slick-dots custom-dots",
    customPaging: (i) => <div className="dot"></div>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(heroes.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <p className="text-center">Loading slider...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6" dir="rtl">
      <Slider {...settings}>
        {heroes.map((hero) => (
          <div key={hero._id}>
            <div
              className="relative h-[70vh] sm:h-[80vh] md:h-[550px] bg-cover bg-center rounded-md overflow-hidden"
              style={{
                backgroundImage: `url(${hero.image?.heroBanner})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-900/80"></div>

              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-center items-end text-right p-4 sm:p-8 md:p-16 md:max-w-2xl md:ml-auto">
                <h2 className="text-2xl sm:text-3xl md:text-6xl text-white font-bold mb-3 sm:mb-4">
                  {hero.title}
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-pink-200 mb-6 sm:mb-8 leading-relaxed">
                  {hero.subtitle}
                </p>
                <Link
                  to={hero.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-md transition duration-300 flex items-center justify-center w-full sm:w-auto search cursor-pointer"
                >
                  <span className="flex gap-2 items-center">
                    <CircleCheckBig size={16} />
                    {hero.buttonText}
                  </span>
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
