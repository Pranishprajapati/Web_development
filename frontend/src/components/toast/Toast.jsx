import React from "react";
import "./Toast.css";

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
