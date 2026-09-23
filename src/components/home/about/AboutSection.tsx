import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import SiteContainer from '@/components/ui/SiteContainer'
import TextReveal from '@/components/ui/TextReveal'

export default function AboutSection() {
  return (
    <SiteContainer as="section" className="flex flex-col gap-20">
      <div className="flex flex-col gap-12">
        <SectionHeader
          title="À propos de nous"
          actionLabel="En savoir plus sur HAY"
          actionHref="/a-propos"
        />
        <TextReveal
          as="p"
          className="max-w-[1158px] self-center text-xl font-normal tracking-tight text-ink leading-[1.4] text-pretty sm:text-2xl sm:leading-[1.35]"
          firstLineClassName="indent-[min(117px,8vw)]"
        >
          Nous nous inspirons des réalités de la vie actuelle, où la frontière traditionnelle entre espace personnel et professionnel est plus floue — c’est pourquoi nos meubles, luminaires et accessoires s’adaptent à une grande variété d’environnements et répondent à de nombreux besoins.
        </TextReveal>
      </div>

      <div className="relative flex flex-col gap-6 md:h-[1050px]">
        <div className="img-outline relative aspect-[467/565] w-full max-w-[467px] overflow-hidden md:absolute md:left-0 md:top-0 md:h-[565px] md:w-[467px] md:max-w-none md:aspect-auto">
          <Image
            src="/images/image 34.webp"
            alt="Tournage du film HAY"
            fill
            sizes="467px"
            className="object-cover"
          />
        </div>
        <div className="img-outline relative aspect-[809/977] w-full max-w-[809px] self-end overflow-hidden md:absolute md:right-0 md:top-[73px] md:h-[977px] md:w-[min(809px,58%)] md:max-w-none md:aspect-auto">
          <Image
            src="/images/image 33.webp"
            alt="Façade d'un bâtiment historique"
            fill
            sizes="809px"
            className="object-cover"
          />
        </div>
      </div>
    </SiteContainer>
  )
}
