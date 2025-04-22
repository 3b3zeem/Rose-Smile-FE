import React, { useEffect, useState } from "react";
import useSendResetLink from "../../hooks/Auth/useSendResetLink";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const { sendResetLink, loading, error, success, resetState } = useSendResetLink();

  // Handle API call and show toast
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await sendResetLink(email.trim());

    if (result?.success) {
      toast.success("تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني");
      setTimeout(() => {
        setEmail(""); // Reset field
        onClose();    // Close modal after 3s
        resetState(); // Clear messages
      }, 3000);
    }

    if (result?.error) {
      toast.error(result.error);
    }
  };
  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      resetState();
    }
  }, [isOpen, resetState]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          padding: "24px",
          width: "100%",
          maxWidth: "450px",
          textAlign: "right",
          direction: "rtl",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#1e40af",
          }}
        >
          إعادة تعيين كلمة المرور
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              border: "1px solid blue",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />

          {error && (
            <p
              style={{
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                fontSize: "14px",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              ⚠️ {error}
            </p>
          )}

          {success && (
            <p
              style={{
                backgroundColor: "#dcfce7",
                color: "#15803d",
                fontSize: "14px",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
               تم إرسال الكود إلى بريدك الإلكتروني
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                onClose();
                resetState(); // Manual close clears state too
              }}
              style={{
                padding: "10px 16px",
                backgroundColor: "#e5e7eb",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 16px",
                backgroundColor: "#1e40af",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {loading ? "جارٍ الإرسال..." : "إرسال الرابط"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
