import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Plus,
  Pencil,
  Minus,
} from "lucide-react";
import useAdminServices from "../../hooks/Services/useAdminService";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSectionTitles } from "../../../hooks/Sections/UseSections";
import { motion, AnimatePresence } from "framer-motion";

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
  const searchTerm = searchParams.get("search") || "";

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Separate state for Add Service modal
  const [addFormData, setAddFormData] = useState({
    title: "",
    subTitle: "",
    sectionId: "",
    image: null,
    description: [""],
    features: [""],
  });

  // Separate state for Edit Service modal
  const [editFormData, setEditFormData] = useState({
    title: "",
    subTitle: "",
    sectionId: "",
    description: [""],
    features: [""],
  });

  const handleAddInputChange = (e, field, index = null) => {
    if (index !== null) {
      const updatedArray = [...addFormData[field]];
      updatedArray[index] = e.target.value;
      setAddFormData({ ...addFormData, [field]: updatedArray });
    } else {
      setAddFormData({ ...addFormData, [field]: e.target.value });
    }
  };

  const handleEditInputChange = (e, field, index = null) => {
    if (index !== null) {
      const updatedArray = [...editFormData[field]];
      updatedArray[index] = e.target.value;
      setEditFormData({ ...editFormData, [field]: updatedArray });
    } else {
      setEditFormData({ ...editFormData, [field]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    setAddFormData({ ...addFormData, image: e.target.files[0] });
  };

  const handleImageFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const addField = (formData, setFormData, field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (formData, setFormData, field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", addFormData.title);
    data.append("subTitle", addFormData.subTitle);
    data.append("sectionId", addFormData.sectionId);
    if (addFormData.image) {
      data.append("image", addFormData.image);
    }
    addFormData.description.forEach((desc, index) => {
      if (desc) data.append(`description[${index}]`, desc);
    });
    addFormData.features.forEach((feature, index) => {
      if (feature) data.append(`features[${index}]`, feature);
    });

    try {
      await addService(data);
      toast.success("تم إضافة الخدمة بنجاح");
      setIsAddModalOpen(false);
      setAddFormData({
        title: "",
        subTitle: "",
        sectionId: "",
        image: null,
        description: [""],
        features: [""],
      });
    } catch (error) {
      toast.error(error.message || "فشل في إضافة الخدمة");
    }
  };

  const handleEditClick = (service) => {
    setCurrentService(service);
    setEditFormData({
      title: service.title || "",
      subTitle: service.subTitle || "",
      sectionId: service.section?._id || "",
      description: service.description.length > 0 ? service.description : [""],
      features: service.features.length > 0 ? service.features : [""],
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: editFormData.title,
      subTitle: editFormData.subTitle,
      sectionId: editFormData.sectionId,
      description: editFormData.description.filter(
        (desc) => desc.trim() !== ""
      ),
      features: editFormData.features.filter(
        (feature) => feature.trim() !== ""
      ),
    };

    try {
      await updateService(currentService._id, data);
      toast.success("تم تحديث الخدمة بنجاح");
      setIsEditModalOpen(false);
      setCurrentService(null);
      setEditFormData({
        title: "",
        subTitle: "",
        sectionId: "",
        description: [""],
        features: [""],
      });
    } catch (error) {
      toast.error(error.message || "فشل في تحديث الخدمة");
    }
  };

  const handleImageClick = (service) => {
    setCurrentService(service);
    setSelectedImage(null);
    setIsImageModalOpen(true);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("يرجى اختيار صورة للتحديث");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      await updateServiceImage(currentService._id, formData);
      toast.success("تم تحديث الصورة بنجاح");
      setIsImageModalOpen(false);
      setCurrentService(null);
      setSelectedImage(null);
    } catch (error) {
      toast.error(error.message || "فشل في تحديث الصورة");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      toast.success("تم حذف الخدمة بنجاح");
    } catch (error) {
      toast.error(error.message || "فشل في حذف الخدمة");
    }
  };

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
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-200 w-full sm:w-auto"
          >
            <Plus size={20} />
            إضافة خدمة جديدة
          </button>
        </div>

        {/* Add Service Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div
              key="Add-Service-Modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-500 p-4 mt-20"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh]"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-6 text-right">
                  إضافة خدمة جديدة
                </h2>
                <form
                  onSubmit={handleAddSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      العنوان الفرعي
                    </label>
                    <input
                      type="text"
                      value={addFormData.subTitle}
                      onChange={(e) => handleAddInputChange(e, "subTitle")}
                      className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      العنوان
                    </label>
                    <input
                      type="text"
                      value={addFormData.title}
                      onChange={(e) => handleAddInputChange(e, "title")}
                      className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      الصورة
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="mt-1 block w-full p-2 border border-gray-500 hover:bg-gray-100 transition-all duration-200 cursor-pointer rounded-md focus:outline-none text-right"
                      accept="image/*"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      القسم
                    </label>
                    <select
                      value={addFormData.sectionId}
                      onChange={(e) => handleAddInputChange(e, "sectionId")}
                      className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
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
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      الوصف
                    </label>
                    <AnimatePresence>
                      {addFormData.description.map((desc, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2 space-x-reverse mt-1 gap-2"
                        >
                          <input
                            type="text"
                            value={desc}
                            onChange={(e) =>
                              handleAddInputChange(e, "description", index)
                            }
                            className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
                          />
                          {addFormData.description.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeField(
                                  addFormData,
                                  setAddFormData,
                                  "description",
                                  index
                                )
                              }
                              className="text-red-600 hover:text-red-800 whitespace-nowrap"
                            >
                              <Minus />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() =>
                        addField(addFormData, setAddFormData, "description")
                      }
                      className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      المميزات
                    </label>
                    <AnimatePresence>
                      {addFormData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2 space-x-reverse mt-1 gap-2"
                        >
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              handleAddInputChange(e, "features", index)
                            }
                            className="block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
                          />
                          {addFormData.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeField(
                                  addFormData,
                                  setAddFormData,
                                  "features",
                                  index
                                )
                              }
                              className="text-red-600 hover:text-red-800 whitespace-nowrap"
                            >
                              <Minus />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() =>
                        addField(addFormData, setAddFormData, "features")
                      }
                      className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2 space-x-reverse mt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200 cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                    >
                      إضافة
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Service Modal */}
        <AnimatePresence>
          {isEditModalOpen && (
            <motion.div
              key="Edit-Service-Modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-500 p-4 md:mt-20"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh]"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-6 text-right">
                  تعديل الخدمة
                </h2>
                <form
                  onSubmit={handleEditSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      العنوان الفرعي
                    </label>
                    <input
                      type="text"
                      value={editFormData.subTitle}
                      onChange={(e) => handleEditInputChange(e, "subTitle")}
                      className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      العنوان
                    </label>
                    <input
                      type="text"
                      value={editFormData.title}
                      onChange={(e) => handleEditInputChange(e, "title")}
                      className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
                      required
                    />
                  </div>
                  <div></div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      القسم
                    </label>
                    <select
                      value={editFormData.sectionId}
                      onChange={(e) => handleEditInputChange(e, "sectionId")}
                      className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right cursor-pointer"
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
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      الوصف
                    </label>
                    <AnimatePresence>
                      {editFormData.description.map((desc, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2 space-x-reverse mt-1 gap-2"
                        >
                          <input
                            type="text"
                            value={desc}
                            onChange={(e) =>
                              handleEditInputChange(e, "description", index)
                            }
                            className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
                          />
                          {editFormData.description.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeField(
                                  editFormData,
                                  setEditFormData,
                                  "description",
                                  index
                                )
                              }
                              className="text-red-600 hover:text-red-800 whitespace-nowrap"
                            >
                              <Minus />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() =>
                        addField(editFormData, setEditFormData, "description")
                      }
                      className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      المميزات
                    </label>
                    <AnimatePresence>
                      {editFormData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2 space-x-reverse mt-1 gap-2"
                        >
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              handleEditInputChange(e, "features", index)
                            }
                            className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
                          />
                          {editFormData.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeField(
                                  editFormData,
                                  setEditFormData,
                                  "features",
                                  index
                                )
                              }
                              className="text-red-600 hover:text-red-800 whitespace-nowrap"
                            >
                              <Minus />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() =>
                        addField(editFormData, setEditFormData, "features")
                      }
                      className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2 space-x-reverse mt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200 cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                    >
                      حفظ التعديلات
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Update Overlay */}
        <AnimatePresence>
          {isImageModalOpen && (
            <motion.div
              key="image-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-6 text-right">
                  تحديث الصورة
                </h2>
                <form onSubmit={handleImageSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-right">
                      اختر صورة جديدة
                    </label>
                    <input
                      type="file"
                      onChange={handleImageFileChange}
                      className="mt-3 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right cursor-pointer hover:bg-gray-200 transition-all duration-200"
                      accept="image/*"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 space-x-reverse mt-4">
                    <button
                      type="button"
                      onClick={() => setIsImageModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200 cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                    >
                      تحديث
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                            src={service.image.thumbnailMedium}
                            alt={service.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded cursor-pointer mx-auto"
                            onClick={() => handleImageClick(service)}
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-[150px] sm:max-w-[200px] truncate">
                          {service.title}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[120px] sm:max-w-[150px] truncate">
                          {service.section.title}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {new Date(service.createdAt).toLocaleDateString(
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
                          >
                            <Trash2 size={16} />
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
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
