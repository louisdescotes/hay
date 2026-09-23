import Image from 'next/image'
import ButtonLink from '@/components/ui/ButtonLink'
import SiteContainer from '@/components/ui/SiteContainer'
import TextReveal from '@/components/ui/TextReveal'

export default function EditorialSection() {
  return (
    <section className="flex w-full flex-col gap-6">
      <SiteContainer className="flex flex-col gap-10 lg:flex-row lg:gap-[193px]">
        <TextReveal
          as="h2"
          className="shrink-0 text-2xl font-medium tracking-tight text-ink leading-[1.35] text-balance"
        >
          L’art de repenser l’ordinaire
        </TextReveal>

        <div className="flex w-full max-w-[809px] flex-col gap-6">
          <div className="flex flex-col gap-6 pt-4 sm:flex-row">
            <TextReveal
              as="p"
              delay={80}
              className="flex-1 text-sm font-medium tracking-tight text-muted leading-[1.5] text-pretty"
            >
              Chez HAY, nous avons toujours cru que le bon design était un droit pour tous. C’est pourquoi, dès le départ, les cofondateurs et directeurs artistiques Mette et Rolf Hay se sont engagés à collaborer avec les meilleurs designers de leur génération, venus du monde entier.
            </TextReveal>
            <TextReveal
              as="p"
              delay={160}
              className="flex-1 text-sm font-medium tracking-tight text-muted leading-[1.5] text-pretty"
            >
              Dans le seul objectif de créer des produits de haute qualité accessibles à un large public. Ce principe fondateur continue de nous animer aujourd’hui.
            </TextReveal>
          </div>
          <ButtonLink href="/a-propos" className="self-start">
            Découvrir notre histoire
          </ButtonLink>
        </div>
      </SiteContainer>

      <div className="img-outline relative aspect-[1800/1036] max-h-[100vh] w-full overflow-hidden">
        <Image
          src="/images/image 15.webp"
          alt="Collection de meubles et objets HAY"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}
