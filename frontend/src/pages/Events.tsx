import { useEffect } from "react";
import MathBackground from "../components/MathBackground";
import Navbar from "../components/Navbar";
import "../styles/Events.css";

const Events = () => {
  useEffect(() => {
    // Spotlight Logic for Cards
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

  const events = [
    {
      title: "Math Quiz Competition",
      date: "March 15, 2026",
      description: "Test your mathematical knowledge in this exciting quiz competition with amazing prizes.",
      category: "Competition"
    },
    {
      title: "Workshop: Advanced Calculus",
      date: "March 22, 2026",
      description: "Deep dive into advanced calculus concepts with practical applications and problem-solving.",
      category: "Workshop"
    },
    {
      title: "Guest Lecture Series",
      date: "April 5, 2026",
      description: "Learn from industry experts about real-world applications of mathematics.",
      category: "Lecture"
    },
    {
      title: "Mathematical Olympiad",
      date: "April 18, 2026",
      description: "Showcase your problem-solving skills in our annual mathematical olympiad.",
      category: "Competition"
    }
  ];

  return (
    <div className="events-container">
      <Navbar />
<<<<<<< HEAD
      <MathBackground showSymbols={false} />

      <section className="events-hero" style={{ position: "relative", overflow: "hidden" }}>
        <MathBackground
          showSymbols={true}
          style={{ position: "absolute", zIndex: 0 }}
        />
=======
      <MathBackground />
      
      <section className="events-hero">
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
        <div className="hero-glow"></div>
        <div className="hero-content">
          <h1 className="events-title">Upcoming Events</h1>
          <p className="events-subtitle">Join us for exciting mathematical challenges and learning opportunities</p>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <div className="events-grid">
            {events.map((event, index) => (
              <div key={index} className="event-card spotlight-card">
                <div className="card-border"></div>
                <div className="card-content">
                  <span className="event-category">{event.category}</span>
                  <h3>{event.title}</h3>
                  <p className="event-date">{event.date}</p>
                  <p className="event-description">{event.description}</p>
                  <button className="cta-button primary">Register Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;