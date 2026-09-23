'use client'

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Testimonials
 *
 *    0ms        quote lines enter from below (stagger 40ms)
 *  ~last line   author enters (lead 500ms before last line ends)
 *  hold         content stays visible
 *  exit phase   author then lines exit upward (LIFO, stagger 15ms)
 *  6800ms       loop — ring resets, cycle replays
 *
 *  Skip (arrows): seek to exit + ring fills to 1 with ease-out
 * ───────────────────────────────────────────────────────── */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { useReducedMotion } from 'motion/react'

export type Testimonial = {
  quote: string
  author: string
}

type TestimonialsPlayerProps = {
  items: Testimonial[]
}

const CYCLE_MS = 6800

const ENTER = {
  stagger: 0.04, // s between lines
  duration: 0.42, // s per line
  authorLead: 0.5, // s before last line ends
  y: 40, // px from below
  ease: [0, 0.47, 0.2, 0.96] as CubicBezier,
}

const EXIT = {
  stagger: 0.015, // s between exits (LIFO)
  duration: 0.3, // s per element
  y: 12, // px toward top
  ease: [0.23, 1, 0.32, 1] as CubicBezier,
}

const RING_SKIP_MS = 420

type CubicBezier = [number, number, number, number]

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function cubicBezierEase(t: number, [x1, y1, x2, y2]: CubicBezier) {
  const x = clamp01(t)
  if (x === 0 || x === 1) return x

  let guess = x
  for (let i = 0; i < 8; i++) {
    const u = 1 - guess
    const currentX =
      3 * u * u * guess * x1 + 3 * u * guess * guess * x2 + guess * guess * guess
    const dx =
      3 * u * u * x1 +
      6 * u * guess * (x2 - x1) +
      3 * guess * guess * (1 - x2)
    if (Math.abs(dx) < 1e-6) break
    guess -= (currentX - x) / dx
    guess = Math.min(1, Math.max(0, guess))
  }

  const u = 1 - guess
  return (
    3 * u * u * guess * y1 + 3 * u * guess * guess * y2 + guess * guess * guess
  )
}

function pieClipPath(progress: number): string {
  const p = clamp01(progress)
  if (p <= 0.001) return 'polygon(50% 50%, 50% 0%, 50% 0%)'
  if (p >= 0.999) {
    return 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)'
  }

  const angle = p * Math.PI * 2
  const steps = Math.max(3, Math.ceil(p * 48))
  const points = ['50% 50%', '50% 0%']

  for (let i = 1; i <= steps; i++) {
    const a = -Math.PI / 2 + (angle * i) / steps
    const x = 50 + 50 * Math.cos(a)
    const y = 50 + 50 * Math.sin(a)
    points.push(`${x.toFixed(3)}% ${y.toFixed(3)}%`)
  }

  return `polygon(${points.join(', ')})`
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

function authorEnterAt(lineCount: number) {
  const lastLineStart = Math.max(0, (lineCount - 1) * ENTER.stagger)
  return Math.max(0, lastLineStart + ENTER.duration - ENTER.authorLead)
}

function exitPhaseDuration(lineCount: number) {
  const slotCount = lineCount + 1
  return Math.max(0, slotCount - 1) * EXIT.stagger + EXIT.duration
}

function exitPhaseStart(lineCount: number) {
  return Math.max(0, CYCLE_MS / 1000 - exitPhaseDuration(lineCount))
}

function elementStyle(
  time: number,
  enterAt: number,
  reverseExitIndex: number,
  lineCount: number,
  reduceMotion: boolean,
): CSSProperties {
  if (reduceMotion) {
    return { opacity: 1, transform: 'translateY(0px)' }
  }

  const enterT = cubicBezierEase(
    clamp01((time - enterAt) / ENTER.duration),
    ENTER.ease,
  )

  const exitAt = exitPhaseStart(lineCount) + reverseExitIndex * EXIT.stagger
  const exitT = cubicBezierEase(
    clamp01((time - exitAt) / EXIT.duration),
    EXIT.ease,
  )

  const opacity = enterT * (1 - exitT)
  const y = (1 - enterT) * ENTER.y + exitT * -EXIT.y

  return {
    opacity,
    transform: `translateY(${y}px)`,
  }
}

function ProgressRing({ progress }: { progress: number }) {
  return (
    <div className="relative size-6 shrink-0" aria-hidden>
      <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-subtle" />
      <div
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-ink"
        style={{ clipPath: pieClipPath(progress) }}
      />
    </div>
  )
}

function ArrowIcon({ direction }: { direction: 'prev' | 'next' }) {
  const isPrev = direction === 'prev'
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="pointer-events-none"
    >
      <path
        d={isPrev ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function TestimonialsPlayer({ items }: TestimonialsPlayerProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [lines, setLines] = useState<string[]>([])
  const [minHeight, setMinHeight] = useState<number>()
  const [time, setTime] = useState(0)
  const [ringProgress, setRingProgress] = useState(0)
  const [liveMessage, setLiveMessage] = useState('')

  const measureRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const figureRef = useRef<HTMLElement>(null)
  const pendingIndexRef = useRef<number | null>(null)
  const cycleStartRef = useRef(0)
  const seekOffsetRef = useRef(0)
  const ringModeRef = useRef<'clock' | 'fill'>('clock')
  const ringRafRef = useRef<number | null>(null)
  const ringFillGenRef = useRef(0)
  const clockRafRef = useRef<number | null>(null)

  const item = items[index] ?? items[0]
  const count = items.length
  const cycleSec = CYCLE_MS / 1000

  const seekTo = useCallback((atSeconds: number) => {
    seekOffsetRef.current = atSeconds
    cycleStartRef.current = performance.now()
    setTime(atSeconds)
  }, [])

  const fillRingToMax = useCallback((from: number) => {
    if (ringRafRef.current !== null) {
      cancelAnimationFrame(ringRafRef.current)
      ringRafRef.current = null
    }

    const gen = ++ringFillGenRef.current
    ringModeRef.current = 'fill'
    const start = performance.now()
    const fromP = clamp01(from)

    const tick = (now: number) => {
      if (ringFillGenRef.current !== gen || ringModeRef.current !== 'fill') return

      const t = clamp01((now - start) / RING_SKIP_MS)
      const eased = cubicBezierEase(t, EXIT.ease)
      setRingProgress(fromP + (1 - fromP) * eased)
      if (t < 1) {
        ringRafRef.current = requestAnimationFrame(tick)
        return
      }
      ringRafRef.current = null
      if (ringFillGenRef.current === gen && ringModeRef.current === 'fill') {
        setRingProgress(1)
      }
    }

    ringRafRef.current = requestAnimationFrame(tick)
  }, [])

  const announceManual = useCallback(
    (nextIndex: number) => {
      const next = items[nextIndex]
      if (!next) return
      setLiveMessage(`Avis ${nextIndex + 1} sur ${items.length} : ${next.author}`)
    },
    [items],
  )

  // Master clock — loops the cycle.
  useEffect(() => {
    if (reduceMotion) {
      setTime(cycleSec * 0.5)
      setRingProgress(1)
      return
    }

    cycleStartRef.current = performance.now()
    seekOffsetRef.current = 0

    const tick = (now: number) => {
      const elapsed =
        seekOffsetRef.current + (now - cycleStartRef.current) / 1000

      if (elapsed >= cycleSec) {
        const pending = pendingIndexRef.current
        if (pending !== null) {
          pendingIndexRef.current = null
          setIndex(pending)
        } else {
          setIndex((current) => (current + 1) % count)
        }
        seekOffsetRef.current = 0
        cycleStartRef.current = now
        ringModeRef.current = 'clock'
        ringFillGenRef.current += 1
        if (ringRafRef.current !== null) {
          cancelAnimationFrame(ringRafRef.current)
          ringRafRef.current = null
        }
        setTime(0)
        setRingProgress(0)
      } else {
        setTime(elapsed)
        if (ringModeRef.current === 'clock') {
          setRingProgress(clamp01(elapsed / cycleSec))
        }
      }

      clockRafRef.current = requestAnimationFrame(tick)
    }

    clockRafRef.current = requestAnimationFrame(tick)
    return () => {
      if (clockRafRef.current !== null) cancelAnimationFrame(clockRafRef.current)
      ringFillGenRef.current += 1
      if (ringRafRef.current !== null) cancelAnimationFrame(ringRafRef.current)
    }
  }, [reduceMotion, cycleSec, count, index])

  const remeasure = useCallback(() => {
    const measureEl = measureRef.current
    const quoteEl = quoteRef.current
    const figureEl = figureRef.current
    if (!measureEl || !quoteEl || !item) return

    const width = quoteEl.getBoundingClientRect().width
    if (width <= 0) return

    measureEl.style.width = `${width}px`
    setLines(splitTextIntoLines(measureEl, `“${item.quote}”`))

    measureEl.textContent = 'Mg'
    const quoteLineHeight = measureEl.getBoundingClientRect().height
    measureEl.className =
      'pointer-events-none invisible absolute left-0 top-0 text-base font-medium tracking-tight leading-[1.5]'
    measureEl.textContent = 'Mg'
    const authorLineHeight = measureEl.getBoundingClientRect().height
    measureEl.className =
      'pointer-events-none invisible absolute left-0 top-0 text-2xl font-medium tracking-tight leading-[1.35]'

    let tallest = 0
    for (const entry of items) {
      const entryLines = splitTextIntoLines(measureEl, `“${entry.quote}”`)
      const quoteH = entryLines.length * quoteLineHeight
      tallest = Math.max(tallest, quoteH + 24 + authorLineHeight)
    }

    if (tallest > 0) setMinHeight(tallest)

    if (figureEl) {
      const rendered = figureEl.getBoundingClientRect().height
      if (rendered > 0) {
        setMinHeight((prev) => Math.max(prev ?? 0, rendered, tallest))
      }
    }
  }, [item, items])

  useLayoutEffect(() => {
    remeasure()

    const quoteEl = quoteRef.current
    if (!quoteEl || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(() => remeasure())
    observer.observe(quoteEl)
    return () => observer.disconnect()
  }, [remeasure])

  const goTo = (nextIndex: number) => {
    const target = ((nextIndex % count) + count) % count
    if (target === index && pendingIndexRef.current === null) return

    announceManual(target)

    if (reduceMotion) {
      pendingIndexRef.current = null
      setIndex(target)
      setRingProgress(1)
      return
    }

    fillRingToMax(Math.max(clamp01(time / cycleSec), ringProgress))
    pendingIndexRef.current = target

    const start = exitPhaseStart(lines.length)
    if (time < start) seekTo(start)
  }

  const lineCount = lines.length
  const authorAt = authorEnterAt(lineCount)
  const displayTime = reduceMotion ? cycleSec * 0.5 : time

  return (
    <div
      className="flex w-full items-start gap-4 sm:gap-6"
      aria-roledescription="carousel"
      aria-label="Témoignages clients"
    >
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {liveMessage}
      </div>

      <div className="flex shrink-0 flex-col items-center gap-4 pt-1">
        <ProgressRing progress={ringProgress} />

        <div className="flex items-center">
          <button
            type="button"
            aria-label="Avis précédent"
            onClick={() => goTo(index - 1)}
            className="flex size-10 cursor-pointer items-center justify-center text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <ArrowIcon direction="prev" />
          </button>
          <button
            type="button"
            aria-label="Avis suivant"
            onClick={() => goTo(index + 1)}
            className="flex size-10 cursor-pointer items-center justify-center text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>

      <figure
        ref={figureRef}
        className="mx-auto flex w-full max-w-[884px] flex-col"
        style={minHeight ? { minHeight } : undefined}
      >
        <blockquote
          ref={quoteRef}
          className="relative text-2xl font-medium tracking-tight text-ink leading-[1.35]"
        >
          <div
            ref={measureRef}
            className="pointer-events-none invisible absolute left-0 top-0 text-2xl font-medium tracking-tight leading-[1.35]"
            aria-hidden
          />
          {lines.map((line, lineIndex) => {
            const enterAt = lineIndex * ENTER.stagger
            const reverseExitIndex = lineCount - lineIndex
            const hasOpenQuote = lineIndex === 0 && line.startsWith('“')
            const hasCloseQuote =
              lineIndex === lineCount - 1 && line.endsWith('”')
            const body = line.slice(
              hasOpenQuote ? 1 : 0,
              hasCloseQuote ? -1 : undefined,
            )

            return (
              <div
                key={`${index}-${lineIndex}-${line.slice(0, 12)}`}
                className="[clip-path:inset(0_-0.65em_0_-0.65em)]"
              >
                <div
                  style={elementStyle(
                    displayTime,
                    enterAt,
                    reverseExitIndex,
                    lineCount,
                    Boolean(reduceMotion),
                  )}
                >
                  {hasOpenQuote ? (
                    <span
                      className="-ml-[0.55em] inline-block w-[0.55em]"
                      aria-hidden
                    >
                      “
                    </span>
                  ) : null}
                  {body}
                  {hasCloseQuote ? <span aria-hidden>”</span> : null}
                </div>
              </div>
            )
          })}
        </blockquote>

        <figcaption
          className="mt-6 overflow-hidden text-base font-medium tracking-tight text-muted"
        >
          <div
            style={elementStyle(
              displayTime,
              authorAt,
              0,
              lineCount,
              Boolean(reduceMotion),
            )}
          >
            {item?.author}
          </div>
        </figcaption>
      </figure>
    </div>
  )
}
