import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <motion.nav
      className="bg-gradient-to-r from-orange-400/80 via-yellow-300/80 to-orange-300/80 backdrop-blur-md shadow-md p-4 flex justify-between items-center text-black"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-2xl font-bold tracking-wide">Kolam Studio</h1>
      <div className="space-x-6 font-medium">
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/upload">Upload & Analyze</Link>
        <Link to="/draw">Free Draw</Link>
        <Link to="/coordinates">Coordinates</Link>
        <Link to="/math">Math</Link>
      </div>
    </motion.nav>
  )
}
