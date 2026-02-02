import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
// import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* <Navbar /> */}
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
