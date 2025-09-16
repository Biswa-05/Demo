import React from 'react'
import Card from '../components/Card'

export default function History(){
  return (
    <section className="py-8">
      <h2 className="text-3xl font-heading mb-6">The Art of Kolam</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Origins">
          <p className="text-sm text-gray-700">Kolam tradition traces back centuries in South India, often linked with ritual and daily practice. Rice flour lines welcome prosperity and ward off evil.</p>
        </Card>
        <Card title="Cultural Meaning">
          <p className="text-sm text-gray-700">Patterns are passed down generations, often with symbolic and local meanings.</p>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Regional Timeline</h3>
        <ol className="mt-4 list-disc pl-6 text-sm text-gray-700">
          <li>Muggu & Rangoli: Historical mentions</li>
          <li>Traditional dot grids and family motifs</li>
          <li>Modern reinterpretation and digital tools</li>
        </ol>
      </div>
    </section>
  )
}
