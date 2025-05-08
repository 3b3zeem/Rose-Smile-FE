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
      const result = await updateHero({ id: hero._id, data });
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
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col md:flex-row"
        dir="rtl"
      >
        {/* Left Side - Image Preview */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            معاينة الصورة الحالية
          </h3>
          <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-[16/9] w-full">
            {hero.image?.url ? (
              <img
                src={hero.image.url}
                alt={hero.title}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-sm">لا توجد صورة</span>
              </div>
            )}
          </div>
          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>• الصورة الحالية في الشكل الرئيسي للموقع</p>
            <p>• لتغيير الصورة، استخدم زر تحديث الصورة</p>
            <p>• يفضل أن تكون الصورة بأبعاد 16:9 (مثل 1920×1080)</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
            تعديل بيانات الصورة الرئيسية
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right transition-colors"
                  placeholder="أدخل عنوان الصورة الرئيسية"
                  required
                  disabled={editLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange(e, "subtitle")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right transition-colors resize-none"
                  rows="3"
                  placeholder="أدخل وصف الصورة الرئيسية"
                  required
                  disabled={editLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نص الزر
                </label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) => handleInputChange(e, "buttonText")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right transition-colors"
                  placeholder="مثال: اقرأ المزيد"
                  required
                  disabled={editLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابط الزر
                </label>
                <input
                  type="url"
                  value={formData.buttonLink}
                  onChange={(e) => handleInputChange(e, "buttonLink")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right transition-colors"
                  placeholder="https://example.com"
                  required
                  disabled={editLoading}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-6 border-t">
              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-70"
                disabled={editLoading}
              >
                {editLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ التعديلات"
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                disabled={editLoading}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditHeroModal;
