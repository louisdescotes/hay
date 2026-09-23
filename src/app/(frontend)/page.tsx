import AboutSection from '@/components/home/about/AboutSection'
import CollectionsSection from '@/components/home/collections/CollectionsSection'
import DesignersSection from '@/components/home/designers/DesignersSection'
import EditorialSection from '@/components/home/editorial/EditorialSection'
import HomeHero from '@/components/home/hero/HomeHero'
import ObjectsSection from '@/components/home/objects/ObjectsSection'
import StudioSection from '@/components/home/studio/StudioSection'
import TestimonialsSection from '@/components/home/testimonials/TestimonialsSection'
import Footer from '@/components/footer/Footer'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="flex flex-col gap-24 bg-canvas pb-8 pt-24 md:gap-40 md:pt-40">
        <ObjectsSection />
        <DesignersSection />
        <AboutSection />
        <EditorialSection />
        <StudioSection />
        <TestimonialsSection />
        <CollectionsSection />
        <Footer />
      </div>
    </>
  )
}
