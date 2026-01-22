import "../styles/About.css";
import MathBackground from "../components/MathBackground";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <section className="about-page">
      <Navbar />
      {/* Mathematical Background Pattern - Canvas */}
      <MathBackground showSymbols={true} />

      {/* Main Content */}
      <div className="about-container">
        <h1 className="about-heading">About Ekasutram</h1>
        <p className="about-subheading">
          Ekasutram is a mathematics-driven club focused on logic, reasoning,
          and analytical thinking beyond textbooks.
        </p>

        <div className="about-sections">
          <div className="about-card">
            <h2>Our Vision</h2>
            <p>
              To nurture logical thinking and analytical reasoning, creating a
              platform where curiosity meets challenge. We believe mathematics is
              about patterns, structure, and ideas—not just numbers.
            </p>
          </div>

          <div className="about-card">
            <h2>What We Do</h2>
            <p>
              Through interactive sessions, thought-provoking problems, competitions,
              and discussions, we encourage students to explore mathematics beyond
              textbooks and develop problem-solving excellence.
            </p>
          </div>

          <div className="about-card">
            <h2>Why Ekasutram?</h2>
            <p>
              We aim to develop clarity of thought, confidence in reasoning, and
              a deep appreciation for mathematical thinking that extends into
              real-world applications across all fields.
            </p>
          </div>
        </div>

        <div className="about-us-section">
          <h2 className="about-us-heading">About Us</h2>
          <p className="about-us-text">
            Ekasutram is the Mathematics Club dedicated to nurturing logical thinking,
            analytical reasoning, and problem-solving excellence. Rooted in the belief
            that mathematics is not just about numbers but about patterns, structure,
            and ideas, Ekasutram creates a platform where curiosity meets challenge.
          </p>
          <p className="about-us-text">
            Through interactive sessions, thought-provoking problems, competitions,
            and discussions, the club encourages students to explore mathematics beyond
            textbooks. Ekasutram aims to develop clarity of thought, confidence in reasoning,
            and a deep appreciation for mathematical thinking that extends into real-world applications.
          </p>
        </div>
      </div>




    </section>
  );
}