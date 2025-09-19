
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MerchandiseStore() {
  const [customOrder, setCustomOrder] = useState(false);

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
        Merchandise Store
      </motion.h2>

      {/* Overview */}
      <motion.p
        className="mb-6 text-lg text-gray-700 font-medium"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Shop authentic <span className="font-bold text-orange-500">Kolam-inspired</span> products including sarees, kurtas,t-shirts,shirts. Enjoy <span className="text-pink-500 font-semibold">exclusive designs</span>, customization options,
        and seasonal collections.
      </motion.p>

   
      <motion.div
        className="mb-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link to="/ai-gallery">
          <motion.button
            className="px-8 py-3 rounded-full font-bold shadow-lg text-lg bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 tracking-wide"
            whileHover={{ scale: 1.09, boxShadow: "0 4px 24px #fb7185" }}
            whileTap={{ scale: 0.97 }}
          >
            View AI Kolam Merch Gallery
          </motion.button>
        </Link>
      </motion.div>

      {/* Monetization Features */}
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
          Direct Sales & Print On Demand
        </motion.h3>
        <ul className="list-disc list-inside space-y-2 text-base text-gray-800">
          <motion.li whileHover={{ scale: 1.05, color: "#f59e42" }}>Purchase ready-made Kolam merchandise with detailed product views.</motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fb7185" }}>Print-on-demand options enable customized Kolam patterns on selected products.</motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fbbf24" }}>Limited edition and seasonal collections available at premium prices.</motion.li>
        </ul>
        <div className="flex justify-center mt-6">
          <motion.button
            className="px-8 py-3 rounded-full font-bold shadow-lg text-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 tracking-wide mr-4"
            whileHover={{ scale: 1.09, boxShadow: "0 4px 24px #fb7185" }}
            whileTap={{ scale: 0.97 }}
          >
            Subscription (Coming Soon)
          </motion.button>
        </div>
      </motion.section>


      {/* Custom Order Section */}
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
          Custom Designs & Wholesale
        </motion.h3>
        <p className="mb-3 text-base text-gray-700">
          Request personalized Kolam design merchandise or bulk orders for events and retail.
          We offer AI-assisted design previews and partnership options.
        </p>

        <motion.button
          onClick={() => setCustomOrder(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-bold shadow-lg text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #60a5fa" }}
          whileTap={{ scale: 0.96 }}
        >
          Request Custom Order
        </motion.button>

        {customOrder && (
          <motion.div
            className="mt-5 p-5 border-2 border-blue-200 rounded-xl bg-blue-50 shadow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-blue-700 font-medium">
              Custom order form coming soon! Here, you will upload your design preferences and order details.
            </p>
          </motion.div>
        )}
      </motion.section>

      {/* Affiliate & Partnerships */}
      <motion.section
        className="mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.h3
          className="text-2xl font-bold mb-3 text-pink-600 drop-shadow"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Affiliate & Partnerships
        </motion.h3>
        <p className="text-base text-gray-700">
          Join our affiliate program or collaborate with Kolam Studio to promote and distribute Kolam merchandise globally.
        </p>
      </motion.section>
    </motion.div>
  );
}
