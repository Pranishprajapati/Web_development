// src/pages/auth/ForgotPassword.jsx
import React, { useState } from "react";
import API from "../../services/api";
import Toast from "../../components/toast/Toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password/send-code", { email });
      setToast({ message: "Verification code sent!", type: "success" });
      setStep(2);
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Error sending code", type: "error" });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password/reset", { email, code, password });
      setToast({ message: "Password reset successfully!", type: "success" });
      setStep(1);
      setEmail("");
      setCode("");
      setPassword("");
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Error resetting password", type: "error" });
    }
  };

  return (
    <div className="auth-wrapper">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />

      <div className="auth-container">
        {step === 1 && (
          <form onSubmit={handleSendCode} className="modern-form">
            <h2>Forgot Password</h2>
            <div className="form-group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email Address</label>
            </div>
            <button type="submit" className="primary-btn">
              Send Verification Code
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="modern-form">
            <h2>Reset Password</h2>
            <div className="form-group">
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <label>Verification Code</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>New Password</label>
            </div>
            <button type="submit" className="primary-btn">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;