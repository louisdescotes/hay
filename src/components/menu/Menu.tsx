'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import MegaMenu from './MegaMenu'
import { megaNav, navLinks } from './nav-data'

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusable(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
  )
}

export default function Menu() {
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null)
  const rootRef = useRef<HTMLElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const produitsTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuId = useId()
  const mobilePanelId = useId()

  const activeNavId = hoveredNavId ?? (isMegaOpen ? 'produits' : null)

  function clearCloseTimeout() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  function openMega() {
    clearCloseTimeout()
    setIsMegaOpen(true)
  }

  function scheduleCloseMega() {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setIsMegaOpen(false)
    }, 120)
  }

  function closeMega({ restoreFocus = false } = {}) {
    clearCloseTimeout()
    setIsMegaOpen(false)
    if (restoreFocus) produitsTriggerRef.current?.focus()
  }

  function closeMobile({ restoreFocus = false } = {}) {
    setIsMobileOpen(false)
    if (restoreFocus) mobileToggleRef.current?.focus()
  }

  function closeAll({ restoreFocus = false } = {}) {
    closeMega()
    closeMobile({ restoreFocus })
  }

  useEffect(() => {
    return () => clearCloseTimeout()
  }, [])

  useEffect(() => {
    if (!isMegaOpen && !isMobileOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (isMobileOpen) {
          event.preventDefault()
          closeMobile({ restoreFocus: true })
          return
        }
        if (isMegaOpen) {
          event.preventDefault()
          closeMega({ restoreFocus: true })
        }
      }
    }

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeAll()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [isMegaOpen, isMobileOpen])

  useEffect(() => {
    if (!isMobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const main = document.getElementById('contenu-principal')
    if (main) main.inert = true

    const panel = document.getElementById(mobilePanelId)
    const focusables = panel ? getFocusable(panel) : []
    focusables[0]?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !rootRef.current) return

      const items = getFocusable(rootRef.current).filter((el) => {
        const panelEl = document.getElementById(mobilePanelId)
        return (
          el === mobileToggleRef.current ||
          (panelEl !== null && panelEl.contains(el))
        )
      })
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      if (main) main.inert = false
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileOpen, mobilePanelId])

  useEffect(() => {
    if (!isMegaOpen || isMobileOpen) return

    const panel = megaRef.current
    if (!panel) return

    const focusables = getFocusable(panel)
    const openedByKeyboard =
      produitsTriggerRef.current === document.activeElement ||
      panel.contains(document.activeElement)

    if (openedByKeyboard && focusables[0]) {
      // Defer so the panel is painted before moving focus.
      requestAnimationFrame(() => focusables[0]?.focus())
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab') return

      const trigger = produitsTriggerRef.current
      const panelEl = megaRef.current
      if (!trigger || !panelEl) return

      const panelItems = getFocusable(panelEl)
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && active === trigger) {
        closeMega()
        return
      }

      const last = panelItems[panelItems.length - 1]
      if (!event.shiftKey && last && active === last) {
        closeMega()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMegaOpen, isMobileOpen])

  function navTitleClass(id: string) {
    const isActive = activeNavId === null || activeNavId === id
    return `text-base font-semibold uppercase tracking-tight whitespace-nowrap transition-colors duration-150 ${
      isActive ? 'text-ink' : 'text-muted'
    }`
  }

  return (
    <header
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6 sm:px-6"
    >
      <div className="relative w-full max-w-[1158px]">
        <nav
          aria-label="Navigation principale"
          className="pointer-events-auto flex h-14 w-full items-center gap-4 rounded-hay bg-surface px-5 py-3 sm:h-20 sm:gap-6 sm:px-10 sm:py-5"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center text-xl font-semibold uppercase leading-[1.2] text-ink sm:text-2xl md:w-[200px]"
            onClick={() => closeAll()}
          >
            HAY
          </Link>

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-6 md:flex">
            {navLinks.map((item) => {
              const isProduits = item.id === 'produits'

              if (isProduits) {
                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => {
                      setHoveredNavId(item.id)
                      openMega()
                    }}
                    onMouseLeave={() => {
                      setHoveredNavId(null)
                      scheduleCloseMega()
                    }}
                  >
                    <button
                      ref={produitsTriggerRef}
                      type="button"
                      className={navTitleClass(item.id)}
                      aria-expanded={isMegaOpen}
                      aria-haspopup="true"
                      aria-controls="mega-menu-produits"
                      id={menuId}
                      onClick={() => {
                        setIsMegaOpen((open) => {
                          if (open) return false
                          return true
                        })
                      }}
                      onFocus={openMega}
                      onKeyDown={(event) => {
                        if (
                          (event.key === 'ArrowDown' || event.key === 'Enter') &&
                          !isMegaOpen
                        ) {
                          event.preventDefault()
                          openMega()
                        }
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              }

              return (
                <li
                  key={item.href}
                  onMouseEnter={() => setHoveredNavId(item.id)}
                  onMouseLeave={() => setHoveredNavId(null)}
                >
                  <Link
                    href={item.href}
                    className={navTitleClass(item.id)}
                    onClick={() => closeAll()}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="ml-auto flex shrink-0 items-center justify-end md:ml-0 md:w-[200px]">
            <button
              ref={mobileToggleRef}
              type="button"
              aria-label={isMobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileOpen}
              aria-controls={mobilePanelId}
              className="flex size-10 items-center justify-center text-ink transition-transform duration-150 ease-out active:scale-[0.96] md:hidden"
              onClick={() => {
                setIsMegaOpen(false)
                setIsMobileOpen((open) => !open)
              }}
            >
              {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {isMobileOpen ? (
          <div
            id={mobilePanelId}
            className="pointer-events-auto absolute inset-x-0 top-[calc(100%+8px)] max-h-[min(70vh,calc(100dvh-6rem))] overflow-y-auto rounded-hay bg-surface px-5 py-6 md:hidden"
          >
            <ul className="flex flex-col gap-5">
              {megaNav.nouveau.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-semibold uppercase tracking-tight text-ink"
                    onClick={() => closeAll()}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {navLinks
                .filter((item) => item.id !== 'produits')
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-base font-semibold uppercase tracking-tight text-ink"
                      onClick={() => closeAll()}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>

            <div className="mt-8 grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <p className="text-base font-semibold uppercase tracking-tight text-ink">
                  {megaNav.produits.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {megaNav.produits.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm font-normal tracking-tight text-muted"
                        onClick={() => closeAll()}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-base font-semibold uppercase tracking-tight text-ink">
                  {megaNav.accessoires.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {megaNav.accessoires.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm font-normal tracking-tight text-muted"
                        onClick={() => closeAll()}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className="hidden md:block"
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
        >
          <MegaMenu
            ref={megaRef}
            open={isMegaOpen}
            onClose={() => closeMega({ restoreFocus: true })}
          />
        </div>
      </div>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className="size-6"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className="size-6"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
