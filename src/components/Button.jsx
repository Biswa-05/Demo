// src/components/Button.jsx
import { motion } from "framer-motion"

export default function Button({ children, onClick, variant = "primary" }) {
  const base =
    "relative inline-block px-6 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden"

  const styles = {
    primary: `${base} bg-gradient-to-r from-saffron to-deeporange text-white shadow-lg`,
    secondary: `${base} border-2 border-gold text-gold bg-transparent`,
  }

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={styles[variant]}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>

      {/* Common glow effect for both variants */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold/40 to-deeporange/40 blur-xl opacity-0 hover:opacity-100 transition duration-300"></span>

      {/* Variant-specific hover fill */}
      {variant === "secondary" && (
        <span className="absolute inset-0 rounded-xl bg-gold opacity-0 hover:opacity-20 transition duration-300"></span>
      )}
    </motion.button>
  )
}
