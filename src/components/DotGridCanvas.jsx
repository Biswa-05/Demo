import { useRef, useState } from "react"

export default function DotGridCanvas() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [history, setHistory] = useState([])

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const ctx = canvasRef.current.getContext("2d")
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current
      setHistory([...history, canvas.toDataURL()])
    }
    setIsDrawing(false)
  }

  const undo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setHistory(history.slice(0, -1))
      const img = new Image()
      img.src = prev
      img.onload = () => {
        const ctx = canvasRef.current.getContext("2d")
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.drawImage(img, 0, 0)
      }
    }
  }

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setHistory([])
  }

  const saveCanvas = () => {
    const link = document.createElement("a")
    link.download = "kolam-drawing.png"
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-gray-400 bg-white shadow-lg"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className="space-x-4">
        <button onClick={undo} className="px-4 py-2 bg-gray-500 text-white rounded">
          Undo
        </button>
        <button onClick={clearCanvas} className="px-4 py-2 bg-red-500 text-white rounded">
          Clear
        </button>
        <button onClick={saveCanvas} className="px-4 py-2 bg-green-600 text-white rounded">
          Save PNG
        </button>
      </div>
    </div>
  )
}
