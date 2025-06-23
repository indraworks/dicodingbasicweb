import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  FiMoon,
  FiSun,
  FiPlus,
  FiArchive,
  FiHome,
  FiLogOut,
  FiLogIn,
} from "react-icons/fi";

//import context (provider and consumer) :
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { NotesProvider } from "./context/NotesContext";
import { UserProvider, useUser } from "./context/UserContext";

import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import RequiredAuth from "./components/RequiredAuth";
import AuthForm from "./components/AuthForm";
//yg disini yg ditambahkan adalah protected route !

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotesProvider>
          <Router>
            <AppContent />
          </Router>
        </NotesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
export default App;

function AppContent() {
  const { theme, toggleTheme } = useTheme(); //update ! dato contextTheme!
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading, logout } = useUser();

  console.log("Current auth state", { user, loading });

  return (
    <>
      {/* keterangan ada pada catatan !  */}
      <div className="app-container data-theme={theme}">
        <header>
          <h2>CatatanKu</h2>
          <nav className="navigation">
            <div className="nav-group nav-left">
              <Link to={"/"} className="nav-link">
                <FiHome />
                Home
              </Link>

              <Link to="/archive " className="nav-link">
                <FiArchive />
                Archive
              </Link>
            </div>
            {/* righ -align user section  */}
            <div className="nav-group nav-right">
              {user && (
                <>
                  <span className="user-greeting">
                    Hello, <strong>{user.name}</strong>
                  </span>

                  <button
                    onClick={logout}
                    className="nav-button"
                    title="Logout"
                  >
                    <FiLogOut />
                  </button>
                </>
              )}
            </div>

            <button onClick={toggleTheme} className="nav-button toggle-theme">
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<AuthForm />} />
            <Route element={<ProtectedRoutes />}>
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
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

//Protected Route with Loading Componentes
function ProtectedRoutes({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner">
          <p>Checking Authentication ....</p>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

/*CATATAN :
keterangan [data-theme] variable di css sudah gak pakai useEffect 
karena sudah diset di provider/context :
selector data-theme yg ada di style.css : tanda [ ] merupakan variable yg bisa diubah !
kita ubah lewat context dimana  const [theme,toggleTheme] = useTheme()

[data-theme="light"] {
  --background: #DDDDDD;
  --suface: #FFFFFF;
  --on-background: #333333;
  --on-background-grey: #6d6d6d;
  --on-surface: #333333;
}

kita tinggal buat wrapper <div  className=appcontainer data-theme ={theme}> </div>




*/
