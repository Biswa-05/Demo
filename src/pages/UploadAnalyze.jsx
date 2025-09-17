import { useRef, useState } from "react"
import { motion } from "framer-motion"
import detectDots from "../utils/dotDetection"
import bgUpload from "../assets/Uploadimage.png" // ✅ import background properly

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

      // connect nearby dots with lines
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
        patterns: lines.length > 20 ? "✨ Complex Symmetry" : "🌸 Simple Kolam",
      })

      // animate glowing dots + lines
      let glow = 0
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // redraw uploaded image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // animated lines
        ctx.strokeStyle = `rgba(255,215,0,${0.6 + Math.sin(glow / 20) * 0.3})`
        ctx.lineWidth = 1.5
        lines.forEach(({ from, to }) => {
          ctx.beginPath()
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
          ctx.stroke()
        })

        // glowing dots
        dots.forEach(({ x, y }) => {
          const radius = 3 + Math.sin(glow / 15) * 1.5
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 200, 50, ${0.8 + Math.sin(glow / 10) * 0.2})`
          ctx.shadowBlur = 15
          ctx.shadowColor = "gold"
          ctx.fill()
          ctx.shadowBlur = 0
        })

        glow++
        requestAnimationFrame(draw)
      }

      draw()
    }
    img.src = URL.createObjectURL(file)
  }

  // ✅ Download canvas as PNG
  const downloadKolam = () => {
    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = "analyzed-kolam.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <div
      className="relative min-h-screen py-12 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUpload})` }}
    >
      {/* Page Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-left 
        bg-gradient-to-r from-yellow-200 via-orange-400 to-red-500 
        bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,200,100,0.9)] 
        max-w-3xl mx-auto md:mx-0 leading-snug"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Upload & Analyze Your Kolam
      </motion.h1>

      {/* Main Content */}
      <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">
        {/* Upload & Canvas */}
        <motion.div
          className="p-6 rounded-2xl shadow-2xl bg-black/60 backdrop-blur-lg 
          border border-yellow-400 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="mb-6 cursor-pointer text-sm text-yellow-200 
            border border-dashed border-yellow-400 p-3 rounded-xl bg-black/70 
            hover:bg-yellow-400/10 transition"
          />
          <canvas
            ref={canvasRef}
            className="border-4 border-yellow-400 rounded-xl shadow-xl max-w-full"
          />

          {/* ✅ Download button */}
          <motion.button
            onClick={downloadKolam}
            whileTap={{ scale: 0.9 }}
            className="mt-6 px-6 py-3 rounded-xl font-bold 
            bg-gradient-to-r from-green-500 to-emerald-600 
            text-white shadow-lg hover:from-green-600 hover:to-emerald-700 
            transition transform hover:scale-105"
          >
            💾 Download Kolam
          </motion.button>
        </motion.div>

        {/* Analysis Box */}
        {analysis && (
          <motion.div
            className="p-6 rounded-2xl shadow-xl bg-gradient-to-b 
            from-black/80 via-black/70 to-black/60 text-yellow-100 
            border border-yellow-500"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-4xl font-extrabold mb-6 text-yellow-300 
              bg-black/50 px-5 py-2 rounded-lg inline-block shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Kolam Insights ✨
            </motion.h2>

            <ul className="space-y-4 text-lg font-medium">
              <li className="border-b border-yellow-500/40 pb-2">
                🌟 Dots Detected:{" "}
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

            <motion.div
              className="mt-8 p-5 rounded-xl bg-yellow-400/10 
              backdrop-blur-md text-center text-lg font-semibold shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              🌸 Kolams are not just{" "}
              <span className="text-yellow-300">art</span>, they are{" "}
              <span className="text-orange-400">geometry in motion!</span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

