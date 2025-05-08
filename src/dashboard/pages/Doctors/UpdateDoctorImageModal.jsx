import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const UpdateDoctorImageModal = ({ isOpen, onClose, doctor, updateDoctorImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  }, [isOpen]);

// Close modal with Ctrl + Shift + X
  useEffect(() => {
    const handleModalCloseKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
        onClose();
      }
    };
  
    window.addEventListener("keydown", handleModalCloseKey);
    return () => {
      window.removeEventListener("keydown", handleModalCloseKey);
    };
  }, []);
  

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
      const result = await updateDoctorImage(doctor._id, formData);
      if (result.success) {
        toast.success(result.message);
        handleClose();
      } else {
        toast.error(result.message || "فشل تحديث صورة الطبيب");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء تحديث الصورة");
    } finally {
      setImageUploadLoading(false);
    }
  };
  if (!isOpen || !doctor) return null;
  return (
    <motion.div
      key="Update-Doctor-Image-Modal"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-8"
        dir="rtl"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-right border-b pb-3">
          تحديث صورة الطبيب
        </h2>

        <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-8">
            <div
            className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200 aspect-[3/4] w-full max-w-xs cursor-pointer group"
            onClick={() => document.getElementById("doctorImageUpload").click()}
          >
            {previewImage || doctor.image?.url ? (
              <div className="w-full h-full relative group">
                <img
                  src={previewImage || doctor.image?.url}
                  alt="Preview"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">تغيير الصورة</span>
                </div>
              </div>
            ) : (
              <div className="text-center p-6">
                <div className="mb-3 text-gray-400">
                  <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

              </div>
            )}
            <input
              type="file"
              id="doctorImageUpload"
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
            title="يمكنك أيضًا الإغلاق باستخدام Ctrl + Shift + X"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
            disabled={imageUploadLoading}
          >
            إغلاق
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

export default UpdateDoctorImageModal;
