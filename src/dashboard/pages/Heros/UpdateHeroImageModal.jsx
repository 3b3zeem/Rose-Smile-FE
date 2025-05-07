import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const UpdateHeroImageModal = ({ isOpen, onClose, hero, updateHeroImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  }, [isOpen]);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("يرجى اختيار صورة للتحديث");
      return;
    }
    setImageUploadLoading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const result = await updateHeroImage(hero._id, formData);
      if (result.success) {
        toast.success(result.message);
        handleClose();
      } else {
        toast.error(result.message || "فشل تحديث الصورة الرئيسية");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء تحديث الصورة");
    } finally {
      setImageUploadLoading(false);
    }
  };

  if (!isOpen || !hero) return null;

  return (
    <motion.div
      key="Update-Hero-Image-Modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-8"
        dir="rtl"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-right border-b pb-3">
          تحديث الصورة الرئيسية
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-8">
            <div
              className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
              onClick={() => document.getElementById("heroImageUpload").click()}
            >
              {previewImage || hero.image?.url ? (
                <img
                  src={previewImage || hero.image?.url}
                  alt="Preview"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <span className="flex items-center justify-center h-full text-gray-400 text-sm text-center px-2">
                  اضغط لرفع صورة
                </span>
              )}
              <input
                type="file"
                id="heroImageUpload"
                onChange={handleImageFileChange}
                className="hidden"
                accept="image/*"
                disabled={imageUploadLoading}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
              disabled={imageUploadLoading}
            >
              اغلاق
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
              disabled={imageUploadLoading}
            >
              {imageUploadLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "تحديث الصورة"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateHeroImageModal;
