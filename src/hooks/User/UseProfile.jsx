import axios from "axios";
import { useState, useEffect } from "react";

export const useUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/v1/user/profile",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { userData, loading, error, fetchUserProfile };
};

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
        "http://localhost:5000/api/v1/user/avatar",
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

      if (res.status == 200) {
        return res.data;
      }

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
        "http://localhost:5000/api/v1/user/change/password",
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

export const useUpdateProfile = () => {
  
}