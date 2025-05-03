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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-gray-200 dir-rtl font-['Cairo',sans-serif] text-right">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left Column: Enhanced Text Content and Image */}
          <div className="lg:w-[320px] w-full">
            <div className="flex flex-col gap-6 bg-white rounded border border-gray-100">
              {/* Image Section */}
              <div className="overflow-hidden rounded-t">
                <img
                  src={data.image.backgroundLarge}
                  alt="Service"
                  aria-label="Service image"
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Title Section */}
              <div className="px-6 pb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 border-b border-gray-200 pb-3 mb-4 leading-relaxed w-full break-words">
                  {data.title}
                </h1>
                {data.subTitle && (
                  <h2 className="text-base sm:text-lg font-medium text-gray-600 leading-relaxed w-full break-words">
                    {data.subTitle}
                  </h2>
                )}
                <div className="flex flex-col gap-2 items-end mt-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">
                      آخر تحديث:{" "}
                      {new Date(data.updatedAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Calendar size={18} className="text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white border border-gray-100 p-6 sm:p-8">
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
    </div>
  );
};

export default BookADeal;
