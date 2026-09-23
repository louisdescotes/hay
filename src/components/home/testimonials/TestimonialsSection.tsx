'use client'

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Testimonials
 *
 *    0–~5.5s   quote lines stagger (opacity + translateY)
 *    ~quoteEnd − authorLead   author same entrance
 *    0–6.8s    progress ring clip-path (linear, loop)
 * ───────────────────────────────────────────────────────── */

import SectionHeader from '@/components/ui/SectionHeader'
import SiteContainer from '@/components/ui/SiteContainer'
import TestimonialsPlayer from '@/components/home/testimonials/TestimonialsPlayer'

const testimonials = [
  {
    quote:
      'J’aime particulièrement la façon dont HAY arrive à rendre les objets du quotidien à la fois simples, fonctionnels et vraiment beaux. Chaque pièce trouve facilement sa place dans notre intérieur, sans jamais en faire trop.',
    author: 'Camille R.',
  },
  {
    quote:
      'Chaque objet HAY trouve sa place sans forcer. La qualité et la simplicité se ressentent au quotidien, et c’est exactement ce que nous cherchions pour notre intérieur.',
    author: 'Franck Moret',
  },
  {
    quote:
      'On a meublé presque toute la maison avec HAY. Les lignes sont claires, les couleurs juste ce qu’il faut, et on a l’impression que tout a été pensé pour la vraie vie — pas seulement pour les photos.',
    author: 'Léa Martin',
  },
  {
    quote:
      'Ce qui me plaît chez HAY, c’est cette évidence : rien n’est superflu, tout est agréable à utiliser. Nos invités remarquent toujours quelque chose, sans que ça prenne toute la pièce.',
    author: 'Thomas Nguyen',
  },
]

export default function TestimonialsSection() {
  return (
    <SiteContainer as="section" className="flex flex-col gap-12">
      <SectionHeader
        title="Ce qu’ils disent de nous"
        actionLabel="Voir tous les avis"
        actionHref="/avis"
      />

      <TestimonialsPlayer items={testimonials} />
    </SiteContainer>
  )
}
