import { useRef, useState } from "react"
import detectDots from "../utils/dotDetection"

export default function UploadAnalyze() {
  const [image, setImage] = useState(null)
  const canvasRef = useRef(null)

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

      // dot detection
      const dots = detectDots(ctx, canvas.width, canvas.height)
      ctx.fillStyle = "red"
      dots.forEach(({ x, y }) => {
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }
    img.src = URL.createObjectURL(file)
    setImage(file)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">
        Upload & Analyze Kolam
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        <canvas ref={canvasRef} className="border border-gray-400 bg-white shadow-lg" />
      </div>
    </div>
  )
}
