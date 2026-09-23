import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'subtle' | 'underline'
  static?: boolean
  className?: string
}

const base =
  'inline-flex w-fit select-none items-center justify-center text-base font-medium tracking-tight'

const solid =
  'btn-link min-h-11 rounded-hay bg-ink px-4 py-2.5 text-surface transition-[scale,background-color] duration-150 ease-out'

const subtle =
  'btn-link min-h-11 rounded-hay bg-surface px-4 py-2.5 text-ink outline outline-1 outline-ink/15 -outline-offset-1 transition-[scale,background-color,outline-color] duration-150 ease-out'

const underline =
  'text-muted underline decoration-solid [text-decoration-thickness:from-font] [text-underline-position:from-font] [text-decoration-skip-ink:auto]'

export default function ButtonLink({
  href,
  children,
  variant = 'solid',
  static: isStatic = false,
  className = '',
}: ButtonLinkProps) {
  const press = isStatic ? '' : 'active:scale-[0.96]'

  if (variant === 'underline') {
    return (
      <Link href={href} className={`${base} ${underline} ${className}`.trim()}>
        {children}
      </Link>
    )
  }

  const surface = variant === 'subtle' ? subtle : solid

  return (
    <Link
      href={href}
      className={`${base} ${surface} ${press} ${className}`.trim()}
    >
      {children}
    </Link>
  )
}
