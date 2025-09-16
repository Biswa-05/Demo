import React from 'react'

export default function Button({children, onClick, variant='solid', className=''}) {
  const base = 'px-4 py-2 rounded-md font-semibold shadow-sm'
  if(variant === 'solid') {
    return <button onClick={onClick} className={`${base} bg-gradient-to-r from-saffron to-deeporange text-white ${className}`}>{children}</button>
  }
  return <button onClick={onClick} className={`${base} border border-deeporange text-deeporange bg-white ${className}`}>{children}</button>
}
