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

// Team Data - 5 key members
const teamMembers: Member[] = [
  { 
    name: "Sahil Kakad", 
    role: "Chairperson", 
    bio: "Leading Ekasutram with vision and dedication, overseeing all club activities and ensuring the growth of mathematical excellence among students."
  },
  { 
    name: "Aishwarya Kalshetti", 
    role: "Vice Chairperson", 
    bio: "Supporting the club's leadership and coordinating various initiatives to foster a vibrant mathematical community at VIT."
  },
  { 
    name: "Rohit Rathod", 
    role: "Event Coordinator", 
    bio: "Organizing and managing all club events, from competitions to workshops, ensuring seamless execution and maximum student engagement."
  },
  { 
    name: "Gaurav Rathi", 
    role: "Treasurer", 
    bio: "Managing the club's finances, budgeting for events, and ensuring transparent financial operations for all activities."
  },
  { 
    name: "Yash Manjare", 
    role: "PRO", 
    bio: "Handling public relations, maintaining the club's social media presence, and promoting events to build a strong community presence."
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
