import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import UploadAnalyze from "./pages/UploadAnalyze";
import DrawCanvas from "./pages/DrawCanvas";
import CoordinateCanvas from "./pages/CoordinateCanvas";
import MathAnalysis from "./pages/MathAnalysis";
import LoginPage from "./pages/LoginPage";

// Guard for protected routes
function RequireAuth({ authUser, children }) {
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  // Initialize authUser from localStorage if present
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist authUser in localStorage on change
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/bg-pattern.jpg')" }}
    >
      <Navbar authUser={authUser} setAuthUser={setAuthUser} />
      <main className="flex-grow container mx-auto p-6 bg-white/80 rounded-2xl shadow-lg mt-6">
        <Routes>
          <Route path="/" element={<Home authUser={authUser} />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/upload"
            element={
              <RequireAuth authUser={authUser}>
                <UploadAnalyze />
              </RequireAuth>
            }
          />
          <Route
            path="/draw"
            element={
              <RequireAuth authUser={authUser}>
                <DrawCanvas />
              </RequireAuth>
            }
          />
          <Route
            path="/coordinates"
            element={
              <RequireAuth authUser={authUser}>
                <CoordinateCanvas />
              </RequireAuth>
            }
          />
          <Route
            path="/math"
            element={
              <RequireAuth authUser={authUser}>
                <MathAnalysis />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={<LoginPage setAuthUser={setAuthUser} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}