import React, { useState } from "react";
import { motion } from "framer-motion";

export default function EducationalModules() {
  const [licenseInquiry, setLicenseInquiry] = useState(false);
  const [subscription, setSubscription] = useState(false);

  return (
    <motion.div
      className="p-6 min-h-[80vh] bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-50 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      style={{ fontFamily: 'Poppins, Quicksand, sans-serif' }}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-400 to-pink-400 drop-shadow-lg tracking-tight"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        Educational Modules
      </motion.h2>

      <motion.p
        className="mb-6 text-lg text-gray-700 font-medium"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Interactive learning platforms that teach <span className="font-bold text-orange-500">geometry, symmetry, and algorithms</span> through Kolam art. Suitable for <span className="text-pink-500 font-semibold">schools, individuals, and corporate training</span>.
      </motion.p>

      {/* Service Options */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.h3
          className="text-2xl font-bold mb-3 text-orange-600 drop-shadow"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Our Services for You
        </motion.h3>
  <ul className="list-disc list-inside space-y-2 text-base text-gray-800">
          <motion.li whileHover={{ scale: 1.05, color: "#f59e42" }}>
            <span className="font-semibold text-orange-500">Gamified Learning Access:</span> Subscribe for interactive Kolam modules that make math and art fun and engaging.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fb7185" }}>
            <span className="font-semibold text-pink-500">School & University Licensing:</span> Bring Kolam learning to your institution with special licensing packages.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fbbf24" }}>
            <span className="font-semibold text-yellow-500">Corporate Workshops:</span> Team-building and creativity sessions using Kolam math and art.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#60a5fa" }}>
            <span className="font-semibold text-blue-500">Certification Programs:</span> Earn credentials in advanced Kolam mathematics and design.
          </motion.li>
        </ul>
        {/* Kolam Symmetry Game Link */}
        <div className="flex flex-col items-center justify-center mt-8">
          <a
            href="/KolamSymmetryGame"
            className="inline-block px-8 py-3 rounded-full font-bold shadow-lg text-lg bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 tracking-wide border-2 border-blue-200"
            style={{ textDecoration: 'none' }}
          >
            🎮 Try the Kolam Symmetry Game
          </a>
          <span className="text-xs text-gray-500 mt-2 mb-2">Interactive game to learn Kolam symmetry concepts</span>
        </div>
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => setSubscription(!subscription)}
            className="px-8 py-3 rounded-full font-bold shadow-lg text-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 tracking-wide mr-4"
            whileHover={{ scale: 1.09, boxShadow: "0 4px 24px #fb7185" }}
            whileTap={{ scale: 0.97 }}
          >
            {subscription ? "Subscribed: Learning Access" : "Subscribe for Learning Access"}
          </motion.button>
        </div>
      </motion.section>

      {/* Licensing Inquiry Section */}
      <motion.section
        className="mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.h3
          className="text-2xl font-bold mb-3 text-blue-600 drop-shadow"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          School & University Licensing
        </motion.h3>
        <p className="mb-3 text-base text-gray-700">
          Interested in bringing Kolam learning to your institution? Inquire below for special licensing and access.
        </p>

        <motion.button
          onClick={() => setLicenseInquiry(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-bold shadow-lg text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #60a5fa" }}
          whileTap={{ scale: 0.96 }}
        >
          School & University Licensing Inquiry
        </motion.button>

        {licenseInquiry && (
          <motion.div
            className="mt-5 p-5 border-2 border-blue-200 rounded-xl bg-blue-50 shadow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-blue-700 font-medium">
              Licensing inquiry form coming soon! Contact us for institutional access.
            </p>
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  );
}
