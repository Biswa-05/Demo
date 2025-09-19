import React from "react";
import { motion } from "framer-motion";
import Img1 from "../assets/1.png";
import Img2 from "../assets/2.png";
import Img3 from "../assets/3.png";
import Img4 from "../assets/4.png";
import Img5 from "../assets/5.png";
import Img6 from "../assets/6.png";
import Img7 from "../assets/7.png";
import Img8 from "../assets/8.png";
import Img9 from "../assets/9.png";
import Img10 from "../assets/10.png";
import Img11 from "../assets/11.png";
import Img12 from "../assets/12.png";
import Img13 from "../assets/M13.png";

export default function AIGallery() {
  const images = [
    { src: Img1, label: "Kolam AI Sample 1" },
    { src: Img2, label: "Kolam AI Sample 2" },
    { src: Img3, label: "Kolam AI Sample 3" },
    { src: Img4, label: "Kolam AI Sample 4" },
    { src: Img5, label: "Kolam AI Sample 5" },
    { src: Img6, label: "Kolam AI Sample 6" },
    { src: Img7, label: "Kolam AI Sample 7" },
    { src: Img8, label: "Kolam AI Sample 8" },
    { src: Img9, label: "Kolam AI Sample 9" },
    { src: Img10, label: "Kolam AI Sample 10" },
    { src: Img11, label: "Kolam AI Sample 11" },
    { src: Img12, label: "Kolam AI Sample 12" },
    { src: Img13, label: "Kolam AI Sample 13" }
  ];
  return (
    <motion.div
      className="p-8 min-h-[80vh] bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-100 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      style={{ fontFamily: 'Poppins, Quicksand, sans-serif' }}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 drop-shadow-lg tracking-tight text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        AI Kolam Image Gallery
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((img, idx) => (
          <motion.div
            key={img.label}
            className="rounded-xl overflow-hidden shadow-lg bg-white/80 hover:shadow-2xl transition"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #fb7185" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.07, duration: 0.5 }}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-64 object-cover object-center"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
            />
            <div className="p-4 text-center">
              <span className="block text-lg font-semibold text-orange-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{img.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Many More Options Section */}
      <motion.div
        className="mt-12 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7, type: 'spring' }}
      >
        <motion.div
          className="px-8 py-4 rounded-full font-bold shadow-lg text-xl bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white mb-2 tracking-wide"
          whileHover={{ scale: 1.07, boxShadow: '0 4px 24px #fbbf24' }}
          whileTap={{ scale: 0.97 }}
        >
          Many More Options
        </motion.div>
        <span className="text-lg text-orange-600 font-semibold mt-2 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Many more images and designs are yet to come. Stay tuned!
        </span>
      </motion.div>
    </motion.div>
  );
}
