import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// ✅ GET: Fetch User Profile using React Query
export const useUserProfile = () => {
  const fetchUserProfile = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACK_END}/api/v1/user/profile`,
      { withCredentials: true }
    );

    if (response.data.success) {
      return response.data.user;
    } else {
      throw new Error("Failed to fetch user data");
    }
  };

  const {
    data: userData,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  return {
    userData,
    loading,
    error: isError ? error?.message : null,
    fetchUserProfile,
  };
};

// ✅ PUT: Update User (still using axios directly)
export const useUpdateUser = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateUser = async (updatedData) => {
    try {
      setUpdateLoading(true);
      setUpdateError(null);

      const response = await axios.put(
        `${import.meta.env.VITE_BACK_END}/api/v1/user/update`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update user profile");
      }

      return response.data;
    } catch (err) {
      setUpdateError(
        err.response?.data?.message || "Failed to update user profile"
      );
      return null;
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    updateUser,
    updateLoading,
    updateError,
  };
};

// ✅ POST: Upload Avatar
export const useUploadAvatar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadAvatar = async (file) => {
    if (!file) {
      setError("Please select a file to upload");
      return null;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${import.meta.env.VITE_BACK_END}/api/v1/user/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to upload avatar");
      }

      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while uploading the avatar"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadAvatar, loading, error };
};

// ✅ PUT: Change Password
export const useChangePassword = () => {
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState(null);

  const changePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }) => {
    try {
      setChangePasswordLoading(true);
      setChangePasswordError(null);

      const response = await axios.put(
        `${import.meta.env.VITE_BACK_END}/api/v1/user/change/password`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to change password");
      }

      return response.data;
    } catch (err) {
      setChangePasswordError(
        err.response?.data?.message || "Failed to change password"
      );
      return null;
    } finally {
      setChangePasswordLoading(false);
    }
  };

  return {
    changePassword,
    changePasswordLoading,
    changePasswordError,
  };
};
