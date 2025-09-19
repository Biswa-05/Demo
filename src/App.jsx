import StockGallery from "./pages/StockGallery";
import KolamSymmetryGame from "./pages/KolamSymmetryGame";
import AIGallery from "./pages/AIGallery";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import UploadAnalyze from "./pages/UploadAnalyze";
import DrawCanvas from "./pages/DrawCanvas";
import CoordinateCanvas from "./pages/CoordinateCanvas";
import MathAnalysis from "./pages/MathAnalysis";
import LoginPage from "./pages/LoginPage";
import BusinessModel from "./pages/BuisnessModel";
import MerchandiseStore from "./pages/MerchandiseStore";
import FurnitureUtensils from "./pages/FurnitureUtensils";
import DigitalInvites from "./pages/DigitalInvites";
import FloorProjection from "./pages/FloorProjection";
import EducationalModules from "./pages/EducationalModules";
import NFTMarketplace from "./pages/NFTMarketplace";
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
          {/* New BusinessModel Route (Available to all users, no auth needed) */}
          <Route path="/business-model" element={<BusinessModel />} />
          <Route path="/merchandise-store" element={<MerchandiseStore />} />
          <Route path="/furniture-utensils" element={<FurnitureUtensils />} />
          <Route path="/digital-invites" element={<DigitalInvites />} />
          <Route path="/floor-projection" element={<FloorProjection />} />
          <Route path="/educational-modules" element={<EducationalModules />} />
          <Route path="/nft-marketplace" element={<NFTMarketplace />} />
          <Route path="/stock-gallery" element={<StockGallery />} />
          <Route path="/ai-gallery" element={<AIGallery />} />
          <Route path="/login" element={<LoginPage setAuthUser={setAuthUser} />} />
          <Route path="/KolamSymmetryGame" element={<KolamSymmetryGame />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
