import "../styles/Team.css";
import { useState } from "react";
import MathBackground from "../components/MathBackground";
import Navbar from "../components/Navbar";

type Member = {
  name: string;
  role: string;
  bio: string;
  image?: string;
};

// Team Data - 4 key members
const teamMembers: Member[] = [
  { 
    name: "Dr. Name Surname", 
    role: "Head", 
    bio: "Leading the mathematics club with vision and expertise in fostering mathematical thinking and problem-solving excellence."
  },
  { 
    name: "Prof. Name Surname", 
    role: "Faculty Advisor", 
    bio: "Guiding students through complex mathematical concepts and mentoring the next generation of mathematicians."
  },
  { 
    name: "Student Name", 
    role: "President", 
    bio: "Coordinating club activities, events, and initiatives to create an engaging mathematical community."
  },
  { 
    name: "Student Name", 
    role: "Vice President", 
    bio: "Supporting leadership and managing various technical and organizational aspects of the club."
  }
];

export default function Team() {
  const [active, setActive] = useState<Member | null>(null);


  return (
    <section className="team-page">
      <Navbar />
      <MathBackground showSymbols={true} />

      <div className="team-container">
        <h1 className="team-heading">Our Team</h1>
        <p className="team-subheading">
          Meet the people driving Ekasutram — creativity, logic, leadership.
        </p>

        {/* Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-box" onClick={() => setActive(member)}>
              <div className="member-photo-placeholder">
                <span className="photo-icon">👤</span>
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role-tag">{member.role}</p>
              <p className="member-short-bio">{member.bio.substring(0, 80)}...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="team-info-section">
        <div className="info-content">
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
          </p>
        </div>
      </div>

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
}
