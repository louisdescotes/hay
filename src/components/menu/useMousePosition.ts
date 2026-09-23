'use client'

import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  return position
}
