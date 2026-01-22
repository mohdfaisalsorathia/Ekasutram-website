import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/Ekasutram logo.png" alt="Ekasutram Logo" className="logo-image" />
          <span className="logo-text">EKASUTRAM</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/events" className="nav-link">Events</Link>
          <Link to="/team" className="nav-link">Team</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/fun-games" className="nav-link">Fun Games</Link>
          <Link to="/setcode" className="nav-link">SetCode</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
