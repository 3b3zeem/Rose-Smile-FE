import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2, Minus } from "lucide-react";
import Swal from "sweetalert2";

const AddDoctorModal = ({ isOpen, onClose, addDoctor }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    description: [],
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

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
  const addDescription = () => {
    const trimmed = currentDescription.trim();
    if (trimmed.length >= 3) {
      setFormData((prev) => ({
        ...prev,
        description: [...prev.description, trimmed],
      }));
      setCurrentDescription("");
    } else {
      toast.error("الوصف يجب أن يكون 3 أحرف على الأقل");
    }
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("يرجى اختيار صورة الطبيب");
      return;
    }

    setAddLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("specialization", formData.specialization);
    formData.description.forEach((desc, index) => {
      data.append(`description[${index}]`, desc);
    });
        data.append("image", formData.image);

    try {
      const result = await addDoctor(data);
      if (result.success) {
        toast.success(result.message);
        onClose();
        setFormData({
          name: "",
          specialization: "",
          description: [],
          image: null,
        });
        setPreviewImage(null);
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة الطبيب");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء إضافة الطبيب");
    } finally {
      setAddLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      key="Add-Doctor-Modal"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-full max-h-[95vh] overflow-y-auto p-8 md:p-10"
        dir="rtl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
          إضافة طبيب جديد
        </h2>
  
        <form onSubmit={handleSubmit} className="space-y-6">
  {/* TOP GRID: Name + Specialization + Image */}
  <div className="grid md:grid-cols-3 gap-6">
    <div className="md:col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-1 mt-11">اسم الطبيب</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => handleInputChange(e, "name")}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right mt-2 "
        required
        disabled={addLoading}
      />
    </div>

    <div className="md:col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-1 mt-11">التخصص</label>
      <input
        type="text"
        value={formData.specialization}
        onChange={(e) => handleInputChange(e, "specialization")}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right mt-2 "
        required
        disabled={addLoading}
      />
    </div>

    <div className="flex justify-center items-start mt-4">
      <div
        className="relative aspect-[3/4] w-48 bg-gray-100 overflow-hidden rounded-xl shadow-md cursor-pointer hover:opacity-90 transition"
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

  {/* DESCRIPTION: FULL WIDTH */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
    <textarea
      rows={3}
      value={currentDescription}
      onChange={(e) => setCurrentDescription(e.target.value)}
      onKeyDown={handleDescriptionKeyDown}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 text-right focus:ring-blue-500 resize-none focus:outline-none"
      disabled={addLoading}
      placeholder="اكتب الوصف واضغط Enter لإضافته"
    />
    {formData.description.length > 0 && (
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">عدد: {formData.description.length}</span>
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
              setFormData((prev) => ({ ...prev, description: [] }));
            }
          }}
          className="text-red-600 hover:text-red-800 font-medium text-sm transition cursor-pointer"
          disabled={addLoading}
        >
          مسح الكل
        </button>
      </div>
    )}

    <div className="max-h-[200px] overflow-y-auto space-y-2 mt-2">
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
              disabled={addLoading}
            >
              <Minus />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
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
          name: "",
          specialization: "",
          description: [],
          image: null,
        });
        setPreviewImage(null);
        setCurrentDescription("");
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
      {addLoading ? <Loader2 className="animate-spin" size={20} /> : "تاكيد الإضافة"}
    </button>
  </div>
</form>

      </motion.div>
    </motion.div>
  );
  
};

export default AddDoctorModal;
