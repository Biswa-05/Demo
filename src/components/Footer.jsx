import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      className="bg-orange-700 text-white text-center p-4 mt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p>✨ Kolam Studio © 2025 | Celebrating Culture & Geometry ✨</p>
    </motion.footer>
  )
}
