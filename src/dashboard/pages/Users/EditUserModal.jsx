import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [role, setRole] = useState(user.role || "user");
  const [isBlocked, setIsBlocked] = useState(user.isBlocked ? "yes" : "no");
  const [isConfirmed, setIsConfirmed] = useState(
    user.isConfirmed ? "yes" : "no"
  );
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isBlockedOpen, setIsBlockedOpen] = useState(false);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);

  const handleSave = () => {
    const updatedUser = {
      role: role,
      block: isBlocked,
      confirm: isConfirmed,
    };
    onSave(user._id, updatedUser);

    onClose();
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-500"
      dir="rtl"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={dropdownVariants}
        className="bg-white rounded-lg p-6 w-full max-w-xl"
      >
        <h2 className="text-xl mb-4">تعديل المستخدم: <span className="font-semibold">{user.email}</span></h2>
        <div className="space-y-4">
          {/* Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none text-right bg-white cursor-pointer"
            >
              {role}
            </button>
            <AnimatePresence>
              {isRoleOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg text-right"
                >
                  <button
                    onClick={() => {
                      setRole("user");
                      setIsRoleOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                  >
                    user
                  </button>
                  <button
                    onClick={() => {
                      setRole("admin");
                      setIsRoleOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                  >
                    admin
                  </button>
                  <button
                    onClick={() => {
                      setRole("superadmin");
                      setIsRoleOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                  >
                    superadmin
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Blocked Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsBlockedOpen(!isBlockedOpen)}
              className="w-full px-4 py-2 border border-gray-400 cursor-pointer rounded-lg shadow-sm focus:outline-none text-right bg-white"
            >
              {isBlocked === "yes" ? "محظور" : "غير محظور"}
            </button>
            <AnimatePresence>
              {isBlockedOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg text-right"
                >
                  <button
                    onClick={() => {
                      setIsBlocked("no");
                      setIsBlockedOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                  >
                    لا
                  </button>
                  <button
                    onClick={() => {
                      setIsBlocked("yes");
                      setIsBlockedOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                  >
                    نعم
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Confirmed Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsConfirmedOpen(!isConfirmedOpen)}
              className="w-full px-4 py-2 border border-gray-400 cursor-pointer rounded-lg shadow-sm focus:outline-none text-right bg-white"
            >
              {isConfirmed === "yes" ? "مؤكد" : "غير مؤكد"}
            </button>
            <AnimatePresence>
              {isConfirmedOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg text-right"
                >
                  <button
                    onClick={() => {
                      setIsConfirmed("no");
                      setIsConfirmedOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                  >
                    لا
                  </button>
                  <button
                    onClick={() => {
                      setIsConfirmed("yes");
                      setIsConfirmedOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                  >
                    نعم
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex justify-start gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer transition-all duration-200"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-200"
          >
            حفظ
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditUserModal;
