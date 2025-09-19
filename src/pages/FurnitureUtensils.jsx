import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FurnitureUtensils() {
  const [customOrder, setCustomOrder] = useState(false);
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
        Furniture & Utensils
      </motion.h2>

      <motion.p
        className="mb-6 text-lg text-gray-700 font-medium"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Explore exclusive <span className="font-bold text-orange-500">Kolam-themed</span> furniture and utensils crafted for your home. Customize designs or subscribe for <span className="text-pink-500 font-semibold">seasonal curated home accessory boxes</span>.
      </motion.p>

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
          Our Services for You
        </motion.h3>
        <ul className="list-disc list-inside space-y-2 text-base text-gray-800">
          <motion.li whileHover={{ scale: 1.05, color: "#f59e42" }}>
            <span className="font-semibold text-orange-500">Ready-to-Order:</span> Instantly purchase from our curated stock of Kolam-inspired furniture and utensils, crafted for your home.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fb7185" }}>
            <span className="font-semibold text-pink-500">Custom Design Service:</span> Share your ideas and let us create personalized Kolam furniture or utensils, with AI-powered design previews just for you.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fbbf24" }}>
            <span className="font-semibold text-yellow-500">Seasonal Subscription Boxes:</span> Receive exclusive, limited-edition Kolam home accessories delivered to your door every season.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#60a5fa" }}>
            <span className="font-semibold text-blue-500">Artisan Collaborations:</span> Support traditional artisans and enjoy unique, handcrafted Kolam pieces made in partnership with local creators.
          </motion.li>
        </ul>
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => setSubscription(!subscription)}
            className="px-8 py-3 rounded-full font-bold shadow-lg text-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 tracking-wide mr-4"
            whileHover={{ scale: 1.09, boxShadow: "0 4px 24px #fb7185" }}
            whileTap={{ scale: 0.97 }}
          >
            {subscription ? "Subscribed: Seasonal Boxes" : "Subscribe for Seasonal Boxes"}
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
          Custom Furniture & Utensils
        </motion.h3>
        <p className="mb-3 text-base text-gray-700">
          Request personalized Kolam design furniture or utensils for your home. We offer AI-assisted design previews and partnership options.
        </p>


        <div className="flex flex-wrap gap-4">
          <motion.button
            onClick={() => setCustomOrder(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-bold shadow-lg text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #60a5fa" }}
            whileTap={{ scale: 0.96 }}
          >
            Request Custom Furniture & Utensils
          </motion.button>
          <motion.a
            href="/stock-gallery"
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-full font-bold shadow-lg text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #fbbf24" }}
            whileTap={{ scale: 0.96 }}
            as="button"
          >
            Order from Stock
          </motion.a>
        </div>

        {customOrder && (
          <motion.div
            className="mt-5 p-5 border-2 border-blue-200 rounded-xl bg-blue-50 shadow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-blue-700 font-medium">
              Custom order form coming soon! Upload your preferences here.
            </p>
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  );
}
