import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const EditOfferModal = ({ isOpen, onClose, offer, updateOffer }) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    display: false,
    type: "service",
    reference: "",
  });

  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || "",
        desc: offer.desc || "",
        display: offer.display || false,
        type: offer.type || "service",
        reference: offer.reference || "",
      });
    }
  }, [offer]);

  const handleInputChange = (e, field) => {
    const value = field === "display" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const data = {
      title: formData.title,
      desc: formData.desc,
      display: formData.display,
      type: formData.type,
      reference: formData.reference,
    };

    try {
      const result = await updateOffer(offer._id, data);
      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message || "حدث خطأ أثناء تعديل العرض");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء تعديل العرض");
    } finally {
      setEditLoading(false);
    }
  };

  if (!isOpen || !offer) return null;

  return (
    <motion.div
      key="Edit-Offer-Modal"
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
          تعديل بيانات العرض
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                disabled={editLoading}
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
                disabled={editLoading}
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
                disabled={editLoading}
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
                disabled={editLoading}
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
                  disabled={editLoading}
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

export default EditOfferModal;
