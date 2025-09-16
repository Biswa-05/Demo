import React from 'react'

export default function Card({children, title}) {
  return (
    <div className="card-soft">
      {title && <h3 className="text-xl font-semibold mb-3">{title}</h3>}
      <div>{children}</div>
    </div>
  )
}
