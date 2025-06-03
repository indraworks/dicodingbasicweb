import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FiMoon, FiSun, FiPlus, FiArchive, FiHome } from "react-icons/fi";

import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import { getActiveNotes } from "./utils/data";

function App() {
  const [theme, setTheme] = useState("dark");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    getActiveNotes();
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-container">
        <header>
          <h2>CatatanKu</h2>
          <nav className="navigation">
            <ul>
              <li>
                <Link to={"/"}>
                  <FiHome />
                  Home
                </Link>
              </li>

              <li>
                <Link to="/archive">
                  <FiArchive />
                  Archive
                </Link>
              </li>
              <li>
                <button onClick={toggleTheme} className="toggle-theme">
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              }
            />
            <Route path="/notes/edit/:id" element={<EditPage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            Yesterday Membuat Aplikasi Catatan dengan React
            <Route
              path="/archive"
              element={
                <ArchivePage
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              }
            />
            <Route path="/notes/new" element={<AddNotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

//router utama kita !
