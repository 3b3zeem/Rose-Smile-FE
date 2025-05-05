import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2, Minus } from "lucide-react";
import Swal from "sweetalert2";


const EditDoctorModal = ({ isOpen, onClose, doctor, updateDoctor }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    description: [],
  });

  const [editLoading, setEditLoading] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        description: Array.isArray(doctor.description)
          ? doctor.description
          : [doctor.description],
      });
    }
  }, [doctor]);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const addDescription = () => {
    const trimmed = currentDescription.trim();
    if (trimmed.length < 3) {
      toast.error("الوصف يجب أن يحتوي على 3 أحرف على الأقل");
      return;
    }
  
    setFormData((prev) => ({
      ...prev,
      description: [...prev.description, trimmed],
    }));
    setCurrentDescription("");
  };
  

  const handleDescriptionKeyDown = (e) => {
    if (e.key === "Enter" && currentDescription.trim()) {
      e.preventDefault();
      addDescription();
    }
  };

  const removeField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };
  const clearDescriptions = () => {
    setFormData((prev) => ({ ...prev, description: [] }));
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const data = {
      name: formData.name,
      specialization: formData.specialization,
      description: formData.description,
    };
    
    try {
      const result = await updateDoctor(doctor._id, data);
      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message || "حدث خطأ أثناء تعديل الطبيب");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء تعديل الطبيب");
    } finally {
      setEditLoading(false);
    }
  };

  if (!isOpen || !doctor) return null;

  return (
    <motion.div
      key="Edit-Doctor-Modal"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] min-h-[90vh] overflow-y-auto flex flex-col box-border"
        dir="rtl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4 px-8 pt-8">
          تعديل بيانات الطبيب
        </h2>

        <form onSubmit={handleSubmit} className="flex-grow space-y-6 px-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم الطبيب
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right"
              required
              disabled={editLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              التخصص
            </label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => handleInputChange(e, "specialization")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right"
              required
              disabled={editLoading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              الوصف
            </label>

            <textarea
              rows={3}
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              onKeyDown={handleDescriptionKeyDown}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 text-right focus:ring-blue-500 resize-none focus:outline-none"
              disabled={editLoading}
              placeholder="اكتب الوصف واضغط Enter لإضافته"
            />

            {formData.description.length > 0 && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  عدد: {formData.description.length}
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: "هل أنت متأكد؟",
                      text: "سيتم مسح جميع الأوصاف المدخلة.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "نعم، امسح الكل",
                      cancelButtonText: "إلغاء",
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                    });
                
                    if (result.isConfirmed) {
                      clearDescriptions();
                    }
                  }}
                
                  className="text-red-600 hover:text-red-800 font-medium text-sm cursor-pointer transition"
                  disabled={editLoading}
                >
                  مسح الكل
                </button>
              </div>
            )}

            <div className="max-h-[300px] overflow-y-auto space-y-2 mt-2">
              <AnimatePresence>
                {formData.description.map((desc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2"
                  >
                    <span className="w-full p-3 bg-gray-100 rounded-lg text-right break-words whitespace-pre-wrap">
                      {desc}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeField("description", index)}
                      className="text-red-600 hover:text-red-800 mt-1"
                      disabled={editLoading}
                    >
                      <Minus />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
              disabled={editLoading}
            >
              إغلاق
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
              disabled={editLoading}
            >
              {editLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "حفظ التعديلات"
              )}
            </button>
          </div>
        {/* Bottom white space */}
        <div className="h-4"></div>
        </form>

      </motion.div>
    </motion.div>
  );
};

export default EditDoctorModal;
