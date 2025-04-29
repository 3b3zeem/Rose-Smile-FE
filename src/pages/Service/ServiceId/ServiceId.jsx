import React from "react";
import { useParams } from "react-router-dom";
import useServiceDetails from "../../../hooks/Services/useServices";

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
    <div className="min-h-screen bg-gray-50 dir-rtl font-['Cairo',sans-serif] text-right">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row-reverse items-start gap-12">
          {/* Right Column: Text Content */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                {data.title}
              </h1>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {data.desc}
              </p>
            </div>
          </div>

          {/* Left Column: Image */}
          <div className="lg:w-1/2 w-full">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={data.image.backgroundLarge}
                alt="Service"
                className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
