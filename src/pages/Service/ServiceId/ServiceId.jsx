import React from "react";
import { useParams, Link } from "react-router-dom";
import useServiceDetails from "../../../hooks/Services/useServices";
import { Calendar, Clock, CheckCircle, Star, ArrowLeft } from "lucide-react";

export default function Service() {
  const { reference } = useParams();
  const { data, loading, error } = useServiceDetails(reference);


  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-2xl font-bold text-gray-600 font-[Cairo] direction-rtl">
        جاري التحميل...
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-2xl font-bold text-red-600 font-[Cairo] direction-rtl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-[Cairo] text-right direction-rtl">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-center gap-8 lg:flex-row-reverse lg:gap-12">
          {/* Text Section */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h1 className="mb-4 text-3xl font-extrabold text-blue-900 sm:text-4xl">
                {data.title}
              </h1>
              <h2 className="mb-4 text-xl text-gray-700 sm:text-2xl">
                {data.subTitle}
              </h2>
              <p className="mb-6 text-gray-600 leading-relaxed">
                {data.description}
              </p>
              <div>
                <strong className="mb-3 block text-lg font-semibold text-blue-800">
                  المميزات:
                </strong>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  {data.features.map((feature, index) => (
                    <li style={{direction:"rtl"}} key={index} className="text-base sm:text-lg">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative flex h-[400px] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-gray-100 p-6 shadow-xl sm:h-[450px] lg:h-[500px]">
              <img
                src={data.image.backgroundLarge}
                alt={data.title}
                className="h-full w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}