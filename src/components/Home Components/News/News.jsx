import React from "react";
import { Eye, Heart } from "lucide-react";

import img from "../../../assets/Iamges/news.png";

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "عنوان المقالة يظهر هنا، ولكن ليس طويلاً جداً.",
      date: "الإثنين 05، سبتمبر 2021",
      author: "الكاتب",
      image: img,
      views: 68,
      likes: 86,
    },
    {
      id: 2,
      title: "عنوان المقالة يظهر هنا، ولكن ليس طويلاً جداً.",
      date: "الإثنين 05، سبتمبر 2021",
      author: "الكاتب",
      image: img,
      views: 68,
      likes: 86,
    },
    {
      id: 3,
      title: "عنوان المقالة يظهر هنا، ولكن ليس طويلاً جداً.",
      date: "الإثنين 05، سبتمبر 2021",
      author: "الكاتب",
      image: img,
      views: 68,
      likes: 86,
    },
    {
      id: 4,
      title: "عنوان المقالة يظهر هنا، ولكن ليس طويلاً جداً.",
      date: "الإثنين 05، سبتمبر 2021",
      author: "الكاتب",
      image: img,
      views: 68,
      likes: 86,
    },
  ];

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
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className="flex bg-white shadow-sm rounded-lg overflow-hidden"
          >
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <div className="text-blue-500 text-sm mb-1">
                  {article.date} | بواسطة {article.author}
                </div>
                <h3 className="font-medium text-lg mb-2">{article.title}</h3>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                <div className="flex items-center ml-4">
                  <span className="text-sm">{article.views}</span>
                  <Eye className="w-4 h-4 mr-1" />
                </div>
                <div className="flex items-center">
                  <span className="text-sm">{article.likes}</span>
                  <Heart className="w-4 h-4 mr-1 text-red-500" />
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
