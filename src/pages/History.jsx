import React from "react"
import { motion } from "framer-motion"
import bgHistory from "../assets/history-bg.png"

export default function History() {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  }

  return (
    <div
      className="relative min-h-screen py-16 px-6"
      style={{
        backgroundImage: `url(${bgHistory})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Page Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-serif font-bold text-yellow-200 drop-shadow-lg text-center mb-12"
          variants={fadeUp}
        >
          The History of Kolams
        </motion.h1>

        {/* Origins */}
        <motion.section className="mb-12" variants={fadeUp}>
          <h2 className="text-3xl font-serif font-semibold text-yellow-300 mb-4">
            Origins
          </h2>
          <p className="text-lg text-gray-100 leading-relaxed font-light">
            The tradition of Kolams traces back over{" "}
            <span className="text-yellow-200 font-medium">2,000 years</span> in
            South India. Women would draw intricate patterns every morning using
            rice flour at the thresholds of homes. The designs symbolized{" "}
            <span className="font-medium">welcoming prosperity</span>,{" "}
            <span className="font-medium">warding off evil</span>, and even{" "}
            <span className="font-medium">feeding small insects and birds</span>,
            making Kolams both spiritual and ecological.
          </p>
        </motion.section>

        {/* Cultural Meaning */}
        <motion.section className="mb-12" variants={fadeUp}>
          <h2 className="text-3xl font-serif font-semibold text-yellow-300 mb-4">
            Cultural Meaning
          </h2>
          <p className="text-lg text-gray-100 leading-relaxed font-light">
            Kolams are not just decorative patterns but carry deep cultural
            values. They represent{" "}
            <span className="text-yellow-200 font-medium">
              discipline, patience, and devotion
            </span>
            , often passed down from mothers to daughters. Each region of India
            has its own unique variant:
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-2 marker:text-yellow-400 text-gray-200">
            <li>
              <span className="font-semibold text-yellow-200">Tamil Nadu</span> –
              Symmetry-rich dotted Kolams drawn daily at thresholds.
            </li>
            <li>
              <span className="font-semibold text-yellow-200">
                Andhra Pradesh & Telangana
              </span>{" "}
              – Known as <em>Muggulu</em>, often drawn during Sankranti.
            </li>
            <li>
              <span className="font-semibold text-yellow-200">Karnataka</span> –
              <em>Rangoli</em> designs combining dots and free-hand artistry.
            </li>
            <li>
              <span className="font-semibold text-yellow-200">
                Maharashtra & Gujarat
              </span>{" "}
              – Geometric <em>Rangoli</em> with bright colors.
            </li>
          </ul>
        </motion.section>

        {/* Mathematical Significance */}
        <motion.section className="mb-12" variants={fadeUp}>
          <h2 className="text-3xl font-serif font-semibold text-yellow-300 mb-4">
            Mathematical Significance
          </h2>
          <p className="text-lg text-gray-100 leading-relaxed font-light">
            Kolams are a fascinating blend of{" "}
            <span className="text-yellow-200 font-medium">mathematics</span> and{" "}
            <span className="text-yellow-200 font-medium">art</span>. Their
            patterns often demonstrate:
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-2 marker:text-yellow-400 text-gray-200">
            <li>
              <span className="font-semibold">Symmetry & Geometry</span> – Built
              around axes of symmetry, circles, and grids.
            </li>
            <li>
              <span className="font-semibold">Algorithmic Patterns</span> –
              Recursive and rule-based, almost like{" "}
              <span className="italic">programming with dots</span>.
            </li>
            <li>
              <span className="font-semibold">Graph Theory</span> – Kolams can
              be represented as{" "}
              <span className="italic">Eulerian paths</span> where a continuous
              line covers a grid without overlaps.
            </li>
            <li>
              <span className="font-semibold">Fractals & Complexity</span> –
              Larger Kolams repeat patterns at multiple scales, resembling
              fractals in nature.
            </li>
          </ul>
        </motion.section>

        {/* Modern Relevance */}
        <motion.section className="mb-12" variants={fadeUp}>
          <h2 className="text-3xl font-serif font-semibold text-yellow-300 mb-4">
            Modern Relevance
          </h2>
          <p className="text-lg text-gray-100 leading-relaxed font-light">
            Today, Kolams continue to inspire{" "}
            <span className="text-yellow-200 font-medium">
              artists, mathematicians, and computer scientists
            </span>
            . They are studied in fields like{" "}
            <span className="text-yellow-300 font-bold">
              computational design
            </span>
            ,{" "}
            <span className="text-yellow-300 font-bold">
              pattern recognition
            </span>
            , and{" "}
            <span className="text-yellow-300 font-bold">AI-generated art</span>.
            Digital tools have given new life to this ancient practice,
            connecting tradition with technology.
          </p>
        </motion.section>

        {/* Closing Note */}
        <motion.section
          className="text-center mt-16 border-t border-gray-400/40 pt-8"
          variants={fadeUp}
        >
          <h2 className="text-2xl font-serif font-semibold mb-4 text-yellow-200">
            Kolams: Where Art Meets Mathematics
          </h2>
          <p className="text-gray-200 leading-relaxed max-w-2xl mx-auto font-light">
            Kolams are more than patterns — they are living expressions of{" "}
            <span className="text-yellow-300 font-bold">culture</span>,{" "}
            <span className="text-yellow-300 font-bold">mathematics</span>, and{" "}
            <span className="text-yellow-300 font-bold">spirituality</span>.
            From ancient courtyards to digital platforms, they continue to
            evolve while preserving their timeless essence.
          </p>
        </motion.section>
      </motion.div>
    </div>
  )
}
