import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const AddHeroModal = ({ isOpen, onClose, addHero }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [addLoading, setAddLoading] = useState(false);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("يرجى اختيار صورة");
      return;
    }

    setAddLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("buttonText", formData.buttonText);
    data.append("buttonLink", formData.buttonLink);
    data.append("image", formData.image);

    try {
      const result = await addHero(data);
      if (result.success) {
        toast.success(result.message);
        onClose();
        setFormData({
          title: "",
          subtitle: "",
          buttonText: "",
          buttonLink: "",
          image: null,
        });
        setPreviewImage(null);
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة الصورة الرئيسية");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء إضافة الصورة الرئيسية");
    } finally {
      setAddLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      key="Add-Hero-Modal"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-full max-h-[95vh] overflow-y-auto p-8 md:p-10"
        dir="rtl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
          إضافة صورة رئيسية جديدة
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الصورة
            </label>
            <div
              className="relative w-40 h-60 bg-gray-100 overflow-hidden rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition duration-200"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex items-center justify-center h-full text-gray-400 text-sm text-center px-2">
                  اضغط لرفع صورة
                </span>
              )}
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                disabled={addLoading}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange(e, "title")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                required
                disabled={addLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوصف
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => handleInputChange(e, "subtitle")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                required
                disabled={addLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نص الزر
              </label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => handleInputChange(e, "buttonText")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                required
                disabled={addLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط الزر
              </label>
              <input
                type="url"
                value={formData.buttonLink}
                onChange={(e) => handleInputChange(e, "buttonLink")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                required
                disabled={addLoading}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              disabled={addLoading}
            >
              إغلاق
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              disabled={addLoading}
            >
              {addLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "تأكيد الإضافة"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddHeroModal;
