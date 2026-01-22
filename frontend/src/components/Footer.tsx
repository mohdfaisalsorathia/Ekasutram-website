import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section brand">
            <h3>EKASUTRAM</h3>
            <p>Exploring the Universe through Mathematics.</p>
            <p>Vishwakarma Institute of Technology, Pune</p>
          </div>

          <div className="footer-section links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/team">Our Team</Link></li>
            </ul>
          </div>

          <div className="footer-section connect">
            <h4>Connect With Us</h4>
            <div className="social-links">
              {/* Placeholders for social icons */}
              <a href="https://www.linkedin.com/company/ekasutram/posts/?feedView=all" className="social-icon">LinkedIn</a>
              <a href="https://www.instagram.com/ekasutram/" className="social-icon">Instagram</a>
              <a href="https://www.facebook.com/Ekasutram/" className="social-icon">Facebook</a>
            </div>
            <p className="contact-email">ekasutram@vit.edu</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ekasutram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
