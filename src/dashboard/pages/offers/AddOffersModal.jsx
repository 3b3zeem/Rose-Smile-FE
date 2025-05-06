import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useServiceTitles } from "../../../hooks/Services/useServices.jsx";

const AddOffersModal = ({ isOpen, onClose, addOffer }) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    display: false,
    type: "service",
    reference: "",
    image: null,
  });

  const { services } = useServiceTitles();

  const [previewImage, setPreviewImage] = useState(null);
  const [addLoading, setAddLoading] = useState(false);

  const handleInputChange = (e, field) => {
    const value = field === "display" ? e.target.checked : e.target.value;
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
      toast.error("يرجى اختيار صورة العرض");
      return;
    }

    setAddLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    data.append("display", formData.display);
    data.append("type", formData.type);
    data.append("reference", formData.reference);
    data.append("image", formData.image);

    try {
      const result = await addOffer(data);
      if (result.success) {
        toast.success(result.message);
        onClose();
        setFormData({
          title: "",
          desc: "",
          display: false,
          type: "service",
          reference: "",
          image: null,
        });
        setPreviewImage(null);
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة العرض");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء إضافة العرض");
    } finally {
      setAddLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      key="Add-Offer-Modal"
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
          إضافة عرض جديد
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة العرض
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
                عنوان العرض
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
                value={formData.desc}
                onChange={(e) => handleInputChange(e, "desc")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                required
                disabled={addLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                النوع
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange(e, "type")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                required
                disabled={addLoading}
              >
                <option value="service">خدمة</option>
                <option value="section">قسم</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المرجع
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => handleInputChange(e, "reference")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                required
                disabled={addLoading}
                placeholder="أدخل معرف الخدمة أو القسم"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                متاح للعرض
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.display}
                  onChange={(e) => handleInputChange(e, "display")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={addLoading}
                />
                <span className="mr-2 text-sm text-gray-600">تفعيل العرض</span>
              </div>
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

export default AddOffersModal;
