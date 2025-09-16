import DotGridCanvas from "../components/DotGridCanvas"

export default function DrawCanvas() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">
        Free Drawing Canvas
      </h1>
      <DotGridCanvas />
    </div>
  )
}
