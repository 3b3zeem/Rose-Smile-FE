import React, { useState } from "react";
import useNews from "../../hooks/News/useNews";
import { useSearchParams } from "react-router-dom";
import useAdminServices from "../../hooks/Services/useAdminService";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Plus,
  Pencil,
} from "lucide-react";
import AddNewsModal from "./AddNewsModal";
import EditNewsnModal from "./EditNewsnModal";

export default function AdminNews() {

 const{services} = useAdminServices()

  const {
    news,
    loading,
    error,
    page,
    fetchNews,
    createNew,
    updateNew,
    updateImage,
    deleteNew,
  } = useNews();

  // handle search params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newSearchTerm) {
        newParams.set("search", newSearchTerm);
        newParams.set("page", "1");
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  // handle  modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const[currentNew,setCurrentNew]= useState({});

  const handleEditClick = (newsItem) => {
    setCurrentNew(newsItem);
    setIsEditModalOpen(true);
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen overflow-x-auto">
      <div className="overflow-x-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto sm:max-w-md" dir="rtl">
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن اخبار..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-right"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-200 w-full sm:w-auto"
          >
            <Plus size={20} />
            إضافة خبر جديد
          </button>
        </div>

        {/* EXPLAIN THIS CODE */}
        <AddNewsModal
          isOpen={isAddModalOpen}
          allServices={services}
          onClose={() => setIsAddModalOpen(false)}
          news={news}
          addNews={createNew}
        />

        <EditNewsnModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          news={news}
          updateNew={updateNew}
          currentNew={currentNew}
        />

        {/* <ImageSectinUpdateModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          section={currentsection}
          updatesectionImage={updatesectionImage}
        />
 */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          <React.Fragment>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-center px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                      الصورة
                    </th>
                    <th className="text-center px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                      العنوان
                    </th>
                    <th className="text-center px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                      العنون الفرعى
                    </th>
                    <th className="text-center px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                      تاريخ الإنشاء
                    </th>
                    <th className="text-center px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {news.length > 0 ? (
                    news.map((newsItem) => (
                      <tr key={newsItem._id}>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          <img
                            src={newsItem.image?.cardImage}
                            alt={newsItem.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded cursor-pointer mx-auto"
                            onClick={() => handleImageClick(newsItem)}
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[150px] sm:max-w-[200px] truncate">
                          {newsItem.title}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[120px] sm:max-w-[150px] truncate">
                          {newsItem.subTitle}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {new Date(newsItem.createdAt).toLocaleDateString(
                            "ar-EG"
                          )}
                        </td>
                        <td className="px-2 sm:px-4 py-8 whitespace-nowrap text-sm flex gap-5 items-center justify-center">
                          <button
                            onClick={() => handleEditClick(newsItem)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="تعديل الخدمة"
                          >
                            <Pencil size={16} />
                          </button>
                          {/* <button
                            onClick={() =>handleDelete(newsItem._id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title="حذف الخدمة"
                            disabled={deletingsectionId === newsItem._id}
                          >
                            {deletingsectionId === newsItem._id ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button> */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-2 sm:px-4 py-4 text-center text-sm text-gray-500"
                      >
                        لا توجد خدمات متاحة
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination  */}
            {/* <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3">
              <div className="text-sm text-gray-700">
                عرض {sections.length} من {total} خدمة
              </div>
              <div className="flex items-center gap-2 space-x-reverse">
                <span className="text-sm text-gray-700">
                  صفحة {page} من {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer transition-all duration-200"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer transition-all duration-200"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div> */}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
