import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import UserDashboard from "../pages/user/BookingHistory";
import BookingHistory from "../pages/user/BookingHistory";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute role="user">
            <BookingHistory/>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<BookingHistory />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
