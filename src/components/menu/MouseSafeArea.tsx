'use client'

import type { RefObject } from 'react'
import { useMousePosition } from './useMousePosition'

type MouseSafeAreaProps = {
  submenuRef: RefObject<HTMLElement | null>
}

/**
 * Invisible triangle between the cursor and a dropdown so the pointer can
 * travel diagonally without closing the menu (Linear / Amazon pattern).
 * @see https://linear.app/now/invisible-details
 */
export default function MouseSafeArea({ submenuRef }: MouseSafeAreaProps) {
  const { x: mouseX, y: mouseY } = useMousePosition()
  const rect = submenuRef.current?.getBoundingClientRect()

  if (!rect) return null

  const { left: panelLeft, right: panelRight, top: panelTop } = rect

  // Only bridge while the cursor is above the panel (path into the menu).
  if (mouseY >= panelTop) return null

  const left = Math.min(mouseX, panelLeft)
  const right = Math.max(mouseX, panelRight)
  const top = mouseY
  const height = panelTop - mouseY
  const width = right - left

  if (height <= 0 || width <= 0) return null

  const cursorX = mouseX - left
  const edgeLeft = panelLeft - left
  const edgeRight = panelRight - left

  return (
    <div
      aria-hidden="true"
      className="pointer-events-auto fixed z-40"
      style={{
        left,
        top,
        width,
        height,
        clipPath: `polygon(${cursorX}px 0, ${edgeLeft}px ${height}px, ${edgeRight}px ${height}px)`,
      }}
    />
  )
}
