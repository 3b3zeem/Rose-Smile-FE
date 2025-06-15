import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// ✅ GET: Fetch User Profile using React Query
export const useUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_END}/api/v1/user/profile`,
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("Fetched user data:", response.data.user);
        setUserData(response.data.user);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    userData,
    loading,
    error,
    fetchUserProfile,
  };
};

// ✅ PUT: Update User (still using axios directly)
export const useUpdateUser = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateUser = async (updatedData, onSuccess) => {
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

      if (response.status !== 200 || !response.data.success) {
        throw new Error("Failed to update user profile");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      if (onSuccess) await onSuccess();

      return response.data.user;
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
