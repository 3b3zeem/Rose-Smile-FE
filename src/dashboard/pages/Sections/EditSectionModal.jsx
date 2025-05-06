import React, { useState, useEffect } from "react";
import { Loader2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const EditSectionModal = ({
  isOpen,
  onClose,
  sections,
  section,
  updatesection,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: [],
    features: [],
  });
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentFeature, setCurrentFeature] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (section) {
      setFormData({
        title: section.title || "",
        subTitle: section.subTitle || "",
        description: section.description?.length > 0 ? section.description : [],
        features: section.features?.length > 0 ? section.features : [],
      });
    }
  }, [section]);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const addDescription = () => {
    if (currentDescription.trim()) {
      setFormData({
        ...formData,
        description: [...formData.description, currentDescription.trim()],
      });
      setCurrentDescription("");
    }
  };

  const addFeature = () => {
    if (currentFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, currentFeature.trim()],
      });
      setCurrentFeature("");
    }
  };

  const handleDescriptionKeyDown = (e) => {
    if (e.key === "Enter" && currentDescription.trim()) {
      e.preventDefault();
      addDescription();
    }
  };

  const handleFeatureKeyDown = (e) => {
    if (e.key === "Enter" && currentFeature.trim()) {
      e.preventDefault();
      addFeature();
    }
  };

  const removeField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const data = {
      title: formData.title,
      subTitle: formData.subTitle,
      description: [
        ...formData.description.filter((desc) => desc.trim() !== ""),
        ...(currentDescription.trim() ? [currentDescription.trim()] : []),
      ],
      features: [
        ...formData.features.filter((feature) => feature.trim() !== ""),
        ...(currentFeature.trim() ? [currentFeature.trim()] : []),
      ],
    };

    try {
      const result = await updatesection(section._id, data);
      if (result.success) {
        toast.success(result.message);
        onClose();
        setCurrentDescription("");
        setCurrentFeature("");
      } else {
        toast.error(result.message || "حدث خطأ أثناء تعديل الخدمة");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء تعديل الخدمة");
    } finally {
      setEditLoading(false);
    }
  };

  if (!isOpen || !section) {
    return null;
  }

  return (
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
        className="bg-white rounded-xl shadow-2xl w-full h-full max-h-screen overflow-auto p-8 md:p-12"
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-6 text-right">
          تعديل  القـســـم
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 text-right">
              العنوان الفرعي
            </label>
            <input
              type="text"
              value={formData.subTitle}
              onChange={(e) => handleInputChange(e, "subTitle")}
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
              value={formData.title}
              onChange={(e) => handleInputChange(e, "title")}
              className="mt-1 block w-full p-2 border border-gray-500 rounded-md focus:outline-none text-right"
              required
              disabled={editLoading}
            />
          </div>
          <div></div>
          <div className="md:col-span-2" dir="rtl">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              الوصف
            </label>
            <div className="flex items-start gap-2">
              <textarea
                rows={3}
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                onKeyDown={handleDescriptionKeyDown}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 text-right focus:ring-blue-500 resize-none focus:outline-none"
                disabled={editLoading}
                placeholder="اكتب الوصف واضغط Enter لإضافته"
              />
            </div>
            <AnimatePresence>
              {formData.description.map((desc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2 mt-2"
                >
                  <span className="w-full p-3 bg-gray-100 rounded-lg text-right">
                    {desc}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeField("description", index)}
                    className="text-red-600 hover:text-red-800 mt-1"
                    disabled={editLoading}
                  >
                    <Minus />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="md:col-span-2" dir="rtl">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              المميزات
            </label>
            <div className="flex items-start gap-2">
              <textarea
                rows={3}
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                onKeyDown={handleFeatureKeyDown}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 text-right focus:ring-blue-500 resize-none focus:outline-none"
                disabled={editLoading}
                placeholder="اكتب ميزة واضغط Enter لإضافتها"
              />
            </div>
            <AnimatePresence>
              {formData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2 mt-2"
                >
                  <span className="w-full p-3 bg-gray-100 rounded-lg text-right">
                    {feature}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeField("features", index)}
                    className="text-red-600 hover:text-red-800 mt-1"
                    disabled={editLoading}
                  >
                    <Minus />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="md:col-span-2 flex justify-end gap-2 space-x-reverse mt-4">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default EditSectionModal;
