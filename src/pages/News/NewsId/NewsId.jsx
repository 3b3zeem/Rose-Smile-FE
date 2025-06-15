import React from "react";
import { Link, useParams } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { NewById } from "../../../hooks/News/UseNews";

export default function News() {
  const { newId } = useParams();
  const { New } = NewById(newId);

  return (
    <div className="container mx-auto my-10 px-4" style={{ direction: "rtl" }}>
      <div className="max-w-4xl mx-auto">
        {/* Image Section */}
        <div className="mb-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={New?.image?.backgroundLarge}
              alt={New?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Date */}
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <AccessTimeFilledIcon className="text-blue-600" />
            <span className="text-sm">
              {new Date(New?.createdAt).toLocaleDateString("ar-EG")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{New?.title}</h1>

          {/* Subtitle */}
          <h2 className="text-xl text-gray-600 mb-8 border-b pb-6">
            {New?.subTitle}
          </h2>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            {New?.desc?.map((descItem, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed mb-6 text-lg"
              >
                {descItem}
              </p>
            ))}
          </div>

          {/* Service Link */}
          {New.service?._id && (
            <div className="mt-8 pt-6 border-t">
              <Link
                to={`/service/${New.service._id}`}
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-600 rounded-xl px-6 py-3 hover:bg-blue-100 transition-all duration-200 font-medium"
              >
                <span>الخدمة المرتبطة بالخبر</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
