import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Plus,
} from "lucide-react";
import useAdminServices from "../../hooks/Services/useAdminService";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSectionTitles } from "../../../hooks/Sections/UseSections";

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
    deleteService,
  } = useAdminServices();
  const searchTerm = searchParams.get("search") || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    sectionId: "",
    image: null,
    description: [""],
    features: [""],
  });

  const handleInputChange = (e, field, index = null) => {
    if (index !== null) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = e.target.value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subTitle", formData.subTitle);
    data.append("sectionId", formData.sectionId);
    if (formData.image) {
      data.append("image", formData.image);
    }
    formData.description.forEach((desc, index) => {
      if (desc) data.append(`description[${index}]`, desc);
    });
    formData.features.forEach((feature, index) => {
      if (feature) data.append(`features[${index}]`, feature);
    });

    try {
      await addService(data);
      toast.success("تم إضافة الخدمة بنجاح");
      setIsModalOpen(false);
      setFormData({
        title: "",
        subTitle: "",
        sectionId: "",
        image: null,
        description: [""],
        features: [""],
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      toast.success("تم حذف الخدمة بنجاح");
    } catch (error) {
      toast.error(error);
    }
  };

  // * Search term state
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
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

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen overflow-x-auto">
      <div className="overflow-x-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto sm:max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن خدمات..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-200 w-full sm:w-auto"
          >
            <Plus size={20} />
            إضافة خدمة جديدة
          </button>
        </div>

        {/* Modal for Adding Service */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4 mt-20">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-lg sm:text-xl font-semibold mb-6 text-right">
                إضافة خدمة جديدة
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* العنوان */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-right">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    className="mt-1 block w-full p-2 border-gray-300 rounded shadow-sm text-right focus:outline-none"
                    required
                  />
                </div>

                {/* العنوان الفرعي */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-right">
                    العنوان الفرعي
                  </label>
                  <input
                    type="text"
                    value={formData.subTitle}
                    onChange={(e) => handleInputChange(e, "subTitle")}
                    className="mt-1 block w-full p-2 border-gray-300 rounded shadow-sm text-right focus:outline-none"
                  />
                </div>

                {/* القسم */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-right">
                    القسم
                  </label>
                  <select
                    value={formData.sectionId}
                    onChange={(e) => handleInputChange(e, "sectionId")}
                    className="mt-1 block w-full p-2 border-gray-300 rounded shadow-sm text-right focus:outline-none"
                    required
                  >
                    <option value="">اختر قسمًا</option>
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* الصورة */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-right">
                    الصورة
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full p-2 border-gray-300 rounded shadow-sm text-right focus:outline-none"
                    accept="image/*"
                  />
                </div>

                {/* الوصف */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 text-right">
                    الوصف
                  </label>
                  {formData.description.map((desc, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2 space-x-reverse mt-1 gap-2"
                    >
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) =>
                          handleInputChange(e, "description", index)
                        }
                        className="mt-1 block w-full p-2 border-gray-300 rounded shadow-sm text-right focus:outline-none"
                      />
                      {formData.description.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField("description", index)}
                          className="text-red-600 hover:text-red-800 whitespace-nowrap cursor-pointer"
                        >
                          حذف
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("description")}
                    className="mt-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    إضافة وصف آخر
                  </button>
                </div>

                {/* المميزات */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 text-right">
                    المميزات
                  </label>
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2 space-x-reverse mt-1 gap-2"
                    >
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleInputChange(e, "features", index)
                        }
                        className="mt-1 block w-full p-2 border-gray-300 rounded shadow-sm text-right focus:outline-none"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField("features", index)}
                          className="text-red-600 hover:text-red-800 whitespace-nowrap cursor-pointer"
                        >
                          حذف
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("features")}
                    className="mt-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    إضافة ميزة أخرى
                  </button>
                </div>

                <div className="md:col-span-2 flex justify-end gap-2 space-x-reverse mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer transition-all duration-200"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-200"
                  >
                    إضافة
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      الصورة
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      العنوان
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      العنوان الفرعي
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      القسم
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      تاريخ الإنشاء
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.length > 0 ? (
                    services.map((service) => (
                      <tr key={service._id}>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <img
                            src={service.image.thumbnailMedium}
                            alt={service.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[150px] sm:max-w-[200px] truncate">
                          {service.title}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[150px] sm:max-w-[200px] truncate">
                          {service.subTitle}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[120px] sm:max-w-[150px] truncate">
                          {service.section.title}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {new Date(service.createdAt).toLocaleDateString(
                            "ar-EG"
                          )}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() =>
                              handleDelete(service._id, service.title)
                            }
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title="حذف الخدمة"
                          >
                            <Trash2 size={16} className="sm:w-20" />
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

            {/* Pagination */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
