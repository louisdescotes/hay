import Link from 'next/link'
import TextReveal from '@/components/ui/TextReveal'

type SectionHeaderProps = {
  title: string
  actionLabel?: string
  actionHref?: string
}

export default function SectionHeader({
  title,
  actionLabel,
  actionHref,
}: SectionHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 text-base font-medium tracking-tight text-muted sm:gap-6">
      <TextReveal as="h2" className="leading-[1.25] text-balance">
        {title}
      </TextReveal>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="shrink-0 leading-[1.25] underline decoration-solid [text-decoration-thickness:from-font] [text-underline-position:from-font]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
