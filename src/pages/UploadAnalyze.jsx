import { useRef, useState } from "react"
import { motion } from "framer-motion"
import detectDots from "../utils/dotDetection"

export default function UploadAnalyze() {
  const canvasRef = useRef(null)
  const [analysis, setAnalysis] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      const dots = detectDots(ctx, canvas.width, canvas.height)

      // Simple line connections
      const lines = []
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            lines.push({ from: dots[i], to: dots[j] })
          }
        }
      }

      setAnalysis({
        dotCount: dots.length,
        lineCount: lines.length,
        patterns: lines.length > 20 ? "Complex Symmetry" : "Simple Kolam",
      })

      // draw static image + patterns
      const draw = () => {
        // clear canvas each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // redraw uploaded image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // draw lines in black
        ctx.strokeStyle = "black"
        ctx.lineWidth = 1.5
        lines.forEach(({ from, to }) => {
          ctx.beginPath()
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
          ctx.stroke()
        })

        // draw dots in black
        dots.forEach(({ x, y }) => {
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = "black"
          ctx.fill()
        })

        requestAnimationFrame(draw)
      }

      draw()
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <div
      className="relative min-h-[180vh] py-10 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/Uploadimage.png')" }}
    >
      {/* Page Title */}
      <motion.h1
        className="text-6xl font-extrabold text-left bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,200,100,0.9)] max-w-2xl mx-auto md:mx-0"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Upload & Analyze Kolam
      </motion.h1>

      {/* Main Content */}
      <div className="mt-12 grid md:grid-cols-2 gap-10 items-start">
        {/* Upload & Canvas */}
        <motion.div
          className="p-6 rounded-2xl shadow-2xl bg-black/50 backdrop-blur-md border border-yellow-400 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="mb-6 cursor-pointer text-sm text-yellow-200 border border-dashed border-yellow-400 p-3 rounded-xl bg-black/60"
          />
          <canvas
            ref={canvasRef}
            className="border-4 border-yellow-400 rounded-xl shadow-md"
          />
        </motion.div>

        {/* Analysis Box */}
        {analysis && (
          <motion.div
            className="p-6 rounded-2xl shadow-xl bg-gradient-to-b from-black/70 via-black/60 to-black/50 text-yellow-100 border border-yellow-500"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 text-yellow-300 bg-black/50 px-4 py-2 rounded-lg inline-block">
              Kolam Insights
            </h2>
            <ul className="space-y-4 text-lg font-medium">
              <li className="border-b border-yellow-500/40 pb-2">
                ✨ Dots Detected:{" "}
                <span className="font-extrabold text-yellow-300">
                  {analysis.dotCount}
                </span>
              </li>
              <li className="border-b border-yellow-500/40 pb-2">
                🔗 Lines Connected:{" "}
                <span className="font-extrabold text-yellow-200">
                  {analysis.lineCount}
                </span>
              </li>
              <li className="border-b border-yellow-500/40 pb-2">
                🎨 Pattern Type:{" "}
                <span className="font-extrabold text-yellow-100">
                  {analysis.patterns}
                </span>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-yellow-400/10 backdrop-blur-lg text-center text-lg">
              🌟 <span className="font-semibold">Kolams</span> are not just art,
              they are{" "}
              <span className="text-yellow-300">geometry in motion!</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Coming Soon: Kolam Design Principles & AI/ML */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-40 z-50 w-[98vw] max-w-4xl"
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 3, delay: 0.5, type: 'spring', bounce: 0.2, ease: 'easeOut' }}
      >
        <div className="px-10 py-4 rounded-2xl shadow-xl border-2 border-yellow-400 bg-gradient-to-r from-yellow-100 via-orange-50 to-yellow-200/90 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex-1 min-w-0">
            <span className="block text-xl md:text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 bg-clip-text text-transparent tracking-wide mb-1 drop-shadow-lg animate-gradient-x uppercase text-center md:text-left">
              Kolam Design Principles & Regeneration
            </span>
            <span className="block text-base md:text-lg font-semibold text-orange-900 text-center md:text-left mb-1">
              Unlocking the secrets of Kolam creation, regeneration, and mathematical beauty—directly from your uploaded image.
            </span>
            <span className="block mt-1 text-sm md:text-base font-medium text-orange-700 text-center md:text-left">
              <span className="font-bold text-orange-600">AI/ML-powered analysis</span> and <span className="font-bold text-orange-600">automated Kolam regeneration</span> are on the horizon.<br/>
              <span className="italic text-orange-800">A new era of Kolam intelligence is coming soon. Stay tuned!</span>
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center mt-2 md:mt-0">
            {[0,1,2,3].map((i) => (
              <motion.span
                key={i}
                className="text-xs font-bold text-red-500 whitespace-nowrap animate-bounce"
                initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                animate={{ scale: [0.7, 1.2, 1], opacity: 1, rotate: [ -10, 5, 0 ] }}
                transition={{ duration: 1.5, type: 'spring', bounce: 0.5, delay: 1.2 + i * 0.2 }}
                whileHover={{ scale: 1.15, color: '#b91c1c', textShadow: '0 0 8px #f87171' }}
              >
                coming soon !!
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
