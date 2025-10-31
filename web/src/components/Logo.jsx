import React from 'react'

export default function Logo({ size = 28 }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className="grid place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-md"
        style={{ width: size, height: size }}
      >
        <svg width={size - 10} height={size - 10} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12L10 6V10H16L20 14H10V18L4 12Z" fill="currentColor"/>
        </svg>
      </span>
    </span>
  )
}


