// dashboard/pages/Doctors/AdminDoctors.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Plus,
  Pencil,
  FolderPlus,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import AddDoctorModal from "./AddDoctorModal";
import EditDoctorModal from "./EditDoctorModal";
import UpdateDoctorImageModal from "./UpdateDoctorImageModal";
import AddCaseModal from "./AddCaseModal";
import useDoctorsActions from './../../hooks/Doctors/useDoctorsActions';
const AdminDoctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    doctors,
    total,
    loading,
    page,
    totalPages,
    handlePageChange,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    updateDoctorImage,
    addCaseToDoctor,
    deleteDoctorCase
  } = useDoctorsActions();

  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);


  const handleAddCase = (doctor) => {
    setCurrentDoctor(doctor);
    setIsCaseModalOpen(true);
  };
  

  const handleEditClick = (doctor) => {
    setCurrentDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handleImageClick = (doctor) => {
    setCurrentDoctor(doctor);
    setIsImageModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "!لن تتمكن من التراجع عن هذا",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "!نعم، احذف",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        const response = await deleteDoctor(id);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
      } catch (err) {
        toast.error(err.message || "حدث خطأ أثناء الحذف");
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
        newParams.set("search", newTerm);
        newParams.set("page", "1");
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen overflow-x-auto">
      <div className="overflow-x-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto sm:max-w-md" dir="rtl">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن طبيب..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-right"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto transition cursor-pointer"
          >
            <Plus size={20} />
            إضافة طبيب جديد
          </button>
        </div>

        <AddDoctorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          
          addDoctor={addDoctor}
        />

        <EditDoctorModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
            
          doctor={currentDoctor}
          updateDoctor={updateDoctor}
        />

        <UpdateDoctorImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          doctor={currentDoctor}
          updateDoctorImage={updateDoctorImage}
        />
       <AddCaseModal
          isOpen={isCaseModalOpen}
          onClose={() => setIsCaseModalOpen(false)}
          doctor={currentDoctor} 
          addCase={addCaseToDoctor}
          deleteCase={deleteDoctorCase}
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
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">الصورة</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">الاسم</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">التخصص</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">الوصف</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.length > 0 ? (
                    doctors.map((doc) => (
                      <tr key={doc._id}>
                        <td className="px-4 py-3 text-center">
                          <img
                            src={doc.image.url}
                            alt={doc.name}
                            className="w-10 h-10 rounded-full object-cover mx-auto cursor-pointer"
                            onClick={() => handleImageClick(doc)}
                          />
                        </td>
                        <td className="px-4 py-3 truncate max-w-[150px]">{doc.name}</td>
                        <td className="px-4 py-3 text-gray-600">{doc.specialization}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate" title={Array.isArray(doc.description) ? doc.description.join(", ") : doc.description}>
                          {Array.isArray(doc.description) ? doc.description.join(", ") : doc.description}
                        </td>


                        <td className="px-4 py-3 flex gap-4 justify-center">
                          <button
                            onClick={() => handleEditClick(doc)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer mt-2"
                            title="تعديل"
                            
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleAddCase(doc)}
                            className="text-green-600 hover:text-green-800 cursor-pointer mt-2"
                            title="إدارة الحالات"
                          >
                          <span><FolderPlus size={18} /></span> 
                          </button>

                          <button
                            onClick={() => handleDelete(doc._id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer mt-2"
                            title="حذف"
                            disabled={deletingId === doc._id}
                          >
                            {deletingId === doc._id ? (
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
                      <td colSpan="5" className="py-6 text-center text-sm text-gray-500">
                        لا يوجد أطباء حاليا
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-700">عرض {doctors.length} من {total} طبيب</div>
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

export default AdminDoctors;
