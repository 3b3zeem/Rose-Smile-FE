import React from "react";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useSomeDoctors } from "../../../hooks/Doctors/useDoctor";

const DoctorsTeam = () => {
  const { doctors, loading, error } = useSomeDoctors({ page: 1, size: 5 });

  // Custom arrows for the slider
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

  // Slider settings
  const settings = {
    dots: false,
    infinite: doctors.length > 1,
    speed: 500,
    slidesToShow: Math.min(doctors.length, 3),
    slidesToScroll: 1,
    nextArrow: doctors.length > 1 ? <NextArrow /> : null,
    prevArrow: doctors.length > 1 ? <PrevArrow /> : null,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(doctors.length, 2),
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

  return (
    <div className="bg-white py-12 px-4 md:px-8 text-right" dir="rtl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
          فريق الأطباء
        </h2>

        <p className="text-gray-700 mb-10 text-lg px-4 md:px-16">
          في مجمع التسليم المورد. نحن فخورون بفريقنا الطبي المميز من أطباء
          الأسنان ذوي الخبرة والكفاءة العالية. نحرص على اختيار أفضل الكفاءات في
          مختلف تخصصات طب الأسنان، ليضمن لك كل طبيب أفضل رعاية و أفضل النتائج.
        </p>

        <div className="relative px-6">
          {loading ? (
            <p className="text-center text-gray-600">جاري تحميل البيانات...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-600">لا يوجد أطباء متاحون</p>
          ) : (
            <Slider {...settings} className="doctors-slider">
              {doctors.map((doctor) => (
                <div key={doctor._id} className="px-2">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-[600px] flex flex-col">
                    <div className="h-full overflow-hidden hover:scale-110 duration-700 transition-all cursor-pointer">
                      <img
                        src={doctor.image.url || "/path/to/default-image.png"}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="bg-pink-100 p-4 text-center flex-grow flex flex-col justify-center">
                      <h3 className="text-lg font-medium">{doctor.name}</h3>
                      <p className="text-blue-900 font-bold">
                        {doctor.specialization || "غير محدد"}
                      </p>
                    </div>

                    <Link
                      to={`/doctor/${doctor._id}`}
                      className="font-medium cursor-pointer"
                    >
                      <div className="bg-blue-900 hover:opacity-85 duration-200 transition-all text-white p-4 text-center cursor-pointer relative">
                        View Profile
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsTeam;
