import ProductCarousel from '@/components/ui/ProductCarousel'

const items = [
  {
    image: '/images/image 15-1.webp',
    title: 'Essential Steel Oval Dish',
    href: '/collections/oval-dish',
  },
  {
    image: '/images/image 16.webp',
    title: 'Mimi Sofa by Philippe Malouin',
    href: '/collections/mimi-sofa',
  },
  {
    image: '/images/image 18.webp',
    title: 'Backflip Chair',
    href: '/collections/backflip',
  },
  {
    image: '/images/image 19.webp',
    title: 'Essential Steel Collection',
    href: '/collections/essential-steel',
  },
]

export default function CollectionsSection() {
  return (
    <section>
      <ProductCarousel
        id="collections-carousel"
        label="Autres collections"
        title="Explorer d’autres collections"
        items={items}
      />
    </section>
  )
}
