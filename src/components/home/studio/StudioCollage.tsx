'use client'

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — StudioCollage
 *
 *  SCROLL
 *    offset start 1.25 → end 0.5
 *    travel −18vw → −4.5vw along each image’s rotate angle
 *    stagger 0.2 — team lags building
 *    spring mass 1 / stiffness 751 / damping 90
 *
 *  reduced             rest at end offset, no scroll motion
 * ───────────────────────────────────────────────────────── */

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

const SCROLL = {
  offsetStart: 1.25,
  offsetEnd: 0.5,
  startXVw: -18,
  endXVw: -4.5,
  stagger: 0.2,
  spring: {
    mass: 1,
    stiffness: 751,
    damping: 90,
  },
}

type CollageImage = {
  id: 'building' | 'team'
  src: string
  alt: string
  rotate: number
  className: string
  sizes: string
  order: 0 | 1
}

const IMAGES: CollageImage[] = [
  {
    id: 'building',
    src: '/images/studio-building.webp',
    alt: 'Showroom HAY à Copenhague',
    rotate: 2.3,
    order: 0,
    className:
      'absolute left-[42%] top-0 z-0 aspect-[353/427] w-[58%] max-w-[353px] origin-center sm:left-[220px] md:left-[240px] md:w-[353px]',
    sizes: '353px',
  },
  {
    id: 'team',
    src: '/images/studio-team.webp',
    alt: 'Équipe du studio HAY',
    rotate: -1.5,
    order: 1,
    className:
      'absolute left-[10%] top-[10%] z-10 aspect-[354/427] w-[58%] max-w-[354px] origin-center sm:left-[56px] md:left-[72px] md:top-[46px] md:w-[354px]',
    sizes: '354px',
  },
]

function CollageFrame({
  image,
  progress,
  reduceMotion,
}: {
  image: CollageImage
  progress: MotionValue<number>
  reduceMotion: boolean
}) {
  const localProgress = useTransform(progress, (value) => {
    const start = image.order === 0 ? 0 : SCROLL.stagger
    if (value <= start) return 0
    if (value >= 1) return 1
    return (value - start) / (1 - start)
  })

  const enterTransform = useTransform(localProgress, (value) => {
    const t = reduceMotion ? 1 : value
    const distanceVw = SCROLL.startXVw + (SCROLL.endXVw - SCROLL.startXVw) * t
    const pathDeg = image.rotate * 4
    const rad = (pathDeg * Math.PI) / 180
    const xVw = distanceVw * Math.cos(rad)
    const yVw = distanceVw * Math.sin(rad)
    return `translate(${xVw}vw, ${yVw}vw)`
  })

  return (
    <motion.div
      className={image.className}
      style={{
        transform: enterTransform,
        willChange: reduceMotion ? undefined : 'transform',
      }}
    >
      <div
        className="img-outline relative size-full origin-center"
        style={{ transform: `rotate(${image.rotate}deg)` }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={image.sizes}
          className="object-cover"
        />
      </div>
    </motion.div>
  )
}

export default function StudioCollage() {
  const reduceMotion = Boolean(useReducedMotion())
  const rootRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: [
      `start ${SCROLL.offsetStart}`,
      `start ${SCROLL.offsetEnd}`,
    ],
  })

  const springProgress = useSpring(scrollYProgress, SCROLL.spring)
  const driveProgress = reduceMotion ? scrollYProgress : springProgress

  return (
    <div
      ref={rootRef}
      className="relative mx-auto aspect-[640/500] w-full max-w-[640px] shrink-0 md:mx-0"
    >
      {IMAGES.map((image) => (
        <CollageFrame
          key={image.id}
          image={image}
          progress={driveProgress}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  )
}
