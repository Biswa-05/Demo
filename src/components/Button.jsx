// src/components/Button.jsx
import React from "react"
import { motion } from "framer-motion"

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-200"

  const variants = {
    primary: "bg-[#FFD700] text-black hover:bg-yellow-400",
    accent: "bg-[#FF5722] text-white hover:bg-orange-600",
    secondary: "bg-white/90 text-black hover:bg-white",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
