import { useRef, useState } from "react"

export default function CoordinateCanvas() {
  const [coords, setCoords] = useState("")
  const canvasRef = useRef(null)

  const drawFromCoords = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2

    const lines = coords.split("\n").map(l => l.trim()).filter(Boolean)

    lines.forEach(line => {
      const parts = line.split("->").map(p => p.trim())
      if (parts.length === 2) {
        const [x1, y1] = parts[0].split(",").map(Number)
        const [x2, y2] = parts[1].split(",").map(Number)
        if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      } else {
        const [x, y] = line.split(",").map(Number)
        if (!isNaN(x) && !isNaN(y)) {
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = "red"
          ctx.fill()
        }
      }
    })
  }

  const saveCanvas = () => {
    const link = document.createElement("a")
    link.download = "coordinate-drawing.png"
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">
        Coordinate-Based Drawing
      </h1>
      <div className="flex justify-center space-x-6">
        <textarea
          value={coords}
          onChange={(e) => setCoords(e.target.value)}
          className="border p-4 w-64 h-64 font-mono text-sm"
          placeholder={`Enter coordinates:\n50,50 -> 200,200\n100,100\n150,150 -> 300,300`}
        />
        <div className="flex flex-col items-center space-y-2">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border border-gray-400 bg-white"
          />
          <button
            onClick={drawFromCoords}
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            Draw
          </button>
          <button
            onClick={saveCanvas}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save PNG
          </button>
        </div>
      </div>
    </div>
  )
}
