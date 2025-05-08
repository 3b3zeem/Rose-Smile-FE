import React from "react";
import { Eye, Heart } from "lucide-react";
import UseNews from "../../../hooks/News/UseNews";
import { Link } from "react-router-dom";

const News = () => {
  const { data, loading, error } = UseNews(1);

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>{error}</p>;

  const latestNews = [...data].slice(-4).reverse();

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {latestNews.map((article) => (
          <div
            key={article._id}
            className="flex bg-white shadow-sm rounded-lg overflow-hidden"
          >
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <div className="text-blue-500 text-sm mb-1 flex flex-col gap-2">
                  {new Date(article.createdAt).toLocaleDateString("ar-EG")}
                  <span>بواسطة: {article.service.title}</span>
                </div>
                <h3 className="font-medium text-lg my-2">
                  {article.title}
                </h3>
              </div>
            </div>
            <Link to={`/news/${article._id}`} className="cursor-pointer w-1/3">
            <div className="w-full h-full hover:scale-105 transition-all duration-150">
              <img
                src={article.image?.cardImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
