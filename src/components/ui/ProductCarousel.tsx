'use client'

import {
  BlossomCarousel,
  BlossomNext,
  BlossomPrev,
} from '@/components/BlossomCarousel'
import ProductCard, { type ProductCardProps } from '@/components/ui/ProductCard'
import TextReveal from '@/components/ui/TextReveal'

type ProductCarouselProps = {
  id: string
  items: ProductCardProps[]
  label: string
  title: string
}

export default function ProductCarousel({
  id,
  items,
  label,
  title,
}: ProductCarouselProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto flex w-full max-w-[1392px] items-center justify-between gap-4 px-6">
        <TextReveal
          as="h2"
          className="max-w-[692px] text-2xl font-medium tracking-tight text-ink text-balance"
        >
          {title}
        </TextReveal>
        <div className="flex shrink-0 items-center gap-1">
          <BlossomPrev
            for={id}
            aria-label={`${label} — précédent`}
            className="flex size-10 cursor-pointer items-center justify-center text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <CarouselArrow direction="prev" />
          </BlossomPrev>
          <BlossomNext
            for={id}
            aria-label={`${label} — suivant`}
            className="flex size-10 cursor-pointer items-center justify-center text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <CarouselArrow direction="next" />
          </BlossomNext>
        </div>
      </div>

      <div className="relative w-screen max-w-[100vw] ml-[calc(50%-50vw)]">
        <BlossomCarousel
          id={id}
          className="flex gap-2 overflow-x-auto scroll-px-6 px-6 pb-1 pe-[max(1.5rem,calc(20vw-1rem))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:scroll-px-[max(1.5rem,calc((100vw-1392px)/2+1.5rem))] md:px-[max(1.5rem,calc((100vw-1392px)/2+1.5rem))] md:pe-[max(2rem,calc((100vw-1392px)/2+2rem))]"
          aria-label={label}
        >
          {items.map((item) => (
            <ProductCard key={`${item.image}-${item.title}`} {...item} />
          ))}
        </BlossomCarousel>
      </div>
    </div>
  )
}

function CarouselArrow({ direction }: { direction: 'prev' | 'next' }) {
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
