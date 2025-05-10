import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2, Minus } from "lucide-react";
import Swal from "sweetalert2";

const AddSheetModal = ({ isOpen, onClose, addSheet }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [addLoading, setAddLoading] = useState(false);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
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
      toast.error("يرجى اختيار صورة الفورم");
      return;
    }

    setAddLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("url", formData.url);
    data.append("image", formData.image);

    try {
      const result = await addSheet(data);
      if (result.success) {
        toast.success(result.message);
        onClose();
        setFormData({
          title: "",
          url: "",
          image: null,
        });
        setPreviewImage(null);
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة الفورم");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء إضافة الفورم");
    } finally {
      setAddLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      key="Add-Sheet-Modal"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl min-h-[60vh] max-h-[65vh] overflow-y-auto p-8 md:p-10"
        dir="rtl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
          إضافة فورم جديد
        </h2>

        <form onSubmit={handleSubmit}>
          {/* TOP GRID: Title + Url */}
          <div className="flex items-center justify-between my-10">
            <div className="flex flex-col w-1/2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم الفورم
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right mt-2 transition-all duration-200"
                  required
                  disabled={addLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-11">
                  عنوان الفورم المميز
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => handleInputChange(e, "url")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right mt-2 transition-all duration-200"
                  required
                  disabled={addLoading}
                />
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center items-start">
              <div
                className="relative h-50 w-90 border-2 border-dashed border-gray-300 hover:bg-gray-100 overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
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
                  id="imageUpload"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                  disabled={addLoading}
                />
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
              disabled={addLoading}
            >
              إغلاق
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: "",
                  url: "",
                  image: null,
                });
                setPreviewImage(null);
              }}
              className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition cursor-pointer"
              disabled={addLoading}
            >
              إعادة ضبط
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
              disabled={addLoading}
            >
              {addLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "تاكيد الإضافة"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddSheetModal;
