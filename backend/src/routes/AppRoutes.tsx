import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Resources from "../pages/Resources";
import Events from "../pages/Events";
import About from "../pages/About";
import Team from "../pages/Team";
import FunGames from "../pages/FunGames";
import SetCode from "../pages/SetCode";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/games" element={<FunGames />} />
        <Route path="/setcode" element={<SetCode />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
