import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2, Minus } from "lucide-react";
export default function AddNewsModal({
  isOpen,
  onClose,
  news,
  addNews,
  allServices,
}) {
  const [addLoading, setAddLoading] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = React.useState({
    title: "",
    subTitle: "",
    desc: [],
    image: null,
    serviceId: "",
  });
  const handleInputChange = (e, field) => {

    setFormData({ ...formData, [field]: e.target.value });
  };

  const addDescription = () => {
    if (currentDescription.trim()) {
      setFormData({
        ...formData,
        desc: [...formData.desc, currentDescription.trim()],
      });
      setCurrentDescription("");
    }
  };

  
  const removeField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };


  const handleDescriptionKeyDown = (e) => {
    if (e.key === "Enter" && currentDescription.trim()) {
      e.preventDefault();
      addDescription();
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddLoading(true);

    // Create a FormData object to send the data as multipart/form-data
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subTitle", formData.subTitle);
    data.append("serviceId", formData.serviceId);
    if (formData.image) {
      data.append("image", formData.image);
    }

    formData.desc?.forEach((desc, index) => {
      if (desc) data.append(`desc[${index}]`, desc);
    });
    if (currentDescription.trim()) {
      data.append(`desc[${formData.desc?.length}]`, currentDescription.trim());
    }

    // call the addNews function with the FormData object
    try {
      const result = await addNews(data);

      // return object with success and message that you want to show in the toast

      if (result.success) {
        toast.success(result.message);
        onClose(); //  set the modal to close after successful addition
        setFormData({
          title: "",
          subTitle: "",
          serviceId: "",
          image: null,
          desc: [],
        }); // reset the form data
        setPreviewImage(null);
        setCurrentDescription("");
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة القسم");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ أثناء إضافة القسم");
    } finally {
      setAddLoading(false);
    }
  };

  //is open is a prop that determines whether the modal should be open or closed
  // if isOpen is false, return null to not render the modal
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        key="Add-Service-Modal"
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
          className="bg-white rounded-xl shadow-2xl w-full h-full max-h-screen overflow-auto p-8 md:p-12"
          dir="rtl"
        >
          <h2 className="text-3xl font-bold mb-8 text-right text-gray-800 border-b pb-4">
            إضافة خبر جديد
          </h2>

          <div className="flex flex-col lg:flex-row gap-10">
            <form
              onSubmit={handleSubmit}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
            >

             {/* 1- add title input  */}
              <div className="flex gap-10">
                <div className="w-1/2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right focus:outline-none"
                    required
                    disabled={addLoading}
                  />
                </div>
              </div>

              {/*2- add  image input  */}

              <div className="md:col-span-1 row-span-3 flex justify-center">
                <div
                  className="relative w-100 lg:h-70 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
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
                    disabled={addLoading}
                  />
                </div>
              </div>

              
             {/* 3- add sub title input  */}

              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  العنوان الفرعي
                </label>
                <input
                  type="text"
                  value={formData.subTitle}
                  onChange={(e) => handleInputChange(e, "subTitle")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right focus:outline-none"
                  disabled={addLoading}
                />
              </div>


             {/* 4- add service related select   */}

              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  الخدمة المرتبطة بالخبر
                </label>

                <select
                  value={formData.serviceId}
                  onChange={(e) => handleInputChange(e, "serviceId")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right focus:outline-none"
                  required
                  disabled={addLoading}
                >
                  <option value="">اختر قسمًا</option>
                  {allServices.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

           
             {/* 3- add  desc input  */}

              <div className="" dir="rtl">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  الوصف
                </label>
                <div className="flex items-start gap-2">
                  <textarea
                    rows={3}
                    value={currentDescription}
                    onChange={(e) => setCurrentDescription(e.target.value)}
                    onKeyDown={handleDescriptionKeyDown}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 text-right focus:ring-blue-500 resize-none focus:outline-none"
                    disabled={addLoading}
                    placeholder="اكتب الوصف واضغط Enter لإضافته"
                  />
                </div>
                <AnimatePresence>
                  {formData.desc?.map((desc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-2 mt-2"
                    >
                      <span className="w-full p-3 bg-gray-100 rounded-lg text-right">
                        {desc}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeField("desc", index)}
                        className="text-red-600 hover:text-red-800 mt-1"
                        disabled={addLoading}
                      >
                        <Minus />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="md:col-span-2 flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                  disabled={addLoading}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
                  disabled={addLoading}
                >
                  {addLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "إضافة"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
