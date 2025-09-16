import React from 'react'
import Card from '../components/Card'

export default function MathAnalysis(){
  return (
    <section className="py-8">
      <h2 className="text-3xl font-heading mb-6">Mathematical Analysis</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Coordinate Breakdown">
          <p className="text-sm text-gray-700">Placeholder: show coordinates, segments, curve control points.</p>
        </Card>
        <Card title="Symmetry Analysis">
          <p className="text-sm text-gray-700">Placeholder: axes of symmetry, rotational symmetry order.</p>
        </Card>
        <Card title="Pattern Regeneration">
          <p className="text-sm text-gray-700">Placeholder: regenerate using algorithmic rules.</p>
        </Card>
      </div>
    </section>
  )
}
