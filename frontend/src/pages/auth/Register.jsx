import React, { useState } from "react";
import API from "../../services/api";
import Toast from "../../components/toast/Toast";
import "./auth.css";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.terms) {
      setToast({ message: "You must agree to Terms & Conditions", type: "error" });
      return;
    }
    try {
      const res = await API.post("/auth/register", formData);
      setToast({ message: res.data.message || "Registration successful!", type: "success" });
      setTimeout(() => (window.location.href = "/"), 1500);
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Registration failed", type: "error" });
    }
  };

  return (
    <div className="auth-wrapper">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />

      <div className="auth-container split-layout">
        {/* LEFT IMAGE WITH OVERLAY TEXT */}
        <div className="auth-left">
          <img src="./futsal.png" alt="Futsal" />
          <div className="overlay-text">
            <h1>Futsilo ⚽</h1>
            <p>Build your team. Book your ground.</p>
            <span>Be part of the futsal community.</span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="auth-right">
          <h2>Create Account ✨</h2>
          <form onSubmit={handleRegister} className="modern-form grid-form">
            <div className="form-group">
              <FiUser className="input-icon" />
              <input type="text" name="name" required onChange={handleChange} />
              <label>Full Name</label>
            </div>

            <div className="form-group">
              <FiMail className="input-icon" />
              <input type="email" name="email" required onChange={handleChange} />
              <label>Email</label>
            </div>

            <div className="form-group password-group">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
              />
              <label>Password</label>
              <span
                className="toggle-pass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="form-group">
              <FiPhone className="input-icon" />
              <input type="text" name="phone" required onChange={handleChange} />
              <label>Phone Number</label>
            </div>

            <div className="form-group">
              <input type="date" name="dob" onChange={handleChange} />
              <label className="active">Date of Birth</label>
            </div>

            <div className="form-group">
              <select name="gender" onChange={handleChange}>
                <option value=""></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <label>Gender</label>
            </div>

            <div className="form-group full-width">
              <input type="text" name="address" required onChange={handleChange} />
              <label>Address</label>
            </div>

            <div className="terms full-width">
              <input type="checkbox" name="terms" onChange={handleChange} />
              <span>I agree to Terms & Policies</span>
            </div>

            <button type="submit" className="primary-btn full-width">
              Create Account
            </button>
          </form>
          <p className="switch-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;