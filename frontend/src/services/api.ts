import axios from "axios";

// Access the environment variable (Vite requirement: prefix with VITE_)
// Added fallback to localhost for development stability
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// --- Resources APIs ---
// Fetches study resources, optionally filtered by subject
export const getResources = (subject?: string) =>
  API.get("/resources", { params: { subject } });

// Uploads a PDF resource as multipart/form-data
export const uploadResource = (formData: FormData) =>
  API.post("/resources/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Deletes a specific resource by ID
export const deleteResource = (id: number) =>
  API.delete(`/resources/${id}`);

// --- Admin APIs ---
// Used for password-protected access to the admin dashboard
export const verifyAdminPassword = async (password: string) => {
    return await API.post("/admin/verify-password", { password });
};

// Admin: Upload a new fun game question
export const uploadGame = (gameData: any) =>
  API.post("/admin/game/upload", gameData);

// --- Game APIs ---
// User: Get the current active game question
export const getCurrentGame = () =>
  API.get("/resources/game/current");

// User: Get the Top 10 high scores
export const getLeaderboard = () =>
  API.get("/resources/game/leaderboard");

// User: Submit a new score after completing a challenge
export const submitScore = (scoreData: { playerName: string; timeTakenMs: number }) =>
  API.post("/resources/game/submit-score", scoreData);