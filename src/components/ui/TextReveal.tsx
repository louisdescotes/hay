'use client'

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — TextReveal
 *
 *    scroll in view (once)   lines enter from below, stagger 40ms
 *    reduced motion          opacity only, no translate
 * ───────────────────────────────────────────────────────── */

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

const ENTER = {
  stagger: 0.04,
  duration: 0.42,
  y: 40,
  ease: [0, 0.47, 0.2, 0.96] as const,
}

type TextTag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'

type TextRevealProps = {
  as?: TextTag
  className?: string
  children: string
  /** Extra delay before the first line, in ms. */
  delay?: number
  /** Applied only to the first measured line (e.g. text-indent). */
  firstLineClassName?: string
}

function splitTextIntoLines(measureEl: HTMLElement, text: string): string[] {
  const words = text.trim().split(/\s+/)
  if (words.length === 0) return ['']

  measureEl.textContent = ''
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    measureEl.textContent = next
    const height = measureEl.getBoundingClientRect().height
    measureEl.textContent = 'Mg'
    const lineHeight = measureEl.getBoundingClientRect().height

    if (current && height > lineHeight * 1.5) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) lines.push(current)
  return lines.length > 0 ? lines : [text]
}

function TextRevealLines({
  lines,
  firstLineClassName,
  shouldShow,
  reduceMotion,
  delaySec,
}: {
  lines: string[]
  firstLineClassName: string
  shouldShow: boolean
  reduceMotion: boolean
  delaySec: number
}) {
  const hidden = {
    opacity: 0,
    transform: reduceMotion ? 'translateY(0px)' : `translateY(${ENTER.y}px)`,
  }
  const visible = {
    opacity: 1,
    transform: 'translateY(0px)',
  }

  return lines.map((line, lineIndex) => (
    <div
      key={`${lineIndex}-${line.slice(0, 24)}`}
      className={
        lineIndex === 0 && firstLineClassName
          ? `[clip-path:inset(0_-0.65em_0_-0.65em)] ${firstLineClassName}`
          : '[clip-path:inset(0_-0.65em_0_-0.65em)]'
      }
    >
      <motion.div
        initial={hidden}
        animate={shouldShow ? visible : hidden}
        transition={{
          duration: reduceMotion ? 0.2 : ENTER.duration,
          delay: reduceMotion ? 0 : delaySec + lineIndex * ENTER.stagger,
          ease: ENTER.ease,
        }}
      >
        {line}
      </motion.div>
    </div>
  ))
}

export default function TextReveal({
  as: Tag = 'div',
  className = '',
  children,
  delay = 0,
  firstLineClassName = '',
}: TextRevealProps) {
  const reduceMotion = Boolean(useReducedMotion())
  const containerRef = useRef<HTMLElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[]>(() => [children])
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  useLayoutEffect(() => {
    const container = containerRef.current
    const measureEl = measureRef.current
    if (!container || !measureEl) return

    const remeasure = () => {
      const width = container.getBoundingClientRect().width
      if (width <= 0) return
      measureEl.style.width = `${width}px`
      setLines(splitTextIntoLines(measureEl, children))
    }

    remeasure()

    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => remeasure())
    observer.observe(container)
    return () => observer.disconnect()
  }, [children, className, firstLineClassName])

  const delaySec = delay / 1000
  const shouldShow = reduceMotion || isInView
  const mergedClassName = className ? `relative ${className}` : 'relative'

  const measure = (
    <div
      ref={measureRef}
      className={[
        'pointer-events-none invisible absolute left-0 top-0',
        className,
        firstLineClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    />
  )

  const content: ReactNode = (
    <>
      {measure}
      <TextRevealLines
        lines={lines}
        firstLineClassName={firstLineClassName}
        shouldShow={shouldShow}
        reduceMotion={reduceMotion}
        delaySec={delaySec}
      />
    </>
  )

  switch (Tag) {
    case 'h1':
      return (
        <h1 ref={containerRef as RefObject<HTMLHeadingElement>} className={mergedClassName}>
          {content}
        </h1>
      )
    case 'h2':
      return (
        <h2 ref={containerRef as RefObject<HTMLHeadingElement>} className={mergedClassName}>
          {content}
        </h2>
      )
    case 'h3':
      return (
        <h3 ref={containerRef as RefObject<HTMLHeadingElement>} className={mergedClassName}>
          {content}
        </h3>
      )
    case 'p':
      return (
        <p ref={containerRef as RefObject<HTMLParagraphElement>} className={mergedClassName}>
          {content}
        </p>
      )
    case 'span':
      return (
        <span ref={containerRef as RefObject<HTMLSpanElement>} className={mergedClassName}>
          {content}
        </span>
      )
    case 'div':
      return (
        <div ref={containerRef as RefObject<HTMLDivElement>} className={mergedClassName}>
          {content}
        </div>
      )
    default: {
      const _exhaustive: never = Tag
      return _exhaustive
    }
  }
}
