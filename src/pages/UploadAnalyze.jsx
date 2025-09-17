import { useRef } from "react"
import detectDots from "../utils/dotDetection"

export default function UploadAnalyze() {
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

      const dots = detectDots(ctx, canvas.width, canvas.height)

      // glowing dots animation
      let glow = 0
      const animateGlow = () => {
        ctx.drawImage(img, 0, 0)
        dots.forEach(({ x, y }) => {
          const radius = 4 + Math.sin(glow / 10) * 2
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,0,0,${0.7 + Math.sin(glow / 20) * 0.3})`
          ctx.fill()
        })
        glow++
        requestAnimationFrame(animateGlow)
      }
      animateGlow()
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">
        Upload & Analyze Kolam
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        <canvas ref={canvasRef} className="border border-gray-400 bg-white shadow-lg rounded-lg" />
      </div>
    </div>
  )
}
