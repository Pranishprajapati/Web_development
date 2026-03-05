import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const futsals = [
  {
    id: "futsal-arena-boudha",
    name: "Futsal Arena Boudha",
    location: "Kathmandu",
    rating: 4.8,
    price: 800,
    facilities: ["Artificial Turf", "Floodlights", "Seating", "Refreshments"],
    image: "/boudha.webp",
  },
  {
    id: "dreamers-futsal",
    name: "Dreamers Futsal",
    location: "Lalitpur",
    rating: 4.5,
    price: 700,
    facilities: ["Artificial Turf", "Parking", "Canteen"],
    image: "/dreamers.jpeg",
  },
  {
    id: "bhaktapur-futsal",
    name: "Bhaktapur Futsal",
    location: "Sallaghari, Bhaktapur",
    rating: 4.7,
    price: 750,
    facilities: ["Turf Surface", "Floodlights", "Canteen"],
    image: "/bhaktapur.webp",
  },
  {
    id: "field-futsal",
    name: "Field Futsal",
    location: "Sanepa Road, Lalitpur",
    rating: 4.6,
    price: 650,
    facilities: ["Indoor", "Artificial Turf", "Floodlights", "Parking"],
    image: "/field .webp",
  },
  {
    id: "sankhamul-futsal",
    name: "Sankhamul Futsal",
    location: "Sankhamul",
    rating: 4.4,
    price: 700,
    facilities: ["Outdoor", "Floodlights", "Canteen"],
    image: "/sankhamul.webp",
  },
  {
    id: "gokarna-futsal",
    name: "Gokarneshwor Futsal and Fitness Club",
    location: "Gokarneshwor 44600",
    rating: 4.7,
    price: 850,
    facilities: ["Indoor", "Premium Turf", "Locker Rooms"],
    image: "/gokarna.webp",
  },
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Find Your Ground</h1>
            <p>
              Get instant information from every futsal available and suit your
              schedule and budget.
            </p>
            <Link to="/grounds" className="btn-primary">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Available Futsals */}
      <section className="futsals">
        <h2>Your Booking, Our Priority</h2>
        <span className="section-tag">AVAILABLE FUTSALS</span>

        <div className="futsal-cards">
          {futsals.map((futsal) => (
            <Link
              to={`/grounds/${futsal.id}`}
              key={futsal.id}
              className="futsal-card-link"
            >
              <div className="futsal-card">
                <img src={futsal.image} alt={futsal.name} />
                <div className="card-info">
                  <h3>{futsal.name}</h3>
                  <p>{futsal.location}</p>
                  <span>⭐ {futsal.rating}</span>
                  <p>Price: NPR {futsal.price}/hr</p>
                  <p>Facilities: {futsal.facilities.join(", ")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="feature-section">
        <div className="feature-card">
          <div className="feature-text">
            <span className="feature-badge">EASY RESERVATIONS</span>
            <h2>Book Futsal Grounds Without the Hassle</h2>
            <p>
              Plan matches, reserve time slots, and manage bookings effortlessly
              through one simple platform.
            </p>

            <ul>
              <li>Instant ground availability updates</li>
              <li>Secure and transparent booking process</li>
              <li>Optimized for players and organizers</li>
            </ul>
            <Link to="/grounds" className="btn-primary">
              Explore Grounds
            </Link>
          </div>

          <div className="feature-image">
            <img src="/public/futsal 1.jpeg" alt="Futsal Action" />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking">
        <div className="booking-overlay">
          <div className="booking-text">
            <h2>Reserve Your Futsal Slot in Seconds</h2>
            <p>
              Choose a ground, select your time, and confirm your booking — all
              in just a few clicks.
            </p>
            <Link to="/grounds" className="btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
