// dashboard/pages/offers/AdminOffers.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Plus,
  Pencil,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import AddHeroModal from "./AddHerosModel";
import EditHeroModal from "./EditHeroModal";
import useHeroActions from "../../hooks/Hero/useHeroActions";
import UpdateHeroImageModal from "./UpdateHeroImageModal";

const AdminHero = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    heroes,
    total,
    loading,
    error,
    page,
    totalPages,
    handlePageChange,
    addHero,
    updateHero,
    deleteHero,
    updateHeroImage,
  } = useHeroActions();

  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);

  const handleEditClick = (hero) => {
    setSelectedHero(hero);
    setIsEditModalOpen(true);
    setIsImageModalOpen(false);
  };

  const handleImageClick = (hero) => {
    setSelectedHero(hero);
    setIsImageModalOpen(true);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "!لن تتمكن من التراجع عن هذا",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "!نعم، احذف",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        const response = await deleteHero(id);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
      } catch (err) {
        toast.error(err.message || "حدث خطأ أثناء الحذف");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleSearch = (newTerm) => {
    setSearchTerm(newTerm);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newTerm) {
        newParams.set("search", newTerm);
        newParams.set("page", "1");
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen overflow-x-auto">
      <div className="overflow-x-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto sm:max-w-md" dir="rtl">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن صورة رئيسية..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-right"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto transition cursor-pointer"
          >
            <Plus size={20} />
            إضافة صورة رئيسية جديد
          </button>
        </div>

        <AddHeroModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          addHero={addHero}
        />

        {/* Update Image Modal */}
        {selectedHero && (
          <UpdateHeroImageModal
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            hero={selectedHero}
            updateHeroImage={updateHeroImage}
          />
        )}

        {/* Edit Modal */}
        {selectedHero && (
          <EditHeroModal
            isOpen={isEditModalOpen}
            onClose={() => setSelectedHero(null)}
            hero={selectedHero}
            updateHero={updateHero}
          />
        )}

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
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      الصورة
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      التفاصيل
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      زر الرابط
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      تاريخ الإنشاء
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {heroes.length > 0 ? (
                    heroes.map((hero) => (
                      <tr key={hero._id}>
                        <td className="px-4 py-3 text-center">
                          <div
                            className="relative aspect-square w-16 mx-auto bg-gray-100 overflow-hidden rounded-lg shadow-md cursor-pointer hover:opacity-90 transition"
                            onClick={() => setSelectedHero(hero)}
                          >
                            <img
                              src={
                                hero.image?.heroBanner ||
                                hero.image?.url ||
                                "/placeholder.png"
                              }
                              alt={hero.title}
                              className="w-full h-full object-cover"
                              onClick={() => handleImageClick(hero)}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="max-w-xl space-y-2">
                            <h3 className="text-base font-semibold text-gray-900">
                              {hero.title || "لا يوجد عنوان"}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {hero.subtitle || "لا يوجد وصف"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-sm font-medium text-gray-900">
                              {hero.buttonText || "لا يوجد"}
                            </span>
                            {hero.buttonLink && (
                              <a
                                href={hero.buttonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-800 truncate max-w-[150px]"
                              >
                                {hero.buttonLink}
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-xs text-gray-500 w-32">
                          {new Date(hero.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleEditClick(hero)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="تعديل"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(hero._id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="حذف"
                              disabled={deletingId === hero._id}
                            >
                              {deletingId === hero._id ? (
                                <Loader2 size={18} className="animate-spin" />
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        لا توجد صور رئيسية متاحة
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-700">
                عرض {heroes.length} من {total} صورة رئيسية
              </div>
              <div className="flex items-center gap-2 space-x-reverse">
                <span className="text-sm text-gray-700">
                  صفحة {page} من {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default AdminHero;
