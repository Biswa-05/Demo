import React from "react";
import DotGridCanvas from "../components/DotGridCanvas";

export default function DrawCanvas() {
  return (
  <div className="min-h-[200vh] py-10 bg-gradient-to-br from-yellow-200 via-orange-100 to-yellow-50 relative">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-6 drop-shadow">
        Free Drawing Canvas
      </h1>
      <DotGridCanvas />

      {/* Coming Soon Pop-up */}
  <div className="absolute left-1/2 -translate-x-1/2 bottom-48 z-50 w-[98vw] max-w-3xl">
        <div className="px-8 py-4 rounded-2xl shadow-xl border-2 border-yellow-400 bg-gradient-to-r from-yellow-100 via-orange-50 to-yellow-200/90 backdrop-blur-xl flex flex-col items-center animate-pulse">
          <span className="block text-lg md:text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 bg-clip-text text-transparent tracking-wide mb-1 drop-shadow-lg animate-gradient-x uppercase text-center">
            coming soon !!
          </span>
          <span className="block text-base md:text-lg font-semibold text-orange-900 text-center mb-1">
            The user can draw free hand kolams, and by CNN model training and drawing analysis, our model will say what patterns it matches or is similar to, and give tips to enhance or regenerate it.
          </span>
        </div>
      </div>
    </div>
  );
}
