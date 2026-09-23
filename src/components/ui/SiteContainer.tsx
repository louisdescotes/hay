import type { ReactNode } from 'react'

type SiteContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'footer'
}

export default function SiteContainer({
  children,
  className = '',
  as: Tag = 'div',
}: SiteContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[1392px] px-6 ${className}`.trim()}>
      {children}
    </Tag>
  )
}
