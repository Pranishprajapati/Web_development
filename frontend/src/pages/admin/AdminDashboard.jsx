import React, { useState } from "react";
import BookingsTab from "./BookingsTabs";
import GroundsTab from "./GroundsTab";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <div className="admin-dashboard-page">
      <h1>Admin Dashboard</h1>

      {/* Tabs Navigation */}
      <div className="admin-tabs">
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
        <button
          className={activeTab === "grounds" ? "active" : ""}
          onClick={() => setActiveTab("grounds")}
        >
          Grounds
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "bookings" && <BookingsTab />}
        {activeTab === "grounds" && <GroundsTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
