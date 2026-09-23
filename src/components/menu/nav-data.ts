export const navLinks = [
  { href: '/produits', label: 'Produits', id: 'produits' as const },
  { href: '/a-propos', label: 'À propos', id: 'a-propos' as const },
  { href: '/nous-trouver', label: 'Nous trouver', id: 'nous-trouver' as const },
] as const

export const megaNav = {
  nouveau: [
    { href: '/nouveau', label: 'Nouveau' },
    { href: '/professionnels', label: 'Professionnels' },
    { href: '/inspirations', label: 'Inspirations' },
  ],
  produits: {
    title: 'Produits',
    items: [
      { href: '/produits/sieges', label: 'Sièges' },
      { href: '/produits/tables', label: 'Tables' },
      { href: '/produits/armoires', label: 'Armoires' },
      { href: '/produits/lits', label: 'Lits' },
      { href: '/produits/dressings', label: 'Dressings' },
      { href: '/produits/exterieurs', label: 'Extérieurs' },
      { href: '/produits/luminaires', label: 'Luminaires' },
    ],
  },
  accessoires: {
    title: 'Accessoires',
    items: [
      { href: '/accessoires/nouveau', label: 'Nouveau' },
      { href: '/accessoires/salle-de-bain', label: 'Salle de bain' },
      { href: '/accessoires/chambres', label: 'Chambres' },
      { href: '/accessoires/chiens', label: 'Chiens' },
      { href: '/accessoires/tapis', label: 'Tapis' },
      { href: '/accessoires/salle-a-manger', label: 'Salle à manger' },
      { href: '/accessoires/voyage', label: 'Voyage' },
    ],
  },
  features: [
    {
      href: '/nouveau/posto',
      image: '/images/image 10.webp',
      title: 'Nouveau',
      subtitle: 'Posto Table Lamp',
    },
    {
      href: '/inspirations/john-tree',
      image: '/images/image 15-1.webp',
      title: 'Découvrir',
      subtitle: 'John Tree',
    },
  ],
} as const
