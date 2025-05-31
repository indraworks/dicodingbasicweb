import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import ArchivedPage from "./pages/ArchivedPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Aplikasi Catatan</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/new" element={<AddNotePage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/archived" element={<ArchivedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
