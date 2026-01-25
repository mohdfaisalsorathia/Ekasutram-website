import { useEffect, useState } from "react";
import { getResources, uploadResource, deleteResource, uploadGame } from "../services/api";
import MathBackground from "../components/MathBackground";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router

const AdminResources = () => {
    // --- Auth State ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // --- Existing Resource States ---
    const [resources, setResources] = useState<any[]>([]);
    const [subject, setSubject] = useState("");
    const [chapterName, setChapterName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // --- New Fun Games States ---
    const [gameData, setGameData] = useState({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A"
    });

    useEffect(() => {
        // --- Password Logic ---
        const checkAuth = () => {
            const SECRET_HASH = "VklUQEVrYXN1dHJhbQ=="; // This is VIT@Ekasutram encoded
            const sessionAuth = sessionStorage.getItem("admin_auth");

            if (sessionAuth === "true") {
                setIsAuthenticated(true);
                fetchResources();
            } else {
                const password = prompt("Enter Admin Password:");
                if (password && btoa(password) === SECRET_HASH) {
                    sessionStorage.setItem("admin_auth", "true");
                    setIsAuthenticated(true);
                    fetchResources();
                } else {
                    alert("Unauthorized access!");
                    navigate("/"); // Redirect to home
                }
            }
        };

        checkAuth();
    }, [navigate]);

    const fetchResources = async () => {
        const res = await getResources();
        setResources(res.data);
    };

    // --- Existing HandleUpload, handleGameUpload, handleDelete logic remains exactly the same ---
    const handleUpload = async () => {
        if (!file) return alert("Select a PDF");
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("subject", subject);
            formData.append("chapterName", chapterName);
            formData.append("file", file);
            await uploadResource(formData);
            await fetchResources();
            setSubject(""); setChapterName(""); setFile(null);
            alert("Uploaded successfully");
        } catch (err) { alert("Upload failed"); } finally { setLoading(false); }
    };

    const handleGameUpload = async () => {
        if (!gameData.questionText || !gameData.optionA) return alert("Please fill all fields");
        try {
            setLoading(true);
            await uploadGame(gameData);
            alert("New Question Live! Leaderboard has been reset.");
            setGameData({ questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "A" });
        } catch (err) {
            alert("Game upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this resource?")) return;
        try {
            await deleteResource(id);
            await fetchResources();
        } catch (err) { alert("Delete failed"); }
    };

    // --- Conditional Rendering ---
    if (!isAuthenticated) return null; // Don't show anything while checking/failed

    return (
        <div style={{ padding: "20px", color: "white", minHeight: "100vh", position: "relative" }}>
            <MathBackground showSymbols={false} />

            <div style={{ position: "relative", zIndex: 2 }}>
                <h2>Admin Dashboard</h2>

                <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
                    {/* --- STUDY RESOURCES SECTION --- */}
                    <div style={{ flex: 1, border: "1px solid #333", padding: "15px", minWidth: "300px", background: "#1a1a1a", borderRadius: "8px" }}>
                        <h3>1. Upload Study Resource (PDF)</h3>
                        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", background: "#333", border: "none", color: "white" }} /><br />
                        <input placeholder="Chapter Name" value={chapterName} onChange={(e) => setChapterName(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px", background: "#333", border: "none", color: "white" }} /><br />
                        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ marginBottom: "10px" }} /><br />
                        <button onClick={handleUpload} disabled={loading} style={{ padding: "8px 16px", background: "#007bff", border: "none", color: "white", cursor: "pointer", borderRadius: "4px" }}>
                            {loading ? "Uploading..." : "Upload PDF"}
                        </button>
                    </div>

                    {/* --- FUN GAMES SECTION --- */}
                    <div style={{ flex: 1, border: "1px solid #333", padding: "15px", minWidth: "300px", background: "#1a1a1a", borderRadius: "8px" }}>
                        <h3>2. Update Fun Game Question</h3>
                        <textarea
                            placeholder="Enter Question"
                            value={gameData.questionText}
                            onChange={(e) => setGameData({ ...gameData, questionText: e.target.value })}
                            style={{ width: "100%", height: "60px", marginBottom: "10px", background: "#333", border: "none", color: "white", padding: "8px" }}
                        /><br />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                            <input placeholder="Option A" value={gameData.optionA} onChange={(e) => setGameData({ ...gameData, optionA: e.target.value })} style={{ background: "#333", border: "none", color: "white", padding: "8px" }} />
                            <input placeholder="Option B" value={gameData.optionB} onChange={(e) => setGameData({ ...gameData, optionB: e.target.value })} style={{ background: "#333", border: "none", color: "white", padding: "8px" }} />
                            <input placeholder="Option C" value={gameData.optionC} onChange={(e) => setGameData({ ...gameData, optionC: e.target.value })} style={{ background: "#333", border: "none", color: "white", padding: "8px" }} />
                            <input placeholder="Option D" value={gameData.optionD} onChange={(e) => setGameData({ ...gameData, optionD: e.target.value })} style={{ background: "#333", border: "none", color: "white", padding: "8px" }} />
                        </div>

                        <label>Correct Answer: </label>
                        <select value={gameData.correctAnswer} onChange={(e) => setGameData({ ...gameData, correctAnswer: e.target.value })} style={{ background: "#333", border: "none", color: "white", padding: "5px", marginLeft: "10px", marginBottom: "15px" }}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select><br />

                        <button onClick={handleGameUpload} disabled={loading} style={{ backgroundColor: "#28a745", color: "white", padding: "8px 16px", border: "none", cursor: "pointer", borderRadius: "4px" }}>
                            {loading ? "Updating Game..." : "Set New Question"}
                        </button>
                        <p style={{ fontSize: "12px", color: "orange", marginTop: "10px" }}>*Note: This will clear the current leaderboard!</p>
                    </div>
                </div>

                <hr style={{ borderColor: "#333", margin: "30px 0" }} />
                <h3>Uploaded Study Resources</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {resources.map((r) => (
                        <li key={r.id} style={{ background: "#1a1a1a", padding: "10px", marginBottom: "10px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span><strong>{r.subject}</strong> – {r.chapterName}</span>
                            <button onClick={() => handleDelete(r.id)} style={{ marginLeft: "10px", background: "transparent", border: "none", cursor: "pointer" }}>❌</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminResources;