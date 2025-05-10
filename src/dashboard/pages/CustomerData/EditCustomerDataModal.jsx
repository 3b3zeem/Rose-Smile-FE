import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Loader2, Minus } from 'lucide-react';
import Swal from 'sweetalert2';

const EditCustomerDataModal = ({
  isOpen,
  onClose,
  data,
  updateCustomerData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    comment: '',
    status: '',
  });

  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        phone: data.phone || '',
        city: data.city || '',
        comment: data.comment || '',
        status: data.status || '',
      });
    }
  }, [data]);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const formdata = {
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      comment: formData.comment,
      status: formData.status,
    };

    try {
      const result = await updateCustomerData(data._id, formdata);
      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message || 'حدث خطأ أثناء تعديل معلومات العميل');
      }
    } catch (error) {
      toast.error(error.message || 'حدث خطأ أثناء تعديل معلومات العميل');
    } finally {
      setEditLoading(false);
    }
  };

  if (!isOpen || !data) return null;

  return (
    <motion.div
      key="Edit-Customer-Data-Modal"
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[95vh] min-h-[40vh] overflow-y-auto flex flex-col box-border"
        dir="rtl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4 px-8 pt-8">
          تعديل بيانات العميل
        </h2>

        <form onSubmit={handleSubmit} className="flex-grow space-y-6 px-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم العميل
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right"
              required
              disabled={editLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              هاتف العميل
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleInputChange(e, 'phone')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right"
              required
              disabled={editLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المدينة
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange(e, 'city')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right"
              required
              disabled={editLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعليق
            </label>
            <input
              type="text"
              value={formData.comment}
              onChange={(e) => handleInputChange(e, 'comment')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right"
              disabled={editLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الحالة
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-right"
              value={formData.status}
              onChange={(e) => handleInputChange(e, 'status')}
              disabled={editLoading}
            >
              <option value="pending">pending</option>
              <option value="absent">absent</option>
              <option value="completed">completed</option>
            </select>
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
                'حفظ التعديلات'
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

export default EditCustomerDataModal;
