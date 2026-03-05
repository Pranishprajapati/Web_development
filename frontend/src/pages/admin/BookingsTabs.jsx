import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminTabs.css";

// Modal to show booking details
const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Booking Details</h3>
        <p><strong>Ground:</strong> {booking.ground_name}</p>
        <p><strong>Name:</strong> {booking.user_name || booking.name}</p>
        <p><strong>Email:</strong> {booking.user_email || booking.email}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>
        <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString("en-GB")}</p>
        <p><strong>Time:</strong> {booking.from_time}:00 - {booking.to_time}:00</p>
        <p><strong>Price/hr:</strong> NPR {booking.price}</p>
        <p><strong>Total:</strong> NPR {booking.total_price}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <button className="btn-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [newBooking, setNewBooking] = useState({
    user_id: "",   // added user_id for admin bookings
    name: "",
    email: "",
    phone: "",
    date: "",
    from_time: "",
    to_time: "",
    ground_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings and grounds
  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingRes, groundRes] = await Promise.all([
        API.get("/booking"),
        API.get("/grounds")
      ]);
      setBookings(bookingRes.data);
      setGrounds(groundRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch available hours when ground or date changes
  useEffect(() => {
    if (newBooking.ground_id && newBooking.date) {
      API.get(`/booking/available-hours?ground_id=${newBooking.ground_id}&date=${newBooking.date}`)
        .then(res => setAvailableHours(res.data.availableHours))
        .catch(err => setAvailableHours([]));
    } else {
      setAvailableHours([]);
    }
  }, [newBooking.ground_id, newBooking.date]);

  const handleChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  // Add new booking (admin)
  const handleAddBooking = async (e) => {
    e.preventDefault();

    const groundName = grounds.find(g => g.id === parseInt(newBooking.ground_id))?.name;
    if (!groundName) return alert("Please select a valid ground");

    if (!newBooking.user_id) return alert("Please provide a valid user ID for this booking");

    try {
      await API.post("/booking", {
        user_id: newBooking.user_id,
        name: newBooking.name,
        email: newBooking.email,
        phone: newBooking.phone,
        date: newBooking.date,
        fromTime: newBooking.from_time,
        toTime: newBooking.to_time,
        groundName
      });
      alert("Booking added successfully!");
      setNewBooking({
        user_id: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        from_time: "",
        to_time: "",
        ground_id: "",
      });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add booking");
    }
  };

  const handleStatusChange = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this booking?`)) return;
    try {
      await API.put(`/booking/${id}`, { status });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };
  const handleDeleteBooking = async (id) => {
  if (!window.confirm("Are you sure you want to delete this booking?")) return;
  try {
    await API.delete(`/booking/${id}`);
    alert("Booking deleted successfully!");
    fetchData(); // refresh table
  } catch (err) {
    alert(err.response?.data?.message || "Failed to delete booking");
  }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="tab-section">
      <h2>Bookings (Admin)</h2>

      {/* Add New Booking Form */}
      <form className="admin-form" onSubmit={handleAddBooking}>
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={newBooking.user_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newBooking.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newBooking.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newBooking.phone}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newBooking.date}
          onChange={handleChange}
          required
        />
        <select
          name="ground_id"
          value={newBooking.ground_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Ground</option>
          {grounds.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          name="from_time"
          value={newBooking.from_time}
          onChange={handleChange}
          required
        >
          <option value="">From Hour</option>
          {availableHours.map(h => (
            <option key={h} value={h}>{h}:00</option>
          ))}
        </select>

        <select
          name="to_time"
          value={newBooking.to_time}
          onChange={handleChange}
          required
        >
          <option value="">To Hour</option>
          {availableHours
            .filter(h => h > Number(newBooking.from_time))
            .map(h => (
              <option key={h} value={h}>{h}:00</option>
            ))}
        </select>

        <button type="submit">Add Booking</button>
      </form>

      {/* Bookings Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ground</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price/hr</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.ground_name}</td>
              <td>{b.user_name || b.name}</td>
              <td>{b.user_email || b.email}</td>
              <td>{b.phone}</td>
              <td>{new Date(b.booking_date).toLocaleDateString("en-GB")}</td>
              <td>{b.from_time}:00 - {b.to_time}:00</td>
              <td>NPR {b.price}</td>
              <td>NPR {b.total_price}</td>
              <td>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</td>
              <td>
                <button onClick={() => setSelectedBooking(b)}>Details</button>
                {b.status !== "confirmed" && <button onClick={() => handleStatusChange(b.id, "confirmed")}>✅</button>}
                {b.status !== "canceled" && <button onClick={() => handleStatusChange(b.id, "canceled")}>❌</button>}
                  <button onClick={() => handleDeleteBooking(b.id)}>🗑️</button>  

              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default BookingsTab;