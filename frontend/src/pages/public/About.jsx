import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <h1>About Futsilo ⚽</h1>
        <p>Making futsal booking simple, fast & reliable</p>
      </section>

      {/* MISSION & VISION */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-box">
            <h2>Our Mission</h2>
            <p>
              To simplify futsal ground booking by providing a fast, secure,
              and user-friendly platform for players and ground owners.
            </p>
          </div>

          <div className="about-box">
            <h2>Our Vision</h2>
            <p>
              To become the leading sports booking platform, encouraging
              healthy lifestyles and supporting local sports communities.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="stat-card">
          <h3>50+</h3>
          <p>Futsal Grounds</p>
        </div>
        <div className="stat-card">
          <h3>5,000+</h3>
          <p>Bookings Made</p>
        </div>
        <div className="stat-card">
          <h3>2,000+</h3>
          <p>Active Players</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Online Access</p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-section light">
        <h2 className="section-title">Why Choose Futsilo?</h2>

        <div className="features-grid">
          <div className="feature-cards">⚽ Easy Ground Booking</div>
          <div className="feature-cards">📅 Real-Time Slot Availability</div>
          <div className="feature-cards">🔐 Secure Login & Payments</div>
          <div className="feature-cards">📊 User & Admin Dashboards</div>
          <div className="feature-cards">🚀 Fast & Responsive Platform</div>
          <div className="feature-cards">📍 Location-Based Search</div>
        </div>
      </section>

     {/* HOW IT WORKS */}
<section className="about-section">
  <h2 className="section-title">How Futsilo Works</h2>

  <div className="steps-grid">
    <div className="step-card">
      <span>1</span>
      <h3>Search Grounds</h3>
      <p>Find futsal grounds by location, price, and availability.</p>
    </div>

    <div className="step-card">
      <span>2</span>
      <h3>Select Slot</h3>
      <p>Choose your preferred date and time slot instantly.</p>
    </div>

    <div className="step-card">
      <span>3</span>
      <h3>Book & Play</h3>
      <p>Confirm booking and enjoy your game without hassle.</p>
    </div>
  </div>
</section>

{/* CORE VALUES */}
<section className="about-section light">
  <h2 className="section-title">Our Core Values</h2>

  <div className="values-grid">
    <div className="value-card">
      ⚽ <h4>Passion for Sports</h4>
      <p>We believe sports build stronger and healthier communities.</p>
    </div>

    <div className="value-card">
      🔐 <h4>Trust & Security</h4>
      <p>Your data and bookings are always safe with us.</p>
    </div>

    <div className="value-card">
      🚀 <h4>Innovation</h4>
      <p>We continuously improve our platform for a better experience.</p>
    </div>

    <div className="value-card">
      🤝 <h4>User First</h4>
      <p>Everything we build is focused on players and ground owners.</p>
    </div>
  </div>
</section>


      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to Play?</h2>
        <p>Book your futsal ground in seconds and start playing today.</p>
        <a href="/grounds" className="cta-btn">
          Book a Ground
        </a>
      </section>
    </div>
  );
};

export default About;
