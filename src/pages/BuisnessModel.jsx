import { Link } from "react-router-dom";

const features = [
  { name: "Merchandise Store", path: "/merchandise-store" },
  { name: "Furniture & Utensils", path: "/furniture-utensils" },
  { name: "Digital Invites", path: "/digital-invites" },
  { name: "Floor Projection", path: "/floor-projection" },
  { name: "Educational Modules", path: "/educational-modules" },
  { name: "NFT Marketplace", path: "/nft-marketplace" },
];

export default function BusinessModel() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Business Model</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="block px-6 py-6 bg-orange-200 hover:bg-orange-300 rounded-xl shadow text-lg font-semibold text-center transition"
          >
            {feature.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
