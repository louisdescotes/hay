import Link from 'next/link'
import { megaNav } from '@/components/menu/nav-data'
import SiteContainer from '@/components/ui/SiteContainer'

export default function Footer() {
  return (
    <footer className="pb-12">
      <SiteContainer className="flex flex-col gap-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-1.5">
            <Link
              href="/"
              className="text-2xl font-semibold uppercase leading-[1.2] text-ink"
            >
              HAY
            </Link>
            <p className="text-sm font-normal tracking-tight text-ink">
              ©&nbsp;2026 HAY. Tous droits réservés.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-4">
            <ul className="flex w-[185px] flex-col gap-3 text-left uppercase">
              {megaNav.nouveau.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-semibold tracking-tight text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex w-[150px] flex-col gap-3">
              <p className="text-base font-semibold uppercase tracking-tight text-ink">
                {megaNav.produits.title}
              </p>
              <ul className="flex flex-col gap-2">
                {megaNav.produits.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-normal tracking-tight text-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-[150px] flex-col gap-3">
              <p className="text-base font-semibold uppercase tracking-tight text-ink">
                {megaNav.accessoires.title}
              </p>
              <ul className="flex flex-col gap-2">
                {megaNav.accessoires.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-normal tracking-tight text-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-xs font-normal tracking-tight text-muted">
          <Link href="/mentions-legales">Mentions légales</Link>
          {' — '}
          <Link href="/politique-de-confidentialite">
            Politique de confidentialité
          </Link>
        </p>
      </SiteContainer>
    </footer>
  )
}
