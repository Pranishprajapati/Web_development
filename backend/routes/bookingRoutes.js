import express from "express";
import pool from "../config/db.js";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  getAvailableHours
} from "../controllers/bookingController.js";

const router = express.Router();

// Create booking
router.post("/", createBooking);

// Get all bookings (admin)
router.get("/", getAllBookings);

// Get bookings for a specific user
router.get("/user/:userId", getUserBookings);

// Update booking status (admin)
router.put("/:id", updateBookingStatus);

// Get available hours for a ground and date
router.get("/available-hours", getAvailableHours);
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM bookings_direct WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("DELETE BOOKING ERROR:", err);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});
export default router;