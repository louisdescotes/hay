import SiteContainer from '@/components/ui/SiteContainer'
import TextReveal from '@/components/ui/TextReveal'

export default function DesignersSection() {
  return (
    <SiteContainer as="section" className="flex flex-col items-center gap-10">
      <TextReveal
        as="h2"
        className="max-w-[692px] text-center text-xl font-normal tracking-tight text-ink text-pretty"
      >
        Chez HAY, nous tenons à collaborer avec les designers les plus talentueux, curieux et audacieux du monde entier.
      </TextReveal>
      <div className="img-outline relative aspect-[2642/1388] w-full overflow-hidden bg-ink">
        <iframe
          title="Film HAY — collaboration avec les designers"
          src="https://player.vimeo.com/video/385965868?h=6594bf1abd"
          className="absolute inset-0 size-full border-0"
          allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </SiteContainer>
  )
}
