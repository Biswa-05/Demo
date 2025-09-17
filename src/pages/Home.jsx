// src/pages/Home.jsx
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import bgKolam from "../assets/kolam-bg.jpg"

export default function Home() {
  const navigate = useNavigate()

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <div
      className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgKolam})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />

      {/* Animated Content */}
      <motion.div
        className="relative z-10 p-10 text-white"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gold drop-shadow-lg"
          variants={fadeUp}
        >
          Kolam Studio
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-100 leading-relaxed"
          variants={fadeUp}
        >
          Discover the mathematical beauty of traditional Indian Kolam designs —
          where <span className="text-gold font-semibold">art</span> meets{" "}
          <span className="text-deeporange font-semibold">geometry</span> and
          culture.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-4"
          variants={fadeUp}
        >
          {/* Top row: Start Exploring + Upload */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate("/draw")}>Start Exploring</Button>
            <Button onClick={() => navigate("/upload")}>Upload & Analyze</Button>
          </div>

          {/* Bottom: Learn About Kolams */}
          <div>
            <Button variant="secondary" onClick={() => navigate("/history")}>
              Learn About Kolams
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
