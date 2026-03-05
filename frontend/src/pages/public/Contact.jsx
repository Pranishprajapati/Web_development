import React, { useState } from "react";
import API from "../../services/api";
import Toast from "../../components/toast/Toast";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/contact", form);
      setToast({ message: "Message sent successfully ⚽", type: "success" });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Failed to send message",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />

      {/* HERO SECTION */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’re always here to help ⚽</p>
      </section>

      <section className="contact-content">
        {/* CONTACT INFO */}
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>Questions, feedback, or partnerships — send us a message.</p>
          <div className="info-item">📍 Kathmandu, Nepal</div>
          <div className="info-item">📧 support@futsilo.com</div>
          <div className="info-item">📞 +977-123456789</div>
        </div>

        {/* CONTACT FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Message</h2>

          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
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
          />

          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            <option value="booking">Booking</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
