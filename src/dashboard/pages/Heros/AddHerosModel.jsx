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

  const handleClose = () => {
    setFormData({
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      image: null,
    });
    setPreviewImage(null);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
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
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col md:flex-row"
        dir="rtl"
      >
        {/* Left Side - Image Upload */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            معاينة الصورة
          </h3>
          <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200 aspect-[16/9]">
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {previewImage ? (
                <div className="w-full h-full relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      تغيير الصورة
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <div className="mb-3 text-gray-400">
                    <svg
                      className="mx-auto h-12 w-12"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">اضغط لرفع صورة</p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, GIF حتى 10MB
                  </p>
                </div>
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
          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>• يفضل أن تكون الصورة بأبعاد 16:9 (مثل 1920×1080)</p>
            <p>• الحد الأقصى لحجم الملف: 10MB</p>
            <p>• الصورة ستظهر في الشكل الرئيسي للموقع</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
            إضافة صورة رئيسية جديدة
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
                  disabled={addLoading}
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
                  disabled={addLoading}
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
                  disabled={addLoading}
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
                  disabled={addLoading}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-6 border-t">
              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-70"
                disabled={addLoading}
              >
                {addLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    جاري الإضافة...
                  </>
                ) : (
                  "تأكيد الإضافة"
                )}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                disabled={addLoading}
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

export default AddHeroModal;
