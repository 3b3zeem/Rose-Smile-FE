import React from "react";
import { useParams } from "react-router-dom";
import useServiceDetails from "../../../hooks/Services/useServices";
import BookingForm from "../../../components/Booking/BookingForm";

export default function Service() {
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
    <div className="min-h-screen bg-gray-100 dir-rtl font-['Cairo',sans-serif]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Service Details and Image */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-semibold text-blue-900 mb-4 text-right">
                {data.title}
              </h1>
              <p className="text-lg text-gray-700 mb-6 text-right">
                {data.desc}
              </p>
              <img
                src={data.image.backgroundLarge}
                alt="Service"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 text-right">
                احجز موعدك الآن
              </h2>
              <BookingForm serviceData={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
