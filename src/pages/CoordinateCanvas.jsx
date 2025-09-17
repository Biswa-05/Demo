import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import bgImage from "../assets/CoordImg.png"

export default function CoordinateCanvas() {
  const [coords, setCoords] = useState("")
  const [applySymmetry, setApplySymmetry] = useState(true)
  const [gridSize, setGridSize] = useState(5)
  const canvasRef = useRef(null)

  // Initialize blank background on mount
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    drawBackground(ctx, canvas)
  }, [])

  // Draw background + base grid
  const drawBackground = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(10, 20, 40, 0.95)")
    gradient.addColorStop(1, "rgba(20, 40, 60, 0.95)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "rgba(0,255,200,0.15)"
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
  }

  // Draw from manual coordinates
  const drawFromCoords = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground(ctx, canvas)

    const lines = coords.split("\n").map((l) => l.trim()).filter(Boolean)
    let dots = []

    lines.forEach((line) => {
      const parts = line.split("->").map((p) => p.trim())
      if (parts.length === 2) {
        const [x1, y1] = parts[0].split(",").map(Number)
        const [x2, y2] = parts[1].split(",").map(Number)
        if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
          dots.push({ x: x1, y: y1 }, { x: x2, y: y2 })

          // Always draw a base line
          ctx.strokeStyle = "rgba(34,139,34,0.9)"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()

          // Add symmetry if enabled
          if (applySymmetry) {
            drawSymmetricCurve(ctx, canvas, { x: x1, y: y1 }, { x: x2, y: y2 })
          }
        }
      } else {
        const [x, y] = line.split(",").map(Number)
        if (!isNaN(x) && !isNaN(y)) {
          dots.push({ x, y })
        }
      }
    })

    // Draw dots
    dots.forEach(({ x, y }) => {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,165,0,0.9)"
      ctx.shadowBlur = 12
      ctx.shadowColor = "gold"
      ctx.fill()
      ctx.shadowBlur = 0
    })
  }

  // Suggest symmetric Kolam dots
  const suggestKolamDots = (size = gridSize) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground(ctx, canvas)

    const spacing = 60
    const startX = 80
    const startY = 80
    let dots = []

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        dots.push({ x: startX + j * spacing, y: startY + i * spacing })
      }
    }

    drawKolam(ctx, canvas, dots)
  }

  // Draw Kolam with curves + symmetry
  const drawKolam = (ctx, canvas, dots) => {
    dots.forEach(({ x, y }) => {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,215,0,0.9)"
      ctx.shadowBlur = 12
      ctx.shadowColor = "gold"
      ctx.fill()
      ctx.shadowBlur = 0
    })

    for (let i = 0; i < dots.length / 2; i++) {
      const d1 = dots[Math.floor(Math.random() * dots.length)]
      const d2 = dots[Math.floor(Math.random() * dots.length)]
      if (d1 !== d2) {
        drawSymmetricCurve(ctx, canvas, d1, d2)
      }
    }
  }

  // Helper: Draw symmetric curves
  const drawSymmetricCurve = (ctx, canvas, p1, p2) => {
    let pairs = [
      [p1, p2],
      [{ x: canvas.width - p1.x, y: p1.y }, { x: canvas.width - p2.x, y: p2.y }],
      [{ x: p1.x, y: canvas.height - p1.y }, { x: p2.x, y: canvas.height - p2.y }],
    ]

    ctx.strokeStyle = "rgba(0,255,200,0.8)"
    ctx.lineWidth = 2
    ctx.shadowBlur = 10
    ctx.shadowColor = "cyan"

    pairs.forEach(([a, b]) => {
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 - 40, b.x, b.y)
      ctx.stroke()
    })

    ctx.shadowBlur = 0
  }

  // Save drawing as PNG
  const saveCanvas = () => {
    const link = document.createElement("a")
    link.download = "kolam.png"
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  // Clear screen
  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground(ctx, canvas)
  }

  return (
    <div
      className="relative min-h-screen py-10 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-orange-600 drop-shadow-lg mb-8 bg-white/20 px-6 py-2 rounded-2xl inline-block"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ✨ Interactive Kolam Generator ✨
      </motion.h1>

      <div className="mt-8 flex justify-center space-x-10">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col space-y-4"
        >
          {/* Coordinate input */}
          <textarea
            value={coords}
            onChange={(e) => setCoords(e.target.value)}
            className="border p-4 w-72 h-64 font-mono text-sm rounded-lg bg-black/60 text-yellow-200 shadow-md"
            placeholder={`Enter coordinates:\n50,50 -> 200,200\n100,100`}
          />

          {/* Symmetry toggle */}
          <label className="flex items-center space-x-2 text-yellow-300 font-semibold">
            <input
              type="checkbox"
              checked={applySymmetry}
              onChange={(e) => setApplySymmetry(e.target.checked)}
            />
            <span>Apply Symmetry & Kolam Style</span>
          </label>

          <button
            onClick={drawFromCoords}
            className="px-5 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600"
          >
            🖊️ Draw From Coordinates
          </button>

          {/* Grid size selector */}
          <div className="flex items-center justify-between space-x-2 bg-black/60 px-3 py-2 rounded-lg border border-yellow-500">
            <label className="text-yellow-300 font-semibold">Grid Size:</label>
            <select
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
              className="px-3 py-1 rounded-lg bg-black/70 text-yellow-200 border border-yellow-500 shadow"
            >
              <option value={3}>3 × 3</option>
              <option value={5}>5 × 5</option>
              <option value={7}>7 × 7</option>
            </select>
          </div>

          <motion.button
            onClick={() => suggestKolamDots(gridSize)}
            whileTap={{ scale: 0.9 }}
            className="px-5 py-2 rounded-xl bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600"
          >
            🔀 Suggest Kolam
          </motion.button>
        </motion.div>

        {/* Canvas + buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className="border-4 border-cyan-400 rounded-2xl shadow-xl"
          />

          <div className="flex space-x-4">
            <motion.button
              onClick={saveCanvas}
              whileTap={{ scale: 0.9 }}
              className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700"
            >
              💾 Save PNG
            </motion.button>

            <motion.button
              onClick={clearCanvas}
              whileTap={{ scale: 0.9 }}
              className="px-5 py-2 rounded-xl bg-gray-700 text-white font-semibold shadow hover:bg-gray-800"
            >
              🧹 Clear Screen
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
