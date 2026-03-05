import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";
import Toast from "../../components/toast/Toast";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { groundName, price } = location.state || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  const [selectedHours, setSelectedHours] = useState([]);
  const [bookedHours, setBookedHours] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  if (!groundName) {
    return (
      <div className="booking-page not-found">
        <h2>No Ground Selected</h2>
        <button className="btn-secondary" onClick={() => navigate("/grounds")}>
          Back to Grounds
        </button>
      </div>
    );
  }

  const hoursOptions = Array.from({ length: 17 }, (_, i) => 6 + i); 

  
  useEffect(() => {
    if (!form.date) return;

    const fetchBooked = async () => {
      try {
        const res = await API.get("/booking");

        const booked = res.data
          .filter(
            (b) =>
              b.ground_name === groundName &&
              new Date(b.booking_date).toDateString() ===
                new Date(form.date).toDateString()
          )
          .flatMap((b) => {
            const from = parseInt(b.from_time);
            const to = parseInt(b.to_time);
            return Array.from({ length: to - from }, (_, i) => from + i);
          });

        setBookedHours(booked);
        setSelectedHours([]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooked();
  }, [form.date, groundName]);

  // Calculate total price
  useEffect(() => {
    setTotalPrice(selectedHours.length * price);
  }, [selectedHours, price]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const toggleHour = (hour) => {
    if (bookedHours.includes(hour)) return;


    if (selectedHours.length === 0) {
      setSelectedHours([hour]);
      return;
    }


    if (selectedHours.length === 1) {
      const start = selectedHours[0];
      const from = Math.min(start, hour);
      const to = Math.max(start, hour);

      const range = [];
      for (let h = from; h <= to; h++) {
        if (bookedHours.includes(h)) {
          setToast({
            message: "Cannot select across booked time ⚠️",
            type: "error",
          });
          return;
        }
        range.push(h);
      }

      setSelectedHours(range);
      return;
    }

   
    setSelectedHours([hour]);
  };

  const handleSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  setToast({ message: "User not logged in", type: "error" });
  return;
}
    e.preventDefault();

    if (!form.date || selectedHours.length === 0) {
      setToast({
        message: "Please select date and time",
        type: "error",
      });
      return;
    }

   const fromTime = Math.min(...selectedHours);
    const toTime = Math.max(...selectedHours) + 1;

    setLoading(true);

    try {
      const res = await API.post("/booking", {
        user_id: user.id, 
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        fromTime,
        toTime,
        groundName,
      });

      setToast({ message: res.data.message, type: "success" });

      setForm({ name: "", email: "", phone: "", date: "" });
      setSelectedHours([]);
      setTotalPrice(0);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Booking failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />

      <section className="booking-hero">
        <div className="hero-content">
          <h1>Book {groundName}</h1>
          <p>Price: NPR {price}/hr</p>
        </div>
      </section>

      <section className="booking-form-section">
        <div className="form-card">
          <h2>Your Details</h2>

          <form className="booking-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <h2>Booking Details</h2>

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />

           
            <div className="time-buttons">
              <p>Select Time:</p>

              <div className="button-group">
                {hoursOptions.map((hour) => {
                  const isBooked = bookedHours.includes(hour);
                  const isSelected = selectedHours.includes(hour);

                  return (
                    <button
                      key={hour}
                      type="button"
                      className={`hour-btn ${
                        isBooked
                          ? "disabled"
                          : isSelected
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => toggleHour(hour)}
                      disabled={isBooked}
                    >
                      {hour}:00
                    </button>
                  );
                })}
              </div>

              {selectedHours.length > 0 && (
                <div className="selected-time-info">
                  <p>
                    Booking From{" "}
                    <strong>{Math.min(...selectedHours)}:00</strong> To{" "}
                    <strong>{Math.max(...selectedHours) + 1}:00</strong>
                  </p>
                  <p>Duration: {selectedHours.length} hour(s)</p>
                </div>
              )}
            </div>

            {totalPrice > 0 && (
              <p className="total-price">Total Price: NPR {totalPrice}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Book Now"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Booking;