import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import MathBackground from "../components/MathBackground";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   // Spotlight Logic for Cards
  //   const handleMouseMove = (e: MouseEvent) => {
  //     document.querySelectorAll('.spotlight-card').forEach((card) => {
  //       const rect = card.getBoundingClientRect();
  //       const x = e.clientX - rect.left;
  //       const y = e.clientY - rect.top;
  //       (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
  //       (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
  //     });
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  useEffect(() => {
  // Disable spotlight effect on touch devices
  if ("ontouchstart" in window) return;

  const handleMouseMove = (e: MouseEvent) => {
    document.querySelectorAll('.spotlight-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

  return (
    <div className="home-container">
      <Navbar />
      {/* Mathematical Background Pattern - Canvas */}
      <MathBackground />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="logo-accent">
            <span className="epsilon-symbol">€</span>
          </div>
          <h1 className="hero-title">EKASUTRAM</h1>
          <p className="hero-subtitle">The Official Mathematics Club</p>
          <p className="hero-college">Vishwakarma Institute of Technology, Pune</p>
          <div className="button-group">
            <button
              className="cta-button primary"
              onClick={() => window.open('https://chat.whatsapp.com/KMwpp2O5f0H1Ad6JftmPsj?mode=hqrt1', '_blank')}
            >
              Join Our Community
            </button>
            <button
              className="cta-button secondary"
              onClick={() => navigate('/about')}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-card card-1">∫x²dx</div>
          <div className="floating-card card-2">e^(iπ)</div>
          <div className="floating-card card-3">∑∞</div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card spotlight-card">
              <div className="card-border"></div>
              <div className="card-content">
                <h3>Our Mission</h3>
                <p>
                  To enable everyone to enjoy and gain access to mathematics through engaging activities,
                  practical learning, and collaborative problem-solving.
                </p>
              </div>
            </div>
            <div className="mission-card spotlight-card">
              <div className="card-border"></div>
              <div className="card-content">
                <h3>Our Vision</h3>
                <p>
                  To create a vibrant community where students develop mathematical thinking, critical
                  reasoning, and teamwork skills in an enthusiastic and supportive environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
