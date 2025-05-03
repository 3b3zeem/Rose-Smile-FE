import React, { useState } from "react";
import { Loader2, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const AddServiceModal = ({ isOpen, onClose, sections, addService }) => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    sectionId: "",
    image: null,
    description: [],
    features: [],
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentFeature, setCurrentFeature] = useState("");

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

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const removeField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddLoading(true);
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
    if (currentDescription.trim()) {
      data.append(
        `description[${formData.description.length}]`,
        currentDescription.trim()
      );
    }
    formData.features.forEach((feature, index) => {
      if (feature) data.append(`features[${index}]`, feature);
    });
    if (currentFeature.trim()) {
      data.append(
        `features[${formData.features.length}]`,
        currentFeature.trim()
      );
    }

    try {
      const result = await addService(data);
      if (result.success) {
        toast.success(result.message);
        onClose();
        setFormData({
          title: "",
          subTitle: "",
          sectionId: "",
          image: null,
          description: [],
          features: [],
        });
        setPreviewImage(null);
        setCurrentDescription("");
        setCurrentFeature("");
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة الخدمة");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء إضافة الخدمة");
    } finally {
      setAddLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      key="Add-Service-Modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-500 p-4"
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
          <div className="w-full lg:w-1/3 flex justify-center">
            <div
              className="relative w-full h-64 lg:h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
              onClick={() => document.getElementById("imageUpload").click()}
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

          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                العنوان
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange(e, "title")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right focus:outline-none"
                required
                disabled={addLoading}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                العنوان الفرعي
              </label>
              <input
                type="text"
                value={formData.subTitle}
                onChange={(e) => handleInputChange(e, "subTitle")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right focus:outline-none"
                disabled={addLoading}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                القسم
              </label>
              <select
                value={formData.sectionId}
                onChange={(e) => handleInputChange(e, "sectionId")}
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
                  disabled={addLoading}
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
                      disabled={addLoading}
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
                  disabled={addLoading}
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
                      disabled={addLoading}
                    >
                      <Minus />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="md:col-span-2 flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={onClose}
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
  );
};

export default AddServiceModal;
