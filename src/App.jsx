import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import History from "./pages/History"
import UploadAnalyze from "./pages/UploadAnalyze"
import DrawCanvas from "./pages/DrawCanvas"
import CoordinateCanvas from "./pages/CoordinateCanvas"
import MathAnalysis from "./pages/MathAnalysis"

export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/bg-pattern.jpg')" }}
    >
      <Navbar />
      <main className="flex-grow container mx-auto p-6 bg-white/80 rounded-2xl shadow-lg mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/upload" element={<UploadAnalyze />} />
          <Route path="/draw" element={<DrawCanvas />} />
          <Route path="/coordinates" element={<CoordinateCanvas />} />
          <Route path="/math" element={<MathAnalysis />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
