import React from "react";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

import img1 from "../../../assets/Iamges/d1.png";
import img2 from "../../../assets/Iamges/d2.png";
import img3 from "../../../assets/Iamges/d3.png";
import { Link } from "react-router-dom";

const DoctorsTeam = () => {
  const doctors = [
    { name: "Doctor's Name", specialty: "NEUROLOGY", image: img1 },
    { name: "Doctor's Name", specialty: "NEUROLOGY", image: img2 },
    { name: "Doctor's Name", specialty: "NEUROLOGY", image: img3 },
    { name: "Doctor's Name", specialty: "NEUROLOGY", image: img2 },
    { name: "Doctor's Name", specialty: "NEUROLOGY", image: img3 },
    { name: "Doctor's Name", specialty: "NEUROLOGY", image: img3 },
  ];

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
          <Slider {...settings} className="doctors-slider">
            {doctors.map((doctor, index) => (
              <div key={index} className="px-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-md h-[600px] flex flex-col">
                  <div className="h-full overflow-hidden hover:scale-110 duration-700 transition-all cursor-pointer">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="bg-pink-100 p-4 text-center flex-grow flex flex-col justify-center">
                    <h3 className="text-lg font-medium">{doctor.name}</h3>
                    <p className="text-blue-900 font-bold">
                      {doctor.specialty}
                    </p>

                    <div className="flex justify-center gap-3 mt-2">
                      <Link
                        to={"#"}
                        className="bg-blue-900 hover:opacity-85 duration-200 transition-all text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
                      >
                        <Linkedin size={18} />
                      </Link>
                      <Link
                        to={"#"}
                        className="bg-blue-900 hover:opacity-85 duration-200 transition-all text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
                      >
                        <Facebook size={18} />
                      </Link>
                      <Link
                        to={"#"}
                        className="bg-blue-900 hover:opacity-85 duration-200 transition-all text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
                      >
                        <Instagram size={18} />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-blue-900 hover:opacity-85 duration-200 transition-all text-white p-4 text-center cursor-pointer relative">
                    <button className="font-medium cursor-pointer">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default DoctorsTeam;
