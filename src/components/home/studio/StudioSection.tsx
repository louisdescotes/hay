import SiteContainer from '@/components/ui/SiteContainer'
import TextReveal from '@/components/ui/TextReveal'
import StudioCollage from '@/components/home/studio/StudioCollage'

const LEAD =
  'Notre studio réunit designers, artisans et créatifs autour d’un même objectif : des objets simples, utiles, faits pour le plaisir de s’en servir.'

const COLUMN_LEFT =
  'Chaque idée se dessine, se teste et se partage. Cette collaboration guide notre travail et donne des pièces qui trouvent leur place au quotidien.'

const COLUMN_RIGHT =
  'Matériaux, couleurs et savoir-faire se croisent pour des objets contemporains, accessibles et durables.'

export default function StudioSection() {
  return (
    <SiteContainer as="section" className="flex flex-col gap-12">
      <TextReveal
        as="h2"
        className="w-full text-hero font-medium tracking-tight text-ink text-balance"
      >
        Le Studio
      </TextReveal>

      <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <StudioCollage />

        <div className="flex w-full max-w-[692px] flex-col gap-4 self-stretch lg:shrink-0">
          <TextReveal
            as="p"
            delay={80}
            className="text-2xl font-normal tracking-tight text-ink leading-[1.35] text-pretty"
            firstLineClassName="indent-[min(117px,8vw)]"
          >
            {LEAD}
          </TextReveal>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6">
            <TextReveal
              as="p"
              delay={160}
              className="flex-1 text-sm font-medium tracking-tight text-muted leading-[1.5] text-pretty"
            >
              {COLUMN_LEFT}
            </TextReveal>
            <TextReveal
              as="p"
              delay={200}
              className="flex-1 text-sm font-medium tracking-tight text-muted leading-[1.5] text-pretty"
            >
              {COLUMN_RIGHT}
            </TextReveal>
          </div>
        </div>
      </div>
    </SiteContainer>
  )
}
