import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";
import Toast from "../../components/toast/Toast";
import "./auth.css";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      const redirectPath = location.state?.from?.pathname;
      if (redirectPath) navigate(redirectPath, { replace: true });
      else if (user.role === "admin") navigate("/admin", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setToast({ message: "Login successful!", type: "success" });

      const redirectPath = location.state?.from?.pathname;
      if (redirectPath) navigate(redirectPath, { replace: true });
      else if (res.data.user.role === "admin") navigate("/admin", { replace: true });
      else navigate("/dashboard", { replace: true });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Login failed",
        type: "error",
      });
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
         <div className="auth-left">
          <img src="/futsal.png" alt="Futsal" />
          <div className="overlay-text">
            <h1>Futsilo ⚽</h1>
            <p>Book. Play. Compete.</p>
            <span>Your ultimate futsal experience starts here.</span>
          </div>
        </div>

        <div className="auth-right">
          <h2>Welcome Back 👋</h2>
          <form onSubmit={handleLogin} className="modern-form">
            <div className="form-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email Address</label>
            </div>

            <div className="form-group password-group">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              <span
                className="toggle-pass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button type="submit" className="primary-btn">
              Login
            </button>
          </form>
          <p style={{ textAlign: "right", marginTop: "10px", fontSize: "0.8rem" }}>
  <Link to="/forgot-password" style={{ textDecoration: "none" }}>
    Forgot Password?
  </Link>
</p>

          <p className="switch-link">
            Don't have an account? <a href="/register">Create Account</a>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Login;