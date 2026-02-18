import MathBackground from "../components/MathBackground";
import Navbar from "../components/Navbar";
import "../styles/Events.css";

const Events = () => {
  const events = [
    {
      title: "Bhaskar – Integrating VIT",
      date: "TBA",
      description: "Dive into a thrilling blend of logic, mystery, and adventure. Bhaskar brings you three challenges in one epic event: outsmart opponents in Quizzle, solve cryptic clues in the Murder Mystery Challenge, and race through campus in a Treasure Hunt. Form your team, strategize together, and compete for glory.",
      category: "Interactive Challenge",
      highlights: [
        "🧩 Three unique challenges in one event",
        "👥 Team-based competition (₹100 per team)",
        "🏆 Test your logic, problem-solving, and teamwork",
        "🎯 Open to all students across disciplines"
      ],
      cta: "Assemble your squad and register now—adventure awaits!"
    },
    {
      title: "Bhaskar – SetCode",
      date: "TBA",
      description: "Challenge your coding prowess in SetCode, a high-intensity algorithmic competition designed for problem-solvers. Compete individually in separate tracks tailored for first-years and seniors, then sharpen your skills further with an exclusive speaker session and hands-on workshop. Write code. Solve problems. Dominate the leaderboard.",
      category: "Coding Competition",
      highlights: [
        "💻 Individual coding contest with beginner & advanced tracks",
        "⏱️ Time-bound, logic-driven problem-solving",
        "🎤 Speaker session + workshop included",
        "🚀 Build skills, compete fiercely, and level up"
      ],
      cta: "Ready to code? Register and prove your algorithmic edge."
    }
  ];

  return (
    <div className="events-container">
      <Navbar />
      <MathBackground showSymbols={false} />

      <section className="events-hero" style={{ position: "relative", overflow: "hidden" }}>
        <MathBackground
          showSymbols={true}
          style={{ position: "absolute", zIndex: 0 }}
        />
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
              <div key={index} className="event-card">
                <div className="card-border"></div>
                <div className="card-content">
                  <span className="event-category">{event.category}</span>
                  <h3>{event.title}</h3>
                  <p className="event-date">{event.date}</p>
                  <p className="event-description">{event.description}</p>
                  
                  {event.highlights && (
                    <ul className="event-highlights">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                  
                  <p className="event-cta-text">{event.cta}</p>
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