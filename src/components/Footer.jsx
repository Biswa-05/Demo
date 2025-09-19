import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="relative bg-gradient-to-br from-yellow-50 via-orange-100 to-pink-100 text-orange-700 pt-10 pb-6 mt-16 border-t-4 border-orange-200 shadow-xl overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-orange-200 to-pink-200 opacity-80 rounded-t-xl shadow-md" />

      {/* Main Project, Blessing, and Credits Section */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Kolam Heritage Project
        </span>
        <span className="text-base font-medium text-orange-500 tracking-wide mb-1">
          Preserving culture through technology
        </span>
      </div>

      <div className="flex flex-col items-center mb-4">
        <p className="text-2xl font-bold text-orange-600 mb-1 text-center">
          "எல்லா உயிர்களும் இன்புற்று வாழ வேண்டும்"
        </p>
        <p className="italic text-lg text-orange-500 text-center">
          "May all beings live in happiness"
        </p>
        <span className="text-sm text-orange-400 text-center -mt-1 mb-2">
          Traditional Tamil blessing embedded in every Kolam
        </span>
      </div>

      <div className="flex flex-col items-center mb-2">
        <p className="mb-1 text-center">
          <span className="font-semibold">© 2025 Kolam Heritage Project</span>
          <br />
          Made with <span className="text-red-500">♥</span> for cultural preservation
        </p>
        <p className="mb-0 mt-1 text-center">
          Special thanks to traditional Kolam artists and cultural institutions
          <br />
          <span className="italic text-orange-500">
            Supporting UNESCO's Intangible Cultural Heritage initiatives
          </span>
        </p>
      </div>

      {/* Decorative Bottom Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-gradient-to-r from-yellow-200 via-orange-100 to-pink-100 opacity-70 rounded-b-xl shadow" />

      {/* Team Section at the very bottom - simple */}
      <motion.div
        className="max-w-4xl mx-auto px-2 py-2 mt-4 bg-white/60 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="text-sm font-semibold text-orange-600 mb-1">Our Team</div>
        <div className="text-center text-xs text-orange-500 font-medium mb-2">Students of BCA, KIIT University</div>
        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
          <motion.div
            className="flex items-center bg-orange-50/80 rounded px-2 py-1 shadow-sm text-xs"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className="font-semibold text-orange-700 mr-1">Biswajit Dash</span>
            <a href="mailto:bdash@gmail.com" className="text-blue-600 hover:underline">
              bdash@gmail.com
            </a>
          </motion.div>
          <motion.div
            className="flex items-center bg-orange-50/80 rounded px-2 py-1 shadow-sm text-xs"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="font-semibold text-orange-700 mr-1">K.Vinay Kumar</span>
            <a href="mailto:vk4984630@gmail.com" className="text-blue-600 hover:underline">
              vk4984630@gmail.com
            </a>
          </motion.div>
          <motion.div
            className="flex items-center bg-orange-50/80 rounded px-2 py-1 shadow-sm text-xs"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <span className="font-semibold text-orange-700 mr-1">Anish Kumar</span>
            <a href="mailto:anishkumar200507@gmail.com" className="text-blue-600 hover:underline">
              anishkumar200507@gmail.com
            </a>
          </motion.div>
          <motion.div
            className="flex items-center bg-orange-50/80 rounded px-2 py-1 shadow-sm text-xs"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="font-semibold text-orange-700 mr-1">Vivek Salunkhe</span>
            <a href="mailto:viveksalunkhe110@gmail.com" className="text-blue-600 hover:underline">
              viveksalunkhe110@gmail.com
            </a>
          </motion.div>
          <motion.div
            className="flex items-center bg-orange-50/80 rounded px-2 py-1 shadow-sm text-xs"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <span className="font-semibold text-orange-700 mr-1">Chaitiparna Chandra</span>
            <a href="mailto:chaitiparna33@gmail.com" className="text-blue-600 hover:underline">
              chaitiparna33@gmail.com
            </a>
          </motion.div>
          <motion.div
            className="flex items-center bg-orange-50/80 rounded px-2 py-1 shadow-sm text-xs"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <span className="font-semibold text-orange-700 mr-1">Subrat Rout</span>
            <a href="mailto:shubxtra@gmail.com" className="text-blue-600 hover:underline">
              shubxtra@gmail.com
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
