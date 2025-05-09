// dashboard/pages/Sheets/AdminSheets.jsx
import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Plus,
  Pencil,
  Link,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import AddSheetModal from './AddSheetModal';
import EditSheetModal from './EditSheetModal';
import UpdateSheetImageModal from './UpdateSheetImageModal';
import useSheetsActions from '../../hooks/Sheets/useSheetsActions';
const AdminSheets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    sheets,
    total,
    loading,
    page,
    totalPages,
    handlePageChange,
    addSheet,
    updateSheet,
    deleteSheet,
    updateSheetImage,
  } = useSheetsActions();

  const initialSearchTerm = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentSheet, setCurrentSheet] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleEditClick = (sheet) => {
    setCurrentSheet(sheet);
    setIsEditModalOpen(true);
  };

  const handleImageClick = (sheet) => {
    setCurrentSheet(sheet);
    setIsImageModalOpen(true);
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
        const response = await deleteSheet(id);
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
              placeholder="ابحث عن فورم..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-right"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto transition cursor-pointer"
          >
            <Plus size={20} />
            إضافة فورم جديدة
          </button>
        </div>

        <AddSheetModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          addSheet={addSheet}
        />

        <EditSheetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          sheet={currentSheet}
          updateSheet={updateSheet}
        />

        <UpdateSheetImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          sheet={currentSheet}
          updateSheetImage={updateSheetImage}
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
                      صورة الفورم
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      اسم الفورم
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      لينك الفورم
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      عنوان الفورم المميز
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sheets.length > 0 ? (
                    sheets.map((sheet) => (
                      <tr key={sheet._id}>
                        <td className="px-4 py-3 text-center">
                          <img
                            src={sheet.image.url}
                            alt={sheet.title}
                            className="w-10 h-10 rounded-full object-cover mx-auto cursor-pointer"
                            onClick={() => handleImageClick(sheet)}
                          />
                        </td>
                        <td className="px-4 py-3 truncate max-w-[150px] text-center">
                          {sheet.title}
                        </td>
                        <td className="px-4 py-3 text-gray-600 flex gap-2 justify-center">
                          <a
                            href={sheet.sheet_weblink}
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            {sheet.sheet_id}
                            <Link size={16} />
                          </a>
                        </td>
                        <td
                          className="px-4 py-3 text-gray-600 max-w-xs truncate text-center"
                          title={sheet.url}
                        >
                          {sheet.url}
                        </td>

                        <td className="px-4 py-3 flex gap-4 justify-center">
                          <button
                            onClick={() => handleEditClick(sheet)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer mt-2"
                            title="تعديل"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(sheet._id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer mt-2"
                            title="حذف"
                            disabled={deletingId === sheet._id}
                          >
                            {deletingId === sheet._id ? (
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
                        لا يوجد فورمات حاليا
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-700">
                عرض {sheets.length} من {total} فورم
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

export default AdminSheets;
