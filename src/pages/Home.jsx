// src/pages/Home.jsx
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import bgKolam from "../assets/kolam-bg.jpg"
import ganeshaKolam from "../assets/GaneshKolam.png"

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
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  }
  const bounceIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 10 },
    },
  }
  const popIn = {
    hidden: { opacity: 0, y: 30, rotate: -5 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
      {/* Ganesh Kolam Image Blended Center */}
      <img
        src={ganeshaKolam}
        alt="Ganesh Kolam"
        className="pointer-events-none absolute top-1/2 left-1/2 max-w-[400px] max-h-[400px] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: 0.85,
          mixBlendMode: "multiply", // smooth blend with bg
          filter: "brightness(1.2) contrast(1.2)" // pops white lines
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

      {/* Animated Content */}
      <motion.div
        className="relative z-10 p-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
          variants={bounceIn}
        >
          Kolam Studio
        </motion.h1>
        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg md:text-2xl max-w-2xl mx-auto font-light text-gray-100 leading-relaxed"
          variants={fadeUp}
        >
          Discover the mathematical beauty of traditional Indian Kolam designs —
          where{" "}
          <span className="text-yellow-300 font-semibold">art</span> meets{" "}
          <span className="text-orange-400 font-semibold">geometry</span> and
          culture.
        </motion.p>
        {/* Buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-6"
          variants={container}
        >
          {/* Top row: Start Exploring + Upload */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={popIn}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" onClick={() => navigate("/draw")}>
                Start Exploring
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="accent" onClick={() => navigate("/upload")}>
                Upload & Analyze
              </Button>
            </motion.div>
          </motion.div>
          {/* Bottom: Learn About Kolams */}
          <motion.div variants={popIn}>
            <motion.div
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 20px rgba(255, 200, 100, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="secondary" onClick={() => navigate("/math")}>
                Learn About Kolams
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
