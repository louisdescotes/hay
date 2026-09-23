import React from 'react'
import '@blossom-carousel/react/style.css'
import Menu from '@/components/menu/Menu'
import { generalSans } from '@/fonts/general-sans'
import './styles.css'

export const metadata = {
  description:
    'Des meubles, luminaires et accessoires imaginés pour apporter couleur, fonctionnalité et personnalité à chaque espace.',
  title: 'HAY',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr" className={generalSans.variable}>
      <body className={generalSans.className}>
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
        >
          Aller au contenu
        </a>
        <Menu />
        <main id="contenu-principal">{children}</main>
      </body>
    </html>
  )
}
