import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  Pencil,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import useUsersActions from "./../../hooks/User/useUsersActions";
import EditUserModal from "./EditUserModal";

const AdminUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    users,
    total,
    loading,
    page,
    totalPages,
    handlePageChange,
    deleteUser,
    editUser,
  } = useUsersActions();

  const initialSearchTerm = searchParams.get("search") || "";
  const initialRoleFilter = searchParams.get("role") || "";
  const initialBlockedFilter = searchParams.get("blocked") || "";
  const initialConfirmedFilter = searchParams.get("confirmed") || "";
  const initialSort = searchParams.get("sort") || "email:asc";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [roleFilter, setRoleFilter] = useState(initialRoleFilter);
  const [blockedFilter, setBlockedFilter] = useState(initialBlockedFilter);
  const [confirmedFilter, setConfirmedFilter] = useState(
    initialConfirmedFilter
  );
  const [sortField, setSortField] = useState(initialSort.split(":")[0]);
  const [sortDirection, setSortDirection] = useState(initialSort.split(":")[1]);
  const [deletingId, setDeletingId] = useState(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isBlockedDropdownOpen, setIsBlockedDropdownOpen] = useState(false);
  const [isConfirmedDropdownOpen, setIsConfirmedDropdownOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [emailInput, setEmailInput] = useState("");

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setEmailInput("");
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!currentUser) return;

    if (emailInput == "") {
      toast.error(".يرجي ادخال البريد الالكتروني المراد حذفه");
      return;
    }

    if (emailInput !== currentUser.email) {
      toast.error("البريد الإلكتروني غير متطابق، يرجى التأكد من الإدخال.");
      return;
    }

    setIsDeleteModalOpen(false);

    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذف!",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      setDeletingId(currentUser._id);
      try {
        const response = await deleteUser(currentUser._id);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
      } catch (err) {
        toast.error(err.message || "حدث خطأ أثناء الحذف");
      } finally {
        setDeletingId(null);
        setCurrentUser(null);
      }
    }
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const handleSearchAndFilters = (
    newSearch,
    newRole,
    newBlocked,
    newConfirmed,
    newSort
  ) => {
    setSearchTerm(newSearch);
    setRoleFilter(newRole);
    setBlockedFilter(newBlocked);
    setConfirmedFilter(newConfirmed);
    const [field, direction] = newSort.split(":");
    setSortField(field);
    setSortDirection(direction);

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newSearch) newParams.set("search", newSearch);
      else newParams.delete("search");

      if (newRole) newParams.set("role", newRole);
      else newParams.delete("role");

      if (newBlocked) newParams.set("isBlocked", newBlocked);
      else newParams.delete("isBlocked");

      if (newConfirmed) newParams.set("isConfirmed", newConfirmed);
      else newParams.delete("isConfirmed");

      newParams.set("sort", newSort);

      return newParams;
    });
  };

  const toggleSort = (field) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    handleSearchAndFilters(
      searchTerm,
      roleFilter,
      blockedFilter,
      confirmedFilter,
      `${field}:${newDirection}`
    );
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setRoleFilter(searchParams.get("role") || "");
    setBlockedFilter(searchParams.get("isBlocked") || "");
    setConfirmedFilter(searchParams.get("isConfirmed") || "");
    const [field, direction] = (searchParams.get("sort") || "email:asc").split(
      ":"
    );
    setSortField(field);
    setSortDirection(direction);
  }, [searchParams]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen overflow-x-auto">
      <div className="overflow-x-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Filters */}
          <div className="flex flex-col justify-between sm:flex-row gap-4 w-full">
            <div className="relative w-full sm:w-64 flex items-center">
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  handleSearchAndFilters(
                    e.target.value,
                    roleFilter,
                    blockedFilter,
                    confirmedFilter
                  )
                }
                placeholder="ابحث عن مستخدم..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-right"
              />
            </div>

            <div className="flex gap-5 items-center">
              <div className="relative">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="w-full sm:w-32 px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none text-right bg-white cursor-pointer"
                >
                  {roleFilter || "الدور"}
                </button>
                <AnimatePresence>
                  {isRoleDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg text-right"
                    >
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            "",
                            blockedFilter,
                            confirmedFilter
                          );
                          setIsRoleDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        الكل
                      </button>
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            "user",
                            blockedFilter,
                            confirmedFilter
                          );
                          setIsRoleDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        user
                      </button>
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            "admin",
                            blockedFilter,
                            confirmedFilter
                          );
                          setIsRoleDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        admin
                      </button>
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            "superadmin",
                            blockedFilter,
                            confirmedFilter
                          );
                          setIsRoleDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        superadmin
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setIsBlockedDropdownOpen(!isBlockedDropdownOpen)
                  }
                  className="w-full sm:w-32 px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none text-right bg-white cursor-pointer"
                >
                  {blockedFilter === "yes"
                    ? "محظور"
                    : blockedFilter === "no"
                    ? "غير محظور"
                    : "الحظر"}
                </button>
                <AnimatePresence>
                  {isBlockedDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg text-right"
                    >
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            roleFilter,
                            "",
                            confirmedFilter
                          );
                          setIsBlockedDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        الكل
                      </button>
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            roleFilter,
                            "yes",
                            confirmedFilter
                          );
                          setIsBlockedDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        نعم
                      </button>
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            roleFilter,
                            "no",
                            confirmedFilter
                          );
                          setIsBlockedDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        لا
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setIsConfirmedDropdownOpen(!isConfirmedDropdownOpen)
                  }
                  className="w-full sm:w-32 px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none text-right bg-white cursor-pointer"
                >
                  {confirmedFilter === "yes"
                    ? "مؤكد"
                    : confirmedFilter === "no"
                    ? "غير مؤكد"
                    : "التأكيد"}
                </button>
                <AnimatePresence>
                  {isConfirmedDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg text-right"
                    >
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            roleFilter,
                            blockedFilter,
                            ""
                          );
                          setIsConfirmedDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        الكل
                      </button>
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            roleFilter,
                            blockedFilter,
                            "yes"
                          );
                          setIsConfirmedDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        نعم
                      </button>
                      <button
                        onClick={() => {
                          handleSearchAndFilters(
                            searchTerm,
                            roleFilter,
                            blockedFilter,
                            "no"
                          );
                          setIsConfirmedDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      >
                        لا
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

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
                    <th
                      className="text-center px-4 py-3 text-xs font-medium text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-200"
                      onClick={() => toggleSort("firstName")}
                    >
                      <div className="flex items-center justify-center gap-2">
                        الاسم
                        {sortField === "firstName" &&
                        sortDirection === "asc" ? (
                          <ArrowUp size={16} className="text-blue-500" />
                        ) : sortField === "firstName" &&
                          sortDirection === "desc" ? (
                          <ArrowDown size={16} className="text-blue-500" />
                        ) : (
                          <ArrowDown size={16} className="text-gray-500" />
                        )}
                      </div>
                    </th>
                    <th
                      className="text-center px-4 py-3 text-xs font-medium text-gray-500 cursor-pointer"
                      onClick={() => toggleSort("email")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        البريد الإلكتروني
                        {sortField === "email" && sortDirection === "asc" ? (
                          <ArrowUp size={16} className="text-blue-500" />
                        ) : sortField === "email" &&
                          sortDirection === "desc" ? (
                          <ArrowDown size={16} className="text-blue-500" />
                        ) : (
                          <ArrowDown size={16} className="text-gray-500" />
                        )}
                      </div>
                    </th>
                    <th
                      className="text-center px-4 py-3 text-xs font-medium text-gray-500 cursor-pointer"
                      onClick={() => toggleSort("role")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        الدور
                        {sortField === "role" && sortDirection === "asc" ? (
                          <ArrowUp size={16} className="text-blue-500" />
                        ) : sortField === "role" && sortDirection === "desc" ? (
                          <ArrowDown size={16} className="text-blue-500" />
                        ) : (
                          <ArrowDown size={16} className="text-gray-500" />
                        )}
                      </div>
                    </th>
                    <th
                      className="text-center px-4 py-3 text-xs font-medium text-gray-500 cursor-pointer"
                      onClick={() => toggleSort("isConfirmed")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        مؤكد
                        {sortField === "isConfirmed" &&
                        sortDirection === "asc" ? (
                          <ArrowUp size={16} className="text-blue-500" />
                        ) : sortField === "isConfirmed" &&
                          sortDirection === "desc" ? (
                          <ArrowDown size={16} className="text-blue-500" />
                        ) : (
                          <ArrowDown size={16} className="text-gray-500" />
                        )}
                      </div>
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      محظور
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-4 py-3 text-center">
                          <img
                            src={user.image?.url || "/user.png"}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-10 h-10 rounded-full object-cover mx-auto"
                          />
                        </td>
                        <td className="px-4 py-3 truncate max-w-[150px]">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full 
                              ${
                                user.role === "admin"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : user.role === "super admin"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            `}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {user.isConfirmed ? "نعم" : "لا"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {user.isBlocked ? "نعم" : "لا"}
                        </td>
                        <td className="px-4 py-3 flex gap-4 justify-center items-center mt-3">
                          <button
                            onClick={() => openEditModal(user)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="تعديل الخدمة"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title="حذف"
                            disabled={deletingId === user._id}
                          >
                            {deletingId === user._id ? (
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
                        colSpan="7"
                        className="py-6 text-center text-sm text-gray-500"
                      >
                        لا يوجد مستخدمين حاليًا
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <AnimatePresence>
              {isEditModalOpen && currentUser && (
                <EditUserModal
                  user={currentUser}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={editUser}
                />
              )}
            </AnimatePresence>

            {isDeleteModalOpen && (
              <div
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                dir="rtl"
              >
                <div className="bg-white rounded-lg p-6 w-full max-w-md text-right">
                  <h2 className="text-xl font-bold mb-4 ">حذف المستخدم</h2>
                  <p className="mb-2">
                    سيتم حذف المستخدم{" "}
                    <span className="font-semibold">{currentUser?.email}</span>{" "}
                    نهائيًا مع كل بياناته.
                  </p>
                  <p className="mb-4 text-red-600 bg-red-100 p-2 rounded">
                    تحذير: هذا الإجراء لا يمكن التراجع عنه. يرجى التأكد.
                  </p>
                  <label className="block mb-2">
                    أدخل البريد الإلكتروني للتأكيد ({currentUser?.email}):
                  </label>
                  <input
                    type="text"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                    placeholder="أدخل البريد الإلكتروني"
                    required
                  />
                  <div className="flex justify-start gap-2">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer transition-all duration-200"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleConfirmDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-all duration-200"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-700">
                عرض {users.length} من {total} مستخدم
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

export default AdminUsers;
