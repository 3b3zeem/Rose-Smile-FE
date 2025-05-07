import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const EditHeroModal = ({ isOpen, onClose, hero, updateHero }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });

  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (hero) {
      setFormData({
        title: hero.title || "",
        subtitle: hero.subtitle || "",
        buttonText: hero.buttonText || "",
        buttonLink: hero.buttonLink || "",
      });
    }
  }, [hero]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const data = {
      title: formData.title,
      subtitle: formData.subtitle,
      buttonText: formData.buttonText,
      buttonLink: formData.buttonLink,
    };

    try {
      const result = await updateHero(hero._id, data);
      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message || "حدث خطأ أثناء تعديل الصورة الرئيسية");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء تعديل الصورة الرئيسية");
    } finally {
      setEditLoading(false);
    }
  };

  if (!isOpen || !hero) return null;

  return (
    <motion.div
      key="Edit-Hero-Modal"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto p-8 md:p-10"
        dir="rtl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
          تعديل بيانات الصورة الرئيسية
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                disabled={editLoading}
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
                disabled={editLoading}
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
                disabled={editLoading}
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
                disabled={editLoading}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              disabled={editLoading}
            >
              إغلاق
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
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

export default EditHeroModal;
