import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Futsilo</h3>
          <p>
            Book your favorite futsal grounds easily. Fast, secure, and simple
            booking system for players and teams in Nepal.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/grounds">Grounds</a></li>
            <li><a href="/booking">Booking</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: info@futsilo.com</p>
          <p>Phone: +977 9800000000</p>
        </div>

        {/* Gallery Section */}
        <div className="footer-section gallery">
          <h3>Gallery</h3>
          <div className="footer-gallery">
            <img src="/boudha.webp" alt="Gallery 1" />
            <img src="/bhaktapur.webp" alt="Gallery 2" />
            <img src="/kumari.webp" alt="Gallery 3" />
            <img src="/royal.webp" alt="Gallery 4" />
            <img src="/sankhamul.webp" alt="Gallery 3" />
            <img src="/shantinagar.webp" alt="Gallery 3" />
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>© 2026 Futsilo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
