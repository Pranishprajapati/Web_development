import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./BookingHistory.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("User not logged in");

        const res = await API.get(`/booking/user/${user.id}`);
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="booking-history-page">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Ground</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price/hr</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.ground_name}</td>
                <td>{new Date(b.booking_date).toLocaleDateString("en-GB")}</td>
                <td>{b.from_time}:00 - {b.to_time}:00</td>
                <td>NPR {b.price}</td>
                <td>NPR {b.total_price}</td>
                <td>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistory;