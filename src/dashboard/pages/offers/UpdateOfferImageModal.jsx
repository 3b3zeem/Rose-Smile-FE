import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const UpdateOfferImageModal = ({
  isOpen,
  onClose,
  offer,
  updateOfferImage,
}) => {
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
      const result = await updateOfferImage({ id: offer._id, formData });
      if (result.success) {
        toast.success(result.message);
        handleClose();
      } else {
        toast.error(result.message || "فشل تحديث صورة العرض");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء تحديث الصورة");
    } finally {
      setImageUploadLoading(false);
    }
  };
  if (!isOpen || !offer) return null;
  return (
    <motion.div
      key="Update-Offer-Image-Modal"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-0 overflow-hidden flex flex-col items-center justify-center"
        dir="rtl"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center border-b pb-3 w-full">
          تحديث صورة العرض
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-center w-full px-6">
            <div
              className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200 aspect-[16/9] w-full max-w-lg mx-auto cursor-pointer group"
              onClick={() =>
                document.getElementById("offerImageUpload").click()
              }
            >
              {previewImage || offer.image?.cardImage ? (
                <div className="w-full h-full relative group">
                  <img
                    src={previewImage || offer.image?.cardImage}
                    alt={offer.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
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
                id="offerImageUpload"
                onChange={handleImageFileChange}
                className="hidden"
                accept="image/*"
                disabled={imageUploadLoading}
              />
            </div>
            <div className="mt-4 text-sm text-gray-500 space-y-1 text-center w-full">
              <p>• يفضل أن تكون الصورة بأبعاد 16:9 (مثل 1920×1080)</p>
              <p>• الحد الأقصى لحجم الملف: 10MB</p>
              <p>• الصورة ستظهر في بطاقة العرض</p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 w-full px-6 pb-6 pt-2 border-t mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              disabled={imageUploadLoading}
            >
              اغلاق
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 font-medium disabled:opacity-70"
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

export default UpdateOfferImageModal;
