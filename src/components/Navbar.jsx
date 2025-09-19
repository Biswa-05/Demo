import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Navbar({ authUser }) {
  return (
    <motion.nav
      className="bg-gradient-to-r from-orange-400/80 via-yellow-300/80 to-orange-300/80 backdrop-blur-md shadow-md p-4 flex justify-between items-center text-black"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-2xl font-bold tracking-wide">Kolam Studio</h1>
      <div className="space-x-6 font-medium">
        {[
          { to: "/", label: "Home" },
          { to: "/history", label: "History" },
          { to: "/upload", label: "Upload & Analyze" },
          { to: "/draw", label: "Free Draw" },
          { to: "/coordinates", label: "Coordinates" },
          { to: "/math", label: "Math" },
        ]
          .map((item) => (
            <motion.div
              key={item.to}
              whileHover={{ scale: 1.13, backgroundColor: "#fbbf24", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded transition-colors duration-200"
            >
              <Link to={item.to} className="px-3 py-1">
                {item.label}
              </Link>
            </motion.div>
          ))}
        {/* BusinessModel Button only for authenticated users */}
        {authUser && (
          <div className="relative inline-block group">
            <motion.div
              whileHover={{ scale: 1.13, backgroundColor: "#fbbf24", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded transition-colors duration-200"
            >
              <Link to="/business-model" className="px-3 py-1">
                BusinessModel
              </Link>
            </motion.div>
            {/* Dropdown menu */}
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 z-20">
              {[
                { name: "Merchandise Store", path: "/merchandise-store" },
                { name: "Furniture & Utensils", path: "/furniture-utensils" },
                { name: "Digital Invites", path: "/digital-invites" },
                { name: "Floor Projection", path: "/floor-projection" },
                { name: "Educational Modules", path: "/educational-modules" },
                { name: "NFT Marketplace", path: "/nft-marketplace" },
              ].map((feature) => (
                <Link
                  key={feature.path}
                  to={feature.path}
                  className="block px-5 py-3 text-base text-gray-800 hover:bg-orange-100 hover:text-orange-600 rounded transition-colors duration-150"
                >
                  {feature.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}
