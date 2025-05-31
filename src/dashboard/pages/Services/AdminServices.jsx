import React, { useEffect, useState } from "react";
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
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import ImageUpdateModal from "./ImageUpdateModal";
import useAdminServices from "../../hooks/Services/useAdminService";
import { useSectionTitles } from "../../../hooks/Sections/UseSections";
import Swal from "sweetalert2";
import Loader from "../../../layouts/Loader";

const AdminServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sections } = useSectionTitles();
  const {
    services,
    total,
    loading,
    page,
    totalPages,
    handlePageChange,
    addService,
    updateService,
    deleteService,
    updateServiceImage,
  } = useAdminServices();
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [deletingServiceId, setDeletingServiceId] = useState(null);

  const handleEditClick = (service) => {
    setCurrentService(service);
    setIsEditModalOpen(true);
  };

  const handleImageClick = (service) => {
    setCurrentService(service);
    setIsImageModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذف!",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      setDeletingServiceId(id);
      try {
        const response = await deleteService(id);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error.message || "حدث خطأ أثناء الحذف");
      } finally {
        setDeletingServiceId(null);
      }
    }
  };

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

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearchTerm(currentSearch);
  }, [searchParams]);

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
              placeholder="ابحث عن خدمات..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-right"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-200 w-full sm:w-auto"
          >
            <Plus size={20} />
            إضافة خدمة جديدة
          </button>
        </div>

        <AddServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          sections={sections}
          addService={addService}
        />

        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          sections={sections}
          service={currentService}
          updateService={updateService}
        />

        <ImageUpdateModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          service={currentService}
          updateServiceImage={updateServiceImage}
        />

        {loading ? (
          <Loader />
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
                      القسم
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
                  {services.length > 0 ? (
                    services.map((service) => (
                      <tr key={service._id}>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          <img
                            src={
                              service?.image?.thumbnailMedium ||
                              service?.image?.url ||
                              "/images/default-thumbnail.png"
                            }
                            alt={service?.title || "لا يوجد عنوان"}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded cursor-pointer mx-auto"
                            onClick={() => handleImageClick(service)}
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[150px] sm:max-w-[200px] truncate">
                          {service?.title || "لا يوجد عنوان"}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[120px] sm:max-w-[150px] truncate">
                          {service?.section?.title || "لا يوجد قسم"}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {new Date(service?.createdAt).toLocaleDateString(
                            "ar-EG"
                          )}
                        </td>
                        <td className="px-2 sm:px-4 py-8 whitespace-nowrap text-sm flex gap-5 items-center justify-center">
                          <button
                            onClick={() => handleEditClick(service)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="تعديل الخدمة"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title="حذف الخدمة"
                            disabled={deletingServiceId === service._id}
                          >
                            {deletingServiceId === service._id ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
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

            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3">
              <div className="text-sm text-gray-700">
                عرض {services.length} من {total} خدمة
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
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
