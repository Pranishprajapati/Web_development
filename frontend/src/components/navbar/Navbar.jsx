import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")); 

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Futsilo ⚽️</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/grounds">Grounds</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>

        {/* Show Dashboard based on role */}
        {user?.role === "user" && <li><Link to="/dashboard">Booking History</Link></li>}
        {user?.role === "admin" && <li><Link to="/admin">Admin Dashboard</Link></li>}
      </ul>

      <div className="navbar-actions">
        {!user && <Link to="/register" className="btn-link">Register</Link>}
        {!user && <Link to="/login" className="btn-login">Login</Link>}

        {/* logout */}
        {user && (
          <Link
            to="#"
            className="btn-login"  
            onClick={handleLogout}
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
