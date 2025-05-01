import React, { useEffect, useState } from "react";
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
import Swal from "sweetalert2";

const AdminServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sections } = useSectionTitles();
  const {
    services,
    total,
    loading,
    addLoading,
    editLoading,
    deleteLoading,
    imageUploadLoading,
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedImage(file);
      setAddFormData({ ...addFormData, image: e.target.files[0] });
    }
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
      const result = await addService(data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      setIsAddModalOpen(false);
      setAddFormData({
        title: "",
        subTitle: "",
        sectionId: "",
        image: null,
        description: [""],
        features: [""],
      });
      setPreviewImage(null);
    } catch (error) {
      toast.error(error.message);
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
      const result = await updateService(currentService._id, data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
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
      toast.error(error.message);
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
      const result = await updateServiceImage(currentService._id, formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      setIsImageModalOpen(false);
      setCurrentService(null);
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (error) {
      toast.error(error.message);
    }
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
            disabled={addLoading}
          >
            {addLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Plus size={20} />
            )}
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
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-2xl w-full h-full max-h-screen overflow-auto p-8 md:p-12"
                dir="rtl"
              >
                <h2 className="text-3xl font-bold mb-8 text-right text-gray-800 border-b pb-4">
                  إضافة خدمة جديدة
                </h2>

                <div className="flex flex-col lg:flex-row gap-10">
                  {/* القسم الأيسر: صورة */}
                  <div className="w-full lg:w-1/3 flex justify-center">
                    <div
                      className="relative w-full h-64 lg:h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-lg text-center">
                          اضغط لرفع صورة
                        </span>
                      )}
                      <input
                        type="file"
                        id="imageUpload"
                        onChange={handleImageFileChange}
                        className="hidden"
                        accept="image/*"
                        disabled={addLoading}
                      />
                    </div>
                  </div>

                  {/* القسم الأيمن: النموذج */}
                  <form
                    onSubmit={handleAddSubmit}
                    className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* العنوان الفرعي */}
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        العنوان الفرعي
                      </label>
                      <input
                        type="text"
                        value={addFormData.subTitle}
                        onChange={(e) => handleAddInputChange(e, "subTitle")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right focus:outline-none"
                        disabled={addLoading}
                      />
                    </div>

                    {/* العنوان */}
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        العنوان
                      </label>
                      <input
                        type="text"
                        value={addFormData.title}
                        onChange={(e) => handleAddInputChange(e, "title")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right focus:outline-none"
                        required
                        disabled={addLoading}
                      />
                    </div>

                    {/* القسم */}
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        القسم
                      </label>
                      <select
                        value={addFormData.sectionId}
                        onChange={(e) => handleAddInputChange(e, "sectionId")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right focus:outline-none"
                        required
                        disabled={addLoading}
                      >
                        <option value="">اختر قسمًا</option>
                        {sections.map((section) => (
                          <option key={section.id} value={section.id}>
                            {section.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* الوصف */}
                    <div className="md:col-span-2" dir="rtl">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
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
                            className="flex items-start gap-2 mt-2"
                          >
                            <textarea
                              rows={3}
                              value={desc}
                              onChange={(e) =>
                                handleAddInputChange(e, "description", index)
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 text-right focus:ring-blue-500 resize-none focus:outline-none"
                              disabled={addLoading}
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
                                className="text-red-600 hover:text-red-800 mt-1"
                                disabled={addLoading}
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
                        disabled={addLoading}
                      >
                        <Plus />
                      </button>
                    </div>

                    {/* المميزات */}
                    <div className="md:col-span-2">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
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
                            className="flex items-center gap-2 mt-2"
                          >
                            <textarea
                              rows={3}
                              value={feature}
                              onChange={(e) =>
                                handleAddInputChange(e, "description", index)
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 text-right focus:ring-blue-500 resize-none focus:outline-none"
                              disabled={addLoading}
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
                                className="text-red-600 hover:text-red-800"
                                disabled={addLoading}
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
                        disabled={addLoading}
                      >
                        <Plus />
                      </button>
                    </div>

                    {/* الأزرار */}
                    <div className="md:col-span-2 flex justify-between items-center mt-8">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        disabled={addLoading}
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        disabled={addLoading}
                      >
                        {addLoading ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          "إضافة"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
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
                      disabled={editLoading}
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
                      disabled={editLoading}
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
                      disabled={editLoading}
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
                            disabled={editLoading}
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
                              disabled={editLoading}
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
                      disabled={editLoading}
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
                            disabled={editLoading}
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
                              disabled={editLoading}
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
                      disabled={editLoading}
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2 space-x-reverse mt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200 cursor-pointer"
                      disabled={editLoading}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer flex items-center gap-2"
                      disabled={editLoading}
                    >
                      {editLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        "حفظ التعديلات"
                      )}
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
                <div className="flex justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold mb-6 text-right order-2">
                    تحديث الصورة
                  </h2>
                  {previewImage && (
                    <div className="flex justify-start mb-4 sm:w-50 m:h-50">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-24 h-24 sm:w-full sm:h-full object-cover rounded border border-gray-300"
                      />
                    </div>
                  )}
                </div>
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
                      disabled={imageUploadLoading}
                    />
                  </div>
                  <div className="flex justify-end gap-2 space-x-reverse mt-4">
                    <button
                      type="button"
                      onClick={() => setIsImageModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200 cursor-pointer"
                      disabled={imageUploadLoading}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer flex items-center gap-2"
                      disabled={imageUploadLoading}
                    >
                      {imageUploadLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        "تحديث"
                      )}
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
                            disabled={editLoading}
                          >
                            {editLoading &&
                            currentService?._id === service._id ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <Pencil size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title="حذف الخدمة"
                            disabled={editLoading || deleteLoading}
                          >
                            {deleteLoading &&
                            deletingServiceId === service._id ? (
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
