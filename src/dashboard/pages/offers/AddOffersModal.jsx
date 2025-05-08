import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import useAdminServices from "../../hooks/Services/useAdminService";
import useSections from "../../hooks/Sections/useSections";

const AddOffersModal = ({ isOpen, onClose, addOffer }) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    display: false,
    type: "service",
    reference: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const { services, loading: servicesLoading } = useAdminServices();
  const { sections, loading: sectionsLoading } = useSections();

  useEffect(() => {
    if (isOpen) {
      if (formData.type === "service") {
        // Services will be fetched automatically by useAdminServices
      } else if (formData.type === "section") {
        // Sections will be fetched automatically by useSections
      }
    }
  }, [isOpen, formData.type]);

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
        {/* Left Side - Image Upload */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            معاينة صورة العرض
          </h3>
          <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200 aspect-[16/9]">
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {previewImage ? (
                <div className="w-full h-full relative group">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
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
            <p>• الصورة ستظهر في بطاقة العرض</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
            إضافة عرض جديد
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المرجع
                </label>
                {formData.type === "service" ? (
                  <select
                    value={formData.reference}
                    onChange={(e) => handleInputChange(e, "reference")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    required
                    disabled={addLoading || servicesLoading}
                  >
                    <option value="">اختر الخدمة</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={formData.reference}
                    onChange={(e) => handleInputChange(e, "reference")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    required
                    disabled={addLoading || sectionsLoading}
                  >
                    <option value="">اختر القسم</option>
                    {sections.map((section) => (
                      <option key={section._id} value={section._id}>
                        {section.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <span className="mr-2 text-sm text-gray-600">
                    تفعيل العرض
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 border-t">
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddOffersModal;
