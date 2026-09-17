import React from 'react'
import '@blossom-carousel/react/style.css'
import { generalSans } from '@/fonts/general-sans'
import './styles.css'

export const metadata = {
  description: 'HAY',
  title: 'HAY',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={generalSans.variable}>
      <body className={generalSans.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
