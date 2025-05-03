import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const ImageUpdateModal = ({ isOpen, onClose, service, updateServiceImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedImage(file);
    }
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
      const result = await updateServiceImage(service._id, formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      onClose();
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setImageUploadLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
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
        <form onSubmit={handleSubmit}>
          <div className="w-full flex justify-center">
            <div
              className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
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
                disabled={imageUploadLoading}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 space-x-reverse mt-4">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default ImageUpdateModal;
