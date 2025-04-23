import React, { useState, useEffect } from "react";
import {
  useUserProfile,
  useUploadAvatar,
  useChangePassword,
} from "../../hooks/User/UseProfile";
import { LockKeyhole, UserRoundPen } from "lucide-react";
import ForgotPasswordModal from "../../components/Auth/ForgotPasswordModal";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const {
    userData,
    loading: profileLoading,
    error: profileError,
  } = useUserProfile();
  const {
    uploadAvatar,
    loading: uploadLoading,
    error: uploadError,
  } = useUploadAvatar();
  const { changePassword, changePasswordLoading, changePasswordError } =
    useChangePassword();
  const [city, setCity] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    userData?.image?.url || "../../assets/Iamges/user.png"
  );
  const [showForgot, setShowForgot] = useState(false);

  useEffect(() => {
    if (userData?.image?.url) {
      setAvatarUrl(userData.image.url);
    }
  }, [userData]);

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {profileError}
      </div>
    );
  }

  // * Handle file change for avatar upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const localImageUrl = URL.createObjectURL(file);
      setAvatarUrl(localImageUrl);

      const result = await uploadAvatar(file);
      if (result) {
        if (result.image?.url) {
          setAvatarUrl(result.image.url);
        }
        toast.success("تم تحميل الصورة بنجاح!");
      } else {
        setAvatarUrl(userData?.image?.url || "../../assets/Iamges/user.png");
        toast.error("فشل تحميل الصورة!");
      }
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.warning("يجب أن تتطابق كلمة المرور الجديدة مع تأكيد كلمة المرور");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning("يرجى ملء جميع حقول كلمة المرور!");
      return;
    }

    const result = await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (result) {
      toast.success("تم تغيير كلمة المرور بنجاح!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(changePasswordError || "فشل تغيير كلمة المرور!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <ToastContainer position="top-right" rtl theme="colored" />
      <div className="bg-white rounded-lg shadow-sm w-full p-8">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            اعدادات الملف الشخصي
          </h1>
          <button className="text-purple-600 flex items-center gap-1 text-sm font-medium hover:underline cursor-pointer">
            <UserRoundPen />
            تعديل الملف الشخصي
          </button>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-50 h-50 rounded-full object-cover border border-gray-200 shadow-sm"
              />
              {uploadLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-full">
                  <svg
                    className="w-6 h-6 text-purple-600 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
            <label className="text-purple-600 flex items-center gap-1 text-sm font-medium cursor-pointer border border-purple-600 rounded-md px-4 py-2 hover:bg-purple-50 transition duration-200">
              <UserRoundPen />
              اضافة صورة شخصية
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                الاسم الأول
              </label>
              <input
                type="text"
                value={userData.firstName}
                disabled
                className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                الاسم الأخير
              </label>
              <input
                type="text"
                value={userData.lastName}
                disabled
                className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                المدينة
              </label>
              <input
                type="text"
                value={userData.city || "City"}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              رقم الهاتف
            </label>
            <input
              type="text"
              value={userData.phone}
              disabled
              className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Change Password */}
        <div>
          <h2 className="text-lg font-semibold text-purple-600 mb-4 flex items-center gap-2">
            <LockKeyhole />
            تغيير كلمة المرور
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                كلمة المرور الحالية
              </label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                )}
              </button>
              <button
                type="button"
                className="text-purple-600 hover:underline text-md cursor-pointer"
                onClick={() => setShowForgot(true)}
              >
                نسيت كلمة المرور؟
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                كلمة المرور الجديدة
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                تأكيد كلمة المرور الجديدة
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleChangePassword}
                disabled={changePasswordLoading}
                className={`px-4 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 cursor-pointer ${
                  changePasswordLoading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {changePasswordLoading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    حفظ...
                  </div>
                ) : (
                  "حفظ التغييرات"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={showForgot}
        onClose={() => setShowForgot(false)}
      />
    </div>
  );
};

export default Profile;
