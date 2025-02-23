import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/landingpage/Navbar";
import LandingPage from "./routes/Landingpage";
import AdminLogin from "./routes/AdminLogin";
import VocabularyCreate from "./routes/admin/VocabularyCreate";
import ChapterPage from "./routes/ChapterPage";

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
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/vocabulary/create" element={<VocabularyCreate />} />
        <Route path="/chapter/:chapter" element={<ChapterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
