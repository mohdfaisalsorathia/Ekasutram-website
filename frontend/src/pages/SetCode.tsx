import { useEffect, useState } from "react";
<<<<<<< HEAD
import Navbar from "../components/Navbar";
=======
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5

const SetCode = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
<<<<<<< HEAD
        height: "100vh",
=======
        height: "100vh", // Full viewport height
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
        width: "100%",
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
<<<<<<< HEAD
      <Navbar />

      <main
        style={{
          flex: 1,
=======
      {/* 1. THE NAVBAR AREA
          If your real navbar is a separate component,
          you can remove this placeholder. */}
      <nav
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          padding: "0 2rem",
          borderBottom: "1px solid #222",
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 10,
        }}
      >
        <div style={{ color: "#3b82f6", fontWeight: "bold", fontSize: "1.2rem" }}>
          SetCode
        </div>
        {/* Your nav links would go here */}
      </nav>

      {/* 2. THE MAIN CONTENT AREA */}
      <main
        style={{
          flex: 1, // Takes up all remaining vertical space
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "radial-gradient(circle at center, #111 0%, #000 100%)",
        }}
      >
        {/* Animated Background Glow */}
        <div
          style={{
            position: "absolute",
            width: "40vw",
            height: "40vw",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "pulse 6s infinite ease-in-out",
          }}
        />

        {/* Text Content */}
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <h1
            style={{
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Coming <span style={{
              color: "#3b82f6",
              textShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
            }}>Soon</span>
          </h1>

          <div
            style={{
              width: show ? "60px" : "0px",
              height: "4px",
              background: "#3b82f6",
              margin: "20px auto",
              transition: "width 1s ease 0.5s",
              borderRadius: "2px"
            }}
          />

          <p
            style={{
              color: "#888",
              fontSize: "1rem",
              letterSpacing: "0.2rem",
              textTransform: "uppercase",
              opacity: show ? 1 : 0,
              transition: "opacity 1.2s ease 0.8s",
            }}
          >
            Great things are in the works
          </p>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        body { margin: 0; font-family: sans-serif; }
      `}</style>
    </div>
  );
};

export default SetCode;