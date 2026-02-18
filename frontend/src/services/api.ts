import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// --- Existing Resource APIs ---
export const getResources = (subject?: string) =>
  API.get("/resources", { params: { subject } });

export const uploadResource = (formData: FormData) =>
  API.post("/resources/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteResource = (id: number) =>
  API.delete(`/resources/${id}`);

// --- Updated Fun Games APIs (using the API instance) ---

// Admin: Upload new question
export const uploadGame = (gameData: any) =>
  API.post("/admin/game/upload", gameData);

// User: Get the current active question
export const getCurrentGame = () =>
  API.get("/resources/game/current");

// User: Get Top 10 scores
export const getLeaderboard = () =>
  API.get("/resources/game/leaderboard");

// User: Submit user score
export const submitScore = (scoreData: { playerName: string; timeTakenMs: number }) =>
  API.post("/resources/game/submit-score", scoreData);

// Use the 'API' instance you defined at the top
export const verifyAdminPassword = async (password: string) => {
    return await API.post("/admin/verify-password", { password });
};