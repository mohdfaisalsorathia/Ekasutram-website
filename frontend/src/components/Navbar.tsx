import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="/Ekasutram logo.png"
            alt="Ekasutram Logo"
            className="logo-image"
          />
          <span className="logo-text">EKASUTRAM</span>
        </Link>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Links */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/events" className="nav-link" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to="/team" className="nav-link" onClick={() => setMenuOpen(false)}>Team</Link>
          <Link to="/resources" className="nav-link" onClick={() => setMenuOpen(false)}>Resources</Link>
          <Link to="/fun-games" className="nav-link" onClick={() => setMenuOpen(false)}>Fun Games</Link>
          <Link to="/setcode" className="nav-link" onClick={() => setMenuOpen(false)}>SetCode</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
