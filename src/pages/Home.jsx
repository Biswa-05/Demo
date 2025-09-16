import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="text-center space-y-6">
      <motion.h1
        className="text-5xl font-bold text-orange-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Kolam Studio
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Discover the intersection of{" "}
        <span className="text-orange-600 font-semibold">traditional art</span>{" "}
        and{" "}
        <span className="text-yellow-600 font-semibold">mathematics</span>. Draw,
        upload, analyze, and celebrate the beauty of Kolams.
      </motion.p>

      <div className="flex justify-center space-x-6">
        <Link
          to="/draw"
          className="px-6 py-3 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 transition"
        >
          🎨 Start Drawing
        </Link>
        <Link
          to="/upload"
          className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition"
        >
          📸 Upload & Analyze
        </Link>
      </div>
    </div>
  )
}
