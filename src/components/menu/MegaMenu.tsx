'use client'

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Mega menu
 *
 *    0ms   panel mounts (hover / focus Produits)
 *  200ms   opacity 0 → 1, scale 0.97 → 1, y -6 → 0 (from trigger)
 *  exit    reverse, softer (160ms), origin stays top center
 *
 *  Reduced motion: opacity only, keep translateX(-50%) for layout
 * ───────────────────────────────────────────────────────── */

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import MouseSafeArea from './MouseSafeArea'
import { megaNav } from './nav-data'

type MegaMenuProps = {
  open: boolean
  onClose: () => void
}

type TitleId = 'nouveau' | 'professionnels' | 'inspirations' | 'produits' | 'accessoires'

const titleIds = {
  Nouveau: 'nouveau',
  Professionnels: 'professionnels',
  Inspirations: 'inspirations',
} as const satisfies Record<(typeof megaNav.nouveau)[number]['label'], TitleId>

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const PANEL = {
  enterMs: 200,
  exitMs: 160,
  initialScale: 0.97,
  initialY: -6,
  exitY: -4,
}

const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(function MegaMenu(
  { open, onClose },
  ref,
) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [hoveredTitle, setHoveredTitle] = useState<TitleId | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useImperativeHandle(ref, () => panelRef.current as HTMLDivElement)

  function titleClass(id: TitleId) {
    const isActive = hoveredTitle === null || hoveredTitle === id
    return `text-base font-semibold tracking-tight transition-colors duration-150 ${
      isActive ? 'text-ink' : 'text-muted'
    }`
  }

  const centered = 'translateX(-50%)'
  const enterTransform = prefersReducedMotion
    ? centered
    : `${centered} translateY(${PANEL.initialY}px) scale(${PANEL.initialScale})`
  const restTransform = `${centered} translateY(0px) scale(1)`
  const exitTransform = prefersReducedMotion
    ? centered
    : `${centered} translateY(${PANEL.exitY}px) scale(${PANEL.initialScale})`

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mega-menu-produits"
          ref={panelRef}
          id="mega-menu-produits"
          role="region"
          aria-label="Catalogue produits"
          className="pointer-events-auto absolute left-1/2 top-[calc(100%+16px)] w-[min(1163px,calc(100vw-48px))] rounded-hay bg-surface px-10 py-8"
          style={{ transformOrigin: '50% 0%' }}
          initial={{ opacity: 0, transform: enterTransform }}
          animate={{ opacity: 1, transform: restTransform }}
          exit={{
            opacity: 0,
            transform: exitTransform,
            transition: { duration: PANEL.exitMs / 1000, ease: EASE_OUT },
          }}
          transition={{ duration: PANEL.enterMs / 1000, ease: EASE_OUT }}
          onMouseLeave={() => setHoveredTitle(null)}
        >
          <MouseSafeArea submenuRef={panelRef} />

          <div className="flex gap-8">
            <div className="flex flex-1 gap-4">
              <ul className="flex w-[185px] shrink-0 flex-col gap-3 text-left uppercase">
                {megaNav.nouveau.map((item) => {
                  const id = titleIds[item.label]

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        onMouseEnter={() => setHoveredTitle(id)}
                        className={`uppercase ${titleClass(id)}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div
                className="flex w-[150px] shrink-0 flex-col gap-3"
                onMouseEnter={() => setHoveredTitle('produits')}
              >
                <p className={`uppercase ${titleClass('produits')}`}>{megaNav.produits.title}</p>
                <ul className="flex flex-col gap-2 capitalize">
                  {megaNav.produits.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-sm font-normal tracking-tight text-muted"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="flex w-[150px] shrink-0 flex-col gap-3"
                onMouseEnter={() => setHoveredTitle('accessoires')}
              >
                <p className={`uppercase ${titleClass('accessoires')}`}>
                  {megaNav.accessoires.title}
                </p>
                <ul className="flex flex-col gap-2 capitalize">
                  {megaNav.accessoires.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-sm font-normal tracking-tight text-muted"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="flex flex-1 gap-4"
              onMouseEnter={() => setHoveredTitle(null)}
            >
              {megaNav.features.map((feature) => (
                <div key={feature.href} className="relative min-w-0 flex-1 overflow-hidden">
                  <Link
                    href={feature.href}
                    onClick={onClose}
                    className="img-outline group relative block aspect-[262/363] w-full overflow-hidden"
                  >
                    <Image
                      src={feature.image}
                      alt={feature.subtitle}
                      fill
                      sizes="262px"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-b from-transparent from-55% to-ink-65 mix-blend-luminosity"
                    />
                    <div className="absolute inset-x-0 bottom-0 px-6 py-4">
                      <p className="text-lg font-semibold uppercase tracking-tight text-canvas">
                        {feature.title}
                      </p>
                      <p className="text-xs font-normal tracking-caption text-subtle">
                        {feature.subtitle}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
})

export default MegaMenu
