import ProductCarousel from '@/components/ui/ProductCarousel'

const items = [
  {
    image: '/images/image 8.webp',
    title: 'Essential Steel Collection',
    href: '/collections/essential-steel',
    priority: true,
  },
  {
    image: '/images/image 10.webp',
    title: 'Canelé Table Lamp by Leclercq Viallet',
    href: '/collections/canele',
  },
  {
    image: '/images/image 9.webp',
    title: 'Dori Collection by Doshi Levien',
    href: '/collections/dori',
  },
  {
    image: '/images/image 8-1.webp',
    title: 'Essential Steel Collection',
    href: '/collections/essential-steel-2',
  },
]

export default function ObjectsSection() {
  return (
    <section>
      <ProductCarousel
        id="objects-carousel"
        label="Objets du quotidien"
        title="Des objets pensés pour trouver naturellement leur place dans votre quotidien"
        items={items}
      />
    </section>
  )
}
