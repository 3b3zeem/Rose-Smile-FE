import React from "react";
import Slider from "react-slick";
import beforeImg from "../../assets/Iamges/B.jpg";
import afterImg from "../../assets/Iamges/A.jpg";
import { ChevronRight, ChevronLeft } from "lucide-react"; 

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 z-20 cursor-pointer hidden md:block"
    >
      <ChevronRight className="w-8 h-8 text-blue-700 hover:text-blue-900" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-[-30px] transform -translate-y-1/2 z-20 cursor-pointer hidden md:block"
    >
      <ChevronLeft className="w-8 h-8 text-blue-700 hover:text-blue-900" />
    </div>
  );
};

const CaseGallery = ({ cases }) => {
  const hasCases = cases && cases.length > 0;

  const imagesToDisplay = hasCases
    ? cases
    : [
        { url: beforeImg },
        { url: afterImg },
      ];

      const settings = {
        dots: imagesToDisplay.length > 1,
        infinite: imagesToDisplay.length > 1,
        arrows: imagesToDisplay.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
      

  return (
    <div className="mt-10 text-center max-w-2xl mx-auto relative">
      <Slider {...settings}>
        {imagesToDisplay.map((item, idx) => (
          <div key={idx} className="px-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={item.url}
                alt={`حالة ${idx + 1}`}
                className="h-auto max-h-[600px] object-contain bg-gray-50 p-4 mx-auto"
              />
              {!hasCases && item.label && (
                <p className="py-2 font-semibold text-blue-800 bg-gray-100">{item.label}</p>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CaseGallery;
