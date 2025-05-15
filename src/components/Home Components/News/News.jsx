import React from "react";
import { Eye, Heart } from "lucide-react";
import { format } from "date-fns";

import UseNews from "../../../hooks/News/UseNews";
import { useNavigate } from "react-router-dom";

const News = () => {
  const { news, loading, error } = UseNews();

  const lastFourNews = news.slice(0, 4);

  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12" dir="rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h3 className="text-cyan-500 font-medium uppercase tracking-wider mb-2">
          معلومات أفضل، صحة أفضل
        </h3>
        <h2 className="text-4xl font-bold text-blue-900">الأخبار</h2>
      </div>

      {/* News Grid */}
      {loading ? (
        <p className="text-center">جاري تحميل الأخبار...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lastFourNews.map((article) => (
            <div
              key={article._id}
              className="flex bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer"
              onClick={() => navigate(`news/${article._id}`)}
            >
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <div className="text-blue-500 text-sm mb-1">
                    {format(new Date(article.createdAt), "EEEE dd، MMMM yyyy")}{" "}
                    | {article.service?.title || "خدمة غير معروفة"}
                  </div>
                  <h3 className="font-medium text-lg mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </div>
              <div className="w-1/3">
                <img
                  src={article.image?.thumbnailMedium || article.image?.url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
