import React from "react";
import { Link, useParams } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { NewById } from "../../../hooks/News/UseNews";

export default function News() {
  const { newId } = useParams();
  const { New } = NewById(newId);

  return (
    <div className="container mx-auto my-10 px-4" style={{ direction: "rtl" }}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-9/12">
          <div className="mb-6">
            <img
              style={{ width: "90%", height: "90%" }}
              src={New.image?.backgroundLarge}
              alt={New.title}
              className="rounded-lg object-cover"
            />
          </div>

          <div key={New.id} className="space-y-4">
            <h5 className="text-gray-500 flex items-center gap-1">
              <AccessTimeFilledIcon />
              {new Date(New.createdAt).toLocaleDateString("ar-EG")}
            </h5>

            <h2 className="text-2xl font-bold text-gray-800">{New.title}</h2>
            <h4 className="text-xl text-gray-600">{New.subTitle}</h4>

            {New.desc?.map((descItem) => (
              <p
                key={descItem._id}
                className="text-gray-700 leading-relaxed whitespace-pre-line"
              >
                {descItem}
              </p>
            ))}

            <Link
              to={`/service/${New.service?._id}`}
              className="inline-block border border-blue-600 text-blue-600 rounded-md px-4 py-2 hover:bg-blue-50 transition-all duration-200"
            >
              الخدمة المرتبطة بالخبر
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
