import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import UploadAnalyze from "./pages/UploadAnalyze";
import DrawCanvas from "./pages/DrawCanvas";
import CoordinateCanvas from "./pages/CoordinateCanvas";
import MathAnalysis from "./pages/MathAnalysis";
import LoginPage from "./pages/LoginPage";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Guard for protected routes
function RequireAuth({ authUser, children }) {
  const location = useLocation();
  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

export default function App() {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem("authUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (authUser) localStorage.setItem("authUser", JSON.stringify(authUser));
    else localStorage.removeItem("authUser");
  }, [authUser]);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-fixed bg-center"
  style={{ backgroundImage: "url('/bg-pattern.png')" }}
    >
      <Navbar authUser={authUser} setAuthUser={setAuthUser} />
      <main className="flex-grow container mx-auto p-6 bg-white/80 rounded-2xl shadow-lg mt-6 min-h-[80vh]">
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
          <Route path="/login" element={<LoginPage setAuthUser={setAuthUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
