// dashboard/pages/Sheets/AdminCustomerData.jsx
import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Pencil,
  MessageSquareDiff,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import EditCustomerDataModal from './EditCustomerDataModal';
import AddCommentModal from './AddCommentModal';
import useCustomerDataActions from '../../hooks/CustomerData/useCustomerDataActions';
const AdminCustomerData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    customerData,
    total,
    loading,
    page,
    totalPages,
    handlePageChange,
    addComment,
    updateCustomerData,
    deleteCustomerData,
  } = useCustomerDataActions();

  const initialSearchTerm = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);
  const [currentCustomerData, setCurrentCustomerData] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleEditClick = (data) => {
    setCurrentCustomerData(data);
    setIsEditModalOpen(true);
  };

  const handleAddCommentClick = (data) => {
    setCurrentCustomerData(data);
    setIsAddCommentModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: '!لن تتمكن من التراجع عن هذا',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '!نعم، احذف',
      cancelButtonText: 'إلغاء',
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        const response = await deleteCustomerData(id);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
      } catch (err) {
        toast.error(err.message || 'حدث خطأ أثناء الحذف');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleSearch = (newTerm) => {
    setSearchTerm(newTerm);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newTerm) {
        newParams.set('search', newTerm);
        newParams.set('page', '1');
      } else {
        newParams.delete('search');
      }
      return newParams;
    });
  };

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen overflow-x-auto">
      <div className="overflow-x-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto sm:max-w-md" dir="rtl">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن عميل..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-right"
            />
          </div>
        </div>

        <EditCustomerDataModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={currentCustomerData}
          updateCustomerData={updateCustomerData}
        />

        <AddCommentModal
          isOpen={isAddCommentModalOpen}
          onClose={() => setIsAddCommentModalOpen(false)}
          data={currentCustomerData}
          addComment={addComment}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          <React.Fragment>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      اسم العميل
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      رقم هاتف العميل
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      المدينة
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      القسم
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      الخدمة
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      الحالة
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      تعليق
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      تم التعديل بواسطة
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      اخر تحديث
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerData.length > 0 ? (
                    customerData.map((data) => (
                      <tr key={data._id}>
                        <td className="px-4 py-3 text-center">{data.name}</td>
                        <td className="px-4 py-3 text-center">{data.phone}</td>
                        <td className="px-4 py-3 text-center">{data.city}</td>
                        <td className="px-4 py-3 text-center">
                          {data?.section?.title}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {data?.service?.title}
                        </td>
                        <td className="px-4 py-3 text-center">{data.status}</td>
                        <td className="px-4 py-3 text-center">
                          {data.comment ? `${data.comment}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {data.editedBy
                            ? `${data.editedBy?.firstName} ${data.editedBy?.lastName}`
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {new Date(data.updatedAt).toLocaleString('ar-Ar', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        <td className="px-4 py-3 flex flex-row gap-4 justify-center items-center">
                          <button
                            onClick={() => handleAddCommentClick(data)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer mt-2"
                            title="اضافة تعليق"
                          >
                            <MessageSquareDiff size={16} />
                          </button>

                          <button
                            onClick={() => handleEditClick(data)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer mt-2"
                            title="تعديل"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(data._id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer mt-2"
                            title="حذف"
                            disabled={deletingId === data._id}
                          >
                            {deletingId === data._id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-6 text-center text-sm text-gray-500"
                      >
                        لا يوجد بيانات عملاء حاليا
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-700">
                عرض {customerData.length} من {total} عميل
              </div>
              <div className="flex items-center gap-2 space-x-reverse">
                <span className="text-sm text-gray-700">
                  صفحة {page} من {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default AdminCustomerData;
