import { q } from "motion/react-client"
import DotGridCanvas from "../components/DotGridCanvas"

export default function DrawCanvas() {
  return (   
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-white p-8">
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">
        Free Drawing Canvas
      </h1>
      
      <DotGridCanvas />
    </div>
  )
}
  