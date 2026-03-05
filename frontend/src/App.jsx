import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/public/Home";
import Grounds from "./pages/public/Grounds";
import GroundDetails from "./pages/public/GroundDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import BookingHistory from "./pages/user/BookingHistory";
import AdminDashboard from "./pages/admin/AdminDashboard";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Booking from "./pages/public/Booking";

// Components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PUBLIC PAGES */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/grounds"
          element={
            <>
              <Navbar />
              <Grounds />
              <Footer />
            </>
          }
        />
        <Route
          path="/grounds/:id"
          element={
            <>
              <Navbar />
              <GroundDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/booking"
          element={
            <>
              <Navbar />
              <Booking />
              <Footer />
            </>
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <>
                <Navbar />
                <BookingHistory />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <>
                <Navbar />
                <AdminDashboard />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;