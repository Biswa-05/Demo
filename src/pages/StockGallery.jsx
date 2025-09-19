import React from "react";
import { motion } from "framer-motion";

import F1 from "../assets/F1.png";
import F2 from "../assets/F2.png";
import F3 from "../assets/F3.png";
import F4 from "../assets/F4.png";
import F5 from "../assets/F5.png";
import F6 from "../assets/F6.png";
import F7 from "../assets/F7.png";
import F8 from "../assets/F8.png";
import F9 from "../assets/F9.png";
import F10 from "../assets/F10.png";
import F11 from "../assets/F11.png";

export default function StockGallery() {
  const images = [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11];

  return (
    <motion.div
      className="p-8 min-h-[80vh] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-100 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      style={{ fontFamily: 'Poppins, Quicksand, sans-serif' }}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-400 to-pink-400 drop-shadow-lg tracking-tight text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        Stock Gallery
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.length === 0 ? (
          <div className="col-span-full text-center text-lg text-orange-500 font-semibold">No stock images yet. Add images to assets and import them here.</div>
        ) : (
          images.map((img, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl overflow-hidden shadow-lg bg-white/80 hover:shadow-2xl transition"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #fb7185" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.07, duration: 0.5 }}
            >
              <img
                src={img}
                alt={`Stock Kolam ${idx + 1}`}
                className="w-full h-64 object-cover object-center"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
              />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
