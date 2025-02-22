import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/landingpage/Navbar";
import LandingPage from "./routes/Landingpage";

import { useState } from "react";

function App() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  return (
    <Router>
      <Navbar
        setSelectedChapter={setSelectedChapter}
        selectedChapter={selectedChapter}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
