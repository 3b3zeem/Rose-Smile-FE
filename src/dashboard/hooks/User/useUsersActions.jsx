import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const useUsersActions = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const BaseURL = `${import.meta.env.VITE_BACK_END}/api/v1/user`;

  const page = parseInt(searchParams.get("page")) || 1;
  const size = 6;
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "";
  const blocked = searchParams.get("blocked") || "";
  const confirmed = searchParams.get("confirmed") || "";
  const sort = searchParams.get("sort") || "email:asc";

  // Get All Users with Filters
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        search,
        ...(role && { role }),
        ...(blocked && { blocked }),
        ...(confirmed && { confirmed }),
        sort,
      }).toString();

      const response = await axios.get(`${BaseURL}/admin?${queryParams}`, {
        withCredentials: true,
      });

      setUsers(response.data.users || []);
      setTotal(response.data.totalUsers || 0);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${BaseURL}/admin/${id}`, {
        withCredentials: true,
      });
      await fetchUsers();
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "فشل في الحذف",
      };
    } finally {
      setDeleteLoading(false);
    }
  };

  // Edit User
  const editUser = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${BaseURL}/admin/${id}`,
        {
          role: updatedData.role,
          block: updatedData.block,
          confirm: updatedData.confirm,
        },
        { withCredentials: true }
      );
      await fetchUsers();
      toast.success(response.data.message || "تم تعديل المستخدم بنجاح");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في تعديل المستخدم");
      console.error("Failed to edit user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size, search, role, blocked, confirmed, sort]);

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", newPage.toString());
      return newParams;
    });
  };

  return {
    users,
    total,
    page,
    size,
    totalPages: Math.ceil(total / size),
    loading,
    deleteLoading,
    deleteUser,
    editUser,
    handlePageChange,
  };
};

export default useUsersActions;
