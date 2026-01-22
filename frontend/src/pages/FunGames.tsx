import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { getCurrentGame, getLeaderboard, submitScore } from './api';
import Navbar from '../components/Navbar';
import MathBackground from '../components/MathBackground';

const FunGames: React.FC = () => {
  // Game Data States
  const [question, setQuestion] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  // User Session States
  const [playerName, setPlayerName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  // Game Flow States
  const [isActive, setIsActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  // Fetch question and leaderboard on load
  const loadData = async () => {
    try {
      const [qRes, lRes] = await Promise.all([getCurrentGame(), getLeaderboard()]);
      setQuestion(qRes.data);
      setLeaderboard(lRes.data);
    } catch (err) {
      console.error("Error loading game data", err);
    }
  };

  useEffect(() => {
    loadData();

    // Refresh leaderboard every 10 seconds to keep it "live"
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const startChallenge = () => {
    if (!playerName.trim()) return alert("Please enter your name!");
    setIsRegistered(true);
    setIsActive(true);
    setFeedback('');
    setStartTime(Date.now());
  };

  const handleAnswer = async (selectedOption: string) => {
    if (!question) return;

    if (selectedOption === question.correctAnswer) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;

      setFeedback('Correct! 🛠️ Submitting score...');
      setIsActive(false);

      try {
        await submitScore({
          playerName: playerName,
          timeTakenMs: timeTaken
        });
        setIsGameOver(true);
        // Refresh leaderboard immediately to show the new score
        const lRes = await getLeaderboard();
        setLeaderboard(lRes.data);
      } catch (err) {
        console.error(err);
        alert("Correct answer, but failed to save score to the leaderboard.");
      }
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <MathBackground showSymbols={false} />

      <div style={styles.gameContainer}>
        <div style={styles.gameCard}>
          <h1 style={styles.title}>Ekasutram Math Challenge</h1>

          {/* Step 1: Name Registration */}
          {!isRegistered ? (
            <div style={styles.startScreen}>
              <p style={styles.description}>Enter your name to start the challenge!</p>
              <input
                placeholder="Your Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={styles.input}
              />
              <br /><br />
              <button onClick={startChallenge} style={styles.mainBtn}>Join Game</button>
            </div>
          ) : isGameOver ? (
            <div style={styles.startScreen}>
              <h2 style={{ color: '#37b24d' }}>Challenge Complete!</h2>
              <p>Check the leaderboard below to see your rank.</p>
              <button onClick={() => window.location.reload()} style={styles.mainBtn}>Play Again</button>
            </div>
          ) : (
            /* Step 2: The Question UI */
            <div style={styles.quizArea}>
              {question ? (
                <>
                  <div style={styles.questionBox}>
                    <p style={styles.label}>Current Question:</p>
                    <h2 style={styles.questionText}>{question.questionText}</h2>
                  </div>
                  <div style={styles.optionsGrid}>
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        style={styles.optionBtn}
                      >
                        <span style={{ color: '#4dabf7', fontWeight: 'bold' }}>{opt}:</span> {question[`option${opt}` as keyof typeof question]}
                      </button>
                    ))}
                  </div>
                  <p style={styles.feedback}>{feedback}</p>
                </>
              ) : (
                <p>Waiting for Admin to upload a question...</p>
              )}
            </div>
          )}

          {/* Step 3: Real-time Leaderboard */}
          <div style={styles.leaderboardSection}>
            <h3 style={styles.lbTitle}>🏆 Top 10 Leaderboard</h3>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Rank</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Time (s)</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <tr key={index} style={entry.playerName === playerName ? styles.highlightRow : styles.tr}>
                      <td style={styles.td}>{index + 1}</td>
                      <td style={styles.td}>{entry.playerName}</td>
                      <td style={styles.td}>{(entry.timeTakenMs / 1000).toFixed(2)}s</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ padding: '20px', color: '#868e96' }}>No scores yet. Be the first!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
=======
import { getCurrentGame, getLeaderboard, submitScore } from '../services/api';

const FunGames: React.FC = () => {
    // Game Data States
    const [question, setQuestion] = useState<any>(null);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    // User Session States
    const [playerName, setPlayerName] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);

    // Game Flow States
    const [isActive, setIsActive] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);

    // Fetch question and leaderboard on load
    const loadData = async () => {
        try {
            const [qRes, lRes] = await Promise.all([getCurrentGame(), getLeaderboard()]);
            setQuestion(qRes.data);
            setLeaderboard(lRes.data);
        } catch (err) {
            console.error("Error loading game data", err);
        }
    };

    useEffect(() => {
        loadData();

        // Refresh leaderboard every 10 seconds to keep it "live"
        const interval = setInterval(loadData, 10000);
        return () => clearInterval(interval);
    }, []);

    const startChallenge = () => {
        if (!playerName.trim()) return alert("Please enter your name!");
        setIsRegistered(true);
        setIsActive(true);
        setFeedback('');
        setStartTime(Date.now());
    };

    const handleAnswer = async (selectedOption: string) => {
        if (!question) return;

        if (selectedOption === question.correctAnswer) {
            const endTime = Date.now();
            const timeTaken = endTime - startTime;

            setFeedback('Correct! 🛠️ Submitting score...');
            setIsActive(false);

            try {
                await submitScore({
                    playerName: playerName,
                    timeTakenMs: timeTaken
                });
                setIsGameOver(true);
                // Refresh leaderboard immediately to show the new score
                const lRes = await getLeaderboard();
                setLeaderboard(lRes.data);
            } catch (err) {
                console.error(err);
                alert("Correct answer, but failed to save score to the leaderboard.");
            }
        } else {
            setFeedback('Incorrect. Try again!');
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.gameCard}>
                <h1 style={styles.title}>Ekasutram Math Challenge</h1>

                {/* Step 1: Name Registration */}
                {!isRegistered ? (
                    <div style={styles.startScreen}>
                        <p style={styles.description}>Enter your name to start the challenge!</p>
                        <input
                            placeholder="Your Name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            style={styles.input}
                        />
                        <br /><br />
                        <button onClick={startChallenge} style={styles.mainBtn}>Join Game</button>
                    </div>
                ) : isGameOver ? (
                    <div style={styles.startScreen}>
                        <h2 style={{color: '#37b24d'}}>Challenge Complete!</h2>
                        <p>Check the leaderboard below to see your rank.</p>
                        <button onClick={() => window.location.reload()} style={styles.mainBtn}>Play Again</button>
                    </div>
                ) : (
                    /* Step 2: The Question UI */
                    <div style={styles.quizArea}>
                        {question ? (
                            <>
                                <div style={styles.questionBox}>
                                    <p style={styles.label}>Current Question:</p>
                                    <h2 style={styles.questionText}>{question.questionText}</h2>
                                </div>
                                <div style={styles.optionsGrid}>
                                    {['A', 'B', 'C', 'D'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleAnswer(opt)}
                                            style={styles.optionBtn}
                                        >
                                            <span style={{color: '#4dabf7', fontWeight: 'bold'}}>{opt}:</span> {question[`option${opt}` as keyof typeof question]}
                                        </button>
                                    ))}
                                </div>
                                <p style={styles.feedback}>{feedback}</p>
                            </>
                        ) : (
                            <p>Waiting for Admin to upload a question...</p>
                        )}
                    </div>
                )}

                {/* Step 3: Real-time Leaderboard */}
                <div style={styles.leaderboardSection}>
                    <h3 style={styles.lbTitle}>🏆 Top 10 Leaderboard</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.th}>Rank</th>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Time (s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.length > 0 ? (
                                leaderboard.map((entry, index) => (
                                    <tr key={index} style={entry.playerName === playerName ? styles.highlightRow : styles.tr}>
                                        <td style={styles.td}>{index + 1}</td>
                                        <td style={styles.td}>{entry.playerName}</td>
                                        <td style={styles.td}>{(entry.timeTakenMs / 1000).toFixed(2)}s</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} style={{padding: '20px', color: '#868e96'}}>No scores yet. Be the first!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    pageWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '20px' },
    gameCard: { background: '#1e1e1e', color: '#fff', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '600px', textAlign: 'center', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    title: { fontSize: '1.8rem', marginBottom: '20px', color: '#4dabf7' },
    description: { color: '#adb5bd', marginBottom: '20px' },
    input: { background: '#2c2c2c', border: '1px solid #444', padding: '12px', borderRadius: '8px', color: '#fff', textAlign: 'center', width: '80%', fontSize: '1rem' },
    mainBtn: { padding: '12px 30px', background: '#4dabf7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    label: { fontSize: '0.8rem', color: '#868e96', marginBottom: '5px' },
    questionText: { fontSize: '1.4rem', margin: '10px 0 25px 0' },
    optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    optionBtn: { padding: '15px', background: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '10px', cursor: 'pointer', transition: '0.2s', textAlign: 'left', fontSize: '1rem' },
    feedback: { marginTop: '20px', color: '#fab005', fontWeight: 'bold', height: '24px' },
    leaderboardSection: { marginTop: '40px', borderTop: '1px solid #333', paddingTop: '20px' },
    lbTitle: { fontSize: '1.2rem', color: '#ffd43b', marginBottom: '15px' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    tableHeader: { borderBottom: '2px solid #333' },
    th: { padding: '10px', color: '#868e96', fontSize: '0.9rem' },
    tr: { borderBottom: '1px solid #222' },
    td: { padding: '12px 10px' },
    highlightRow: { background: 'rgba(77, 171, 247, 0.2)', color: '#4dabf7', fontWeight: 'bold' }
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
};

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: { position: 'relative', minHeight: '100vh' },
  gameContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '100px 20px 20px', position: 'relative', zIndex: 1 },
  gameCard: { background: 'rgba(30, 30, 30, 0.9)', backdropFilter: 'blur(10px)', color: '#fff', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '600px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  title: { fontSize: '1.8rem', marginBottom: '20px', color: '#4dabf7', fontFamily: 'Inter, sans-serif' },
  description: { color: '#adb5bd', marginBottom: '20px' },
  input: { background: '#2c2c2c', border: '1px solid #444', padding: '12px', borderRadius: '8px', color: '#fff', textAlign: 'center', width: '80%', fontSize: '1rem' },
  mainBtn: { padding: '12px 30px', background: '#4dabf7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  label: { fontSize: '0.8rem', color: '#868e96', marginBottom: '5px' },
  questionText: { fontSize: '1.4rem', margin: '10px 0 25px 0' },
  optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  optionBtn: { padding: '15px', background: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '10px', cursor: 'pointer', transition: '0.2s', textAlign: 'left', fontSize: '1rem' },
  feedback: { marginTop: '20px', color: '#fab005', fontWeight: 'bold', height: '24px' },
  leaderboardSection: { marginTop: '40px', borderTop: '1px solid #333', paddingTop: '20px' },
  lbTitle: { fontSize: '1.2rem', color: '#ffd43b', marginBottom: '15px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  tableHeader: { borderBottom: '2px solid #333' },
  th: { padding: '10px', color: '#868e96', fontSize: '0.9rem' },
  tr: { borderBottom: '1px solid #222' },
  td: { padding: '12px 10px' },
  highlightRow: { background: 'rgba(77, 171, 247, 0.2)', color: '#4dabf7', fontWeight: 'bold' }
};

export default FunGames;
