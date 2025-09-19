
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function DigitalInvites() {
  const [isPremium, setIsPremium] = useState(false);
  const [customOrder, setCustomOrder] = useState(false);
  const [subscription, setSubscription] = useState(false);

  return (
    <motion.div
      className="p-6 min-h-[80vh] bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-50 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      style={{ fontFamily: 'Poppins, Quicksand, sans-serif' }}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 drop-shadow-lg tracking-tight"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        Digital Invites
      </motion.h2>

      {/* Overview */}
      <motion.p
        className="mb-6 text-lg text-gray-700 font-medium"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Create beautiful <span className="font-bold text-pink-500">Kolam-themed</span> digital invitations for weddings, festivals,
        and events. Choose from free templates or unlock <span className="text-orange-500 font-semibold">premium customizable</span>
        designs with animations and high-res downloads.
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
          Freemium & Premium
        </motion.h3>
        <ul className="list-disc list-inside space-y-2 text-base text-gray-800">
          <motion.li whileHover={{ scale: 1.05, color: "#f472b6" }}>Free basic templates with watermark and limited export options.</motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fb923c" }}>Premium subscription unlocks exclusive templates, high-res exports, animation effects, and watermark removal.</motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#f59e42" }}>Pay-per-order custom invites: Fully personalized design service with detailed event integration.</motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fbbf24" }}>Physical printed invitation delivery options available at extra cost.</motion.li>
        </ul>
      </motion.section>

      {/* Premium Subscription Button - Coming Soon */}
      <div className="flex justify-center mt-6 mb-8">
        <motion.button
          className="px-8 py-3 rounded-full font-bold shadow-lg text-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 tracking-wide mr-4"
          whileHover={{ scale: 1.09, boxShadow: '0 4px 24px #fb7185' }}
          whileTap={{ scale: 0.97 }}
          disabled
        >
          Subscription (Coming Soon)
        </motion.button>
      </div>

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
          Custom Invite Orders
        </motion.h3>
        <p className="mb-3 text-base text-gray-700">
          Need a fully custom Kolam invite with your event details, photos, and
          specific design requests? Place an order to get a tailor-made invite.
        </p>

        <motion.button
          onClick={() => setCustomOrder(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-bold shadow-lg text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #60a5fa" }}
          whileTap={{ scale: 0.96 }}
        >
          Place Custom Order
        </motion.button>

        {customOrder && (
          <motion.div
            className="mt-5 p-5 border-2 border-blue-200 rounded-xl bg-blue-50 shadow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-blue-700 font-medium">
              Custom Invite Order form coming soon! You will be able to upload event
              info and images here.
            </p>
          </motion.div>
        )}
      </motion.section>

      {/* Physical Print Option */}
      <motion.section
        className="mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.h3
          className="text-2xl font-bold mb-3 text-yellow-600 drop-shadow"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Print & Delivery
        </motion.h3>
        <p className="text-base text-gray-700">
          Upgrade your digital invites to premium physical prints on beautiful paper,
          delivered anywhere. Perfect for traditional guests.
        </p>
      </motion.section>
    </motion.div>
  );
}
