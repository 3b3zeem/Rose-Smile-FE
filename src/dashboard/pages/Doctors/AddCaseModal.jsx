import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import useDoctorDetails from "../../../hooks/Doctors/useDoctorDetails";

const AddCaseModal = ({ isOpen, onClose, doctor, addCase, deleteCase }) => {
  const { doctor: fullDoctor, loading, refetch } = useDoctorDetails(doctor?._id);

  const [internalLoading, setInternalLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset states when doctor changes
  useEffect(() => {
    setInternalLoading(true);
    setSelectedFile(null);
    setPreviewUrl(null);
  }, [doctor?._id]);

  // Finish loading once correct doctor data is ready
  useEffect(() => {
    if (!loading && fullDoctor && fullDoctor._id === doctor?._id) {
      setInternalLoading(false);
    }
  }, [loading, fullDoctor, doctor?._id]);

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return toast.error("يرجى اختيار صورة أولاً");

    const formData = new FormData();
    formData.append("image", selectedFile);
    setIsSubmitting(true);

    const res = await addCase(doctor._id, formData);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("تمت الإضافة بنجاح");
      setSelectedFile(null);
      setPreviewUrl(null);
      await refetch();
    } else {
      toast.error(res.message || "فشل في الإضافة");
    }
  };

  const handleDeleteCase = async (caseId) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: ".سيتم حذف هذه الحالة نهائيًا",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      const res = await deleteCase(doctor._id, caseId);
      if (res.success) {
        toast.success("تم حذف الحالة");
        await refetch();
      } else {
        toast.error(res.message);
      }
    }
  };

  const openViewer = (index) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const goPrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? fullDoctor.cases.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentImageIndex((prev) =>
      prev === fullDoctor.cases.length - 1 ? 0 : prev + 1
    );
  };

  if (!isOpen) return null;

  if (internalLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" size={24} />
          <span className="text-blue-800 font-medium">
            ...جاري تحميل بيانات حالات الطبيب
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {viewerOpen && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center">
          <button onClick={closeViewer} className="absolute top-4 right-4 text-white cursor-pointer">
            <X size={28} />
          </button>
          <button onClick={goPrev} className="absolute left-4 text-white cursor-pointer">
            <ChevronLeft size={40} />
          </button>
          <img
            src={fullDoctor.cases[currentImageIndex].url}
            alt="Case"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
          <button onClick={goNext} className="absolute right-4 text-white cursor-pointer">
            <ChevronRight size={40} />
          </button>
        </div>
      )}

      <motion.div
        key="Add-Case-Modal"
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
          className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-full max-h-[95vh] overflow-hidden p-8 md:p-10"
          dir="rtl"
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-900 border-b pb-4">
            إدارة الحالات للطبيب: {fullDoctor.name}
          </h2>

          <div className="overflow-y-auto max-h-[500px] mb-10 pr-1">
            {fullDoctor.cases?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {fullDoctor.cases.map((c, i) => (
                  <div key={c._id} className="relative bg-white border border-gray-300 rounded-lg shadow-sm p-2">
                    <img
                      src={c.url}
                      alt={`حالة ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-t cursor-pointer hover:opacity-90 transition"
                      onClick={() => openViewer(i)}
                    />
                    <button
                      onClick={() => handleDeleteCase(c._id)}
                      className="absolute bottom-2 left-2 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded shadow-md transition cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">لا توجد حالات حالياً لهذا الطبيب.</p>
            )}
          </div>

          <div className="bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-5 mb-6 flex flex-col md:flex-row items-center gap-6">

            <label className="cursor-pointer text-blue-700 text-sm">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded shadow border"
                />
              ) : (
                
                <div className="w-28 h-28 flex items-center justify-center bg-white rounded border text-center text-xs ">
                  اختر صورة
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="flex-1 w-full flex flex-col gap-2">
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={18} /> : "تأكيد الإضافة"}
                </button>

                {previewUrl && (
                  <button
                    onClick={handleClearSelection}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded text-sm hover:bg-gray-300 transition cursor-pointer"
                  >
                    مسح الصورة
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t pt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition cursor-pointer "
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddCaseModal;
