import "../styles/Team.css";
<<<<<<< HEAD
import { useState, useRef, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
import MathBackground from "../components/MathBackground";
import Navbar from "../components/Navbar";

type Member = {
  name: string;
  role: string;
  bio: string;
};

const teamMembers: Member[] = [
<<<<<<< HEAD
  { name: "Team Member", role: "Management Secretary", bio: "Oversees overall planning and coordination of club activities, ensuring events are well-organized with clear responsibilities and efficient communication between teams." },
  { name: "Team Member", role: "Management Secretary", bio: "Maintains structure, discipline, and smooth execution of all initiatives through strategic planning and coordination." },
  { name: "Team Member", role: "Aesthetic Secretary", bio: "Maintains the visual identity of Ekasutram through poster design, presentations, and consistent theming across all platforms while aligning with the club's academic spirit." },
  { name: "Team Member", role: "Branding Secretary", bio: "Manages public image and outreach through strategic promotion, social media presence, and collaborations to build a strong, recognizable identity for Ekasutram." },
  { name: "Team Member", role: "Branding Secretary", bio: "Ensures Ekasutram reaches and inspires a wider audience through effective branding strategies and community engagement." },
  { name: "Team Member", role: "Content Secretary", bio: "Curates and creates mathematical content for events, challenges, and online platforms with a focus on higher-order thinking questions and engaging material." },
  { name: "Team Member", role: "Content Secretary", bio: "Designs captions and written material that reflect the club's intellectual depth while keeping content student-friendly and accessible." },
  { name: "Team Member", role: "Technical Secretary", bio: "Handles digital platforms, online events, and technical tools to ensure seamless execution of virtual challenges and presentations." },
  { name: "Team Member", role: "Technical Secretary", bio: "Provides technical support and manages technology infrastructure for all club activities and initiatives." },
  { name: "Team Member", role: "Technical Secretary", bio: "Ensures smooth technical operations across all digital platforms and virtual events." },
  { name: "Team Member", role: "Technical Secretary", bio: "Manages and maintains all technical aspects of Ekasutram's digital presence and online activities." },
  { name: "Team Member", role: "Finance & Sponsorship Secretary", bio: "Manages financial planning, budgeting, and maintains financial transparency for all club activities." },
  { name: "Team Member", role: "Finance & Sponsorship Secretary", bio: "Works towards securing sponsorships and support for events, ensuring all activities are well-funded and sustainably executed without compromising quality." }
=======
  { name: "Ravi Kumar", role: "Tech Lead", bio: "Backend systems, cloud architecture, mentoring." },
  { name: "Sneha Patel", role: "Design Head", bio: "UI/UX vision, aesthetics, and product design." },
  { name: "Aditya Rao", role: "Developer", bio: "Frontend development and interactive UI." },
  { name: "Neha Sharma", role: "Content Lead", bio: "Outreach, content strategy, and storytelling." },
  { name: "Priya Kapoor", role: "Project Manager", bio: "Planning, coordination, delivery." },
  { name: "Rahul Mehta", role: "AI Specialist", bio: "ML systems and intelligent solutions." }
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
];

export default function Team() {
  const [active, setActive] = useState<Member | null>(null);
<<<<<<< HEAD
  const [rotation, setRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const scrollDebounce = 800; // milliseconds between rotations

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (carouselRef.current && carouselRef.current.contains(e.target as Node)) {
        const now = Date.now();
        if (now - lastScrollTime.current < scrollDebounce) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        lastScrollTime.current = now;

        const angleStep = 360 / teamMembers.length;
        // Scroll down = move right (positive rotation), Scroll up = move left (negative rotation)
        const direction = e.deltaY > 0 ? angleStep : -angleStep;
        setRotation(prev => prev + direction);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);
=======
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5

  return (
    <section className="team-page">
      <Navbar />
      {/* Mathematical Background Pattern - Canvas */}
<<<<<<< HEAD
      <MathBackground showSymbols={true} />
=======
      <MathBackground />
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5

      <div className="team-container">
        <h1 className="team-heading">Our Team</h1>
        <p className="team-subheading">
          Meet the people driving Ekasutram — creativity, logic, leadership.
        </p>
<<<<<<< HEAD
        <p className="scroll-hint">Scroll to navigate team members</p>

        <div className="carousel-wrapper" ref={carouselRef}>
          <div className="carousel-container">
            <div className="carousel" style={{ transform: `rotateY(${rotation}deg)` }}>
              {teamMembers.map((m, i) => {
                const angle = (360 / teamMembers.length) * i;
                return (
                  <div
                    key={i}
                    className="team-card-3d"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(450px)`
                    }}
                    onClick={() => setActive(m)}
                  >
                    <div className="avatar" />
                    <h3>{m.name}</h3>
                    <p className="member-role">{m.role}</p>
                  </div>
                );
              })}
            </div>
          </div>
=======

        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div key={i} className="team-card" onClick={() => setActive(m)}>
              <div className="avatar" />
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
        </div>
      </div>

      <div className="team-info-section">
        <div className="info-content">
<<<<<<< HEAD
          <h2>Our Team Structure</h2>
          <p>
            Ekasutram's team is organized into specialized roles, each contributing uniquely
            to the club's mission of promoting mathematical thinking and problem-solving excellence.
            From planning and coordination to technical execution and creative branding, our team
            members work collaboratively to create an engaging and impactful mathematical community.
          </p>
          <p>
            Together, we bring diverse skills and perspectives to foster an environment where
            curiosity meets challenge, and where students can explore mathematics beyond traditional
            boundaries through structured learning and hands-on experiences.
=======
          <h2>Why Ekasutram?</h2>
          <p>
            At Ekasutram, we believe in the power of collaboration and innovation. 
            Our diverse team brings together expertise from various domains—technology, 
            design, content, and strategy—to create meaningful solutions that make a difference.
          </p>
          <p>
            We're not just building products; we're building a community of learners, 
            creators, and innovators who are passionate about pushing boundaries and 
            exploring new possibilities.
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
          </p>
        </div>
      </div>

<<<<<<< HEAD
=======
      <footer className="team-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ekasutram Club</h3>
            <p>Building tomorrow's solutions today</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/resources">Resources</a>
            <a href="/events">Events</a>
            <a href="/about">About</a>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <a href="mailto:contact@ekasutram.com">contact@ekasutram.com</a>
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Ekasutram Club. All rights reserved.</p>
        </div>
      </footer>
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5

      {active && (
        <div className="popup-overlay" onClick={() => setActive(null)}>
          <div className="popup-card" onClick={e => e.stopPropagation()}>
            <div className="popup-avatar" />
            <div>
              <h2>{active.name}</h2>
              <h4>{active.role}</h4>
              <p>{active.bio}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
