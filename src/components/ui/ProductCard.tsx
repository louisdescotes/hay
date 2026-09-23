import Image from 'next/image'
import Link from 'next/link'

export type ProductCardProps = {
  href?: string
  image: string
  title: string
  alt?: string
  priority?: boolean
}

export default function ProductCard({
  href = '#',
  image,
  title,
  alt,
  priority = false,
}: ProductCardProps) {
  const content = (
    <>
      <div className="img-outline relative aspect-[459/504] w-full overflow-hidden bg-canvas">
        <Image
          src={image}
          alt={alt ?? title}
          fill
          sizes="(max-width: 768px) 80vw, 459px"
          priority={priority}
          className="object-cover"
        />
      </div>
      <p className="max-w-[342px] text-base font-normal tracking-tight text-muted leading-[1.2]">
        {title}
      </p>
    </>
  )

  return (
    <Link
      href={href}
      className="flex w-[min(459px,80vw)] shrink-0 flex-col gap-4"
      data-blossom-slide
    >
      {content}
    </Link>
  )
}
