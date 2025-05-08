// dashboard/pages/offers/AdminOffers.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Plus,
  Pencil,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import AddOffersModal from "./AddOffersModal";
import EditOfferModal from "./EditOfferModal";
import useOffersActions from "../../hooks/offers/useOfferssActions";
import UpdateOfferImageModal from "./UpdateOfferImageModal";

const AdminOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    offers,
    total,
    loading,
    page,
    totalPages,
    handlePageChange,
    addOffer,
    updateOffer,
    deleteOffer,
    updateOfferImage,
  } = useOffersActions();

  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleEditClick = (offer) => {
    setSelectedOffer(offer);
    setIsEditModalOpen(true);
    setIsImageModalOpen(false);
  };

  const handleImageClick = (offer) => {
    setSelectedOffer(offer);
    setIsImageModalOpen(true);
    setIsEditModalOpen(false);
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
        const response = await deleteOffer(id);
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
      <Toaster
        position="top-center"
        toastOptions={{
          className: "z-[99999]",
          style: {
            zIndex: 99999,
          },
        }}
      />
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
              placeholder="ابحث عن عرض..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-right"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto transition cursor-pointer"
          >
            <Plus size={20} />
            إضافة عرض جديد
          </button>
        </div>

        <AddOffersModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          addOffer={addOffer}
        />

        {/* Update Image Modal */}
        {selectedOffer && (
          <UpdateOfferImageModal
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            offer={selectedOffer}
            updateOfferImage={updateOfferImage}
          />
        )}

        {/* Edit Modal */}
        {selectedOffer && (
          <EditOfferModal
            isOpen={isEditModalOpen}
            onClose={() => setSelectedOffer(null)}
            offer={selectedOffer}
            updateOffer={updateOffer}
          />
        )}

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
                      الصورة
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      تفاصيل العرض
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      تاريخ الإنشاء
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      متاح للعرض
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {offers.length > 0 ? (
                    offers.map((offer) => (
                      <tr key={offer._id}>
                        <td className="px-4 py-3 text-center">
                          <div
                            className="relative aspect-square w-16 mx-auto bg-gray-100 overflow-hidden rounded-lg shadow-md cursor-pointer hover:opacity-90 transition"
                            onClick={() => setSelectedOffer(offer)}
                          >
                            <img
                              src={
                                offer.image?.thumbnailMedium ||
                                "/placeholder.png"
                              }
                              alt={offer.title}
                              className="w-full h-full object-cover"
                              onClick={() => handleImageClick(offer)}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="max-w-xl">
                            <h3 className="text-sm font-medium text-gray-900 mb-1">
                              {offer.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {offer.desc}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-xs text-gray-500 w-32">
                          {new Date(offer.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              offer.display
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {offer.display ? "متاح" : "غير متاح"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleEditClick(offer)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="تعديل"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(offer._id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="حذف"
                              disabled={deletingId === offer._id}
                            >
                              {deletingId === offer._id ? (
                                <Loader2 size={18} className="animate-spin" />
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        لا توجد عروض متاحة
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-700">
                عرض {offers.length} من {total} عرض
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

export default AdminOffers;
