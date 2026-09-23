import Image from 'next/image'

export default function HomeHero() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-surface">
      <Image
        src="/images/image 8-3.webp"
        alt="Collection de chaises HAY dans un showroom"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center gap-3 px-6 pt-[max(7.5rem,min(189px,22vw))] text-center sm:pt-[max(9rem,min(189px,22vw))]">
        <h1 className="text-hero font-medium tracking-tight text-ink text-balance">
          Le quotidien, autrement
        </h1>
        <p className="max-w-[720px] text-lg font-normal tracking-tight text-muted text-pretty sm:text-xl">
          Des meubles, luminaires et accessoires imaginés pour apporter couleur,
          fonctionnalité et personnalité à chaque espace.
        </p>
      </div>
    </section>
  )
}
