import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FloorProjection() {
  const [rentalInquiry, setRentalInquiry] = useState(false);
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
        Floor Projection
      </motion.h2>

      <motion.p
        className="mb-6 text-lg text-gray-700 font-medium"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Bring Kolam art to life with our <span className="font-bold text-orange-500">event floor projection services</span>. Ideal for <span className="text-pink-500 font-semibold">weddings, festivals, and corporate events</span>.
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
            <span className="font-semibold text-orange-500">Pay-per-Event Packages:</span> Book Kolam floor projections for your special occasion, with setup and support included.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fb7185" }}>
            <span className="font-semibold text-pink-500">Event Planner Subscriptions:</span> Flexible plans for decorators and planners to access our projection services all year round.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#fbbf24" }}>
            <span className="font-semibold text-yellow-500">IoT Projector Rentals:</span> Rent smart Kolam stencil projectors with on-site service and technical support.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05, color: "#60a5fa" }}>
            <span className="font-semibold text-blue-500">Custom Animated Designs:</span> Commission unique, animated Kolam projections tailored to your event theme.
          </motion.li>
        </ul>
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => setSubscription(!subscription)}
            className="px-8 py-3 rounded-full font-bold shadow-lg text-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 tracking-wide mr-4"
            whileHover={{ scale: 1.09, boxShadow: "0 4px 24px #fb7185" }}
            whileTap={{ scale: 0.97 }}
          >
            {subscription ? "Subscribed: Event Planner Access" : "Subscribe for Event Planner Access"}
          </motion.button>
        </div>
      </motion.section>

      {/* Rental Inquiry Section */}
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
          Hardware Rental & Inquiry
        </motion.h3>
        <p className="mb-3 text-base text-gray-700">
          Interested in renting our Kolam projection hardware? Inquire below and our team will assist you with details and booking.
        </p>

        <motion.button
          onClick={() => setRentalInquiry(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-600 text-white rounded-full font-bold shadow-lg text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #a78bfa" }}
          whileTap={{ scale: 0.96 }}
        >
          Inquire Hardware Rental
        </motion.button>

        {rentalInquiry && (
          <motion.div
            className="mt-5 p-5 border-2 border-purple-200 rounded-xl bg-purple-50 shadow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-purple-700 font-medium">
              Rental inquiry form coming soon! Details for projection hardware here.
            </p>
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  );
}
