import React from "react";
import { useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/Services/useServices";
import BookingForm from "../Booking/BookingForm";
import { Calendar, FileText, CheckCircle } from "lucide-react";

const BookADeal = () => {
  const { reference } = useParams();
  const { data, loading, error } = useServiceDetails(reference);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-600 font-bold font-['Cairo',sans-serif] dir-rtl">
        جاري التحميل...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-red-600 font-bold font-['Cairo',sans-serif] dir-rtl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dir-rtl font-['Cairo',sans-serif] text-right">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Column: Enhanced Text Content and Image */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-md shadow-md p-8 mb-6 border border-gray-200">
              {/* Title Section */}
              <div className="mb-8 border-b pb-4 border-gray-300">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  العنوان
                </h3>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 leading-tight mb-1">
                  {data.title}
                </h1>
                {/* {data.subTitle && (
                  <h2 className="text-lg sm:text-xl font-medium text-gray-600">
                    {data.subTitle}
                  </h2>
                )} */}
              </div>

              {/* Section Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  القسم
                </h3>
                <p className="text-lg text-gray-800">{data.sectionId.title}</p>
              </div>
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-md shadow-lg">
              <img
                src={data.image.backgroundLarge}
                alt="Service"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:w-1/2 w-full">
            <BookingForm
              serviceData={{ id: data._id, title: data.title }}
              sectionData={{
                id: data.sectionId._id,
                title: data.sectionId.title,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookADeal;
