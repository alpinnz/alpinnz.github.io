import * as React from 'react'
import { useLocalization } from '@valfuse-node/react'
import { useLocalizedModule } from '../../locales/use-localized-module'

export function Navbar(): React.ReactElement {
  const { locale, setLocale } = useLocalization()
  const translations = useLocalizedModule('navbar')
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  React.useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const genericHamburgerLine =
    'my-1 h-0.5 w-5 rounded-full bg-neutral-800 transition duration-200 ease-in-out'

  const navItems = translations.nav_items

  const selectLanguage = (language: 'en' | 'id') => {
    if (locale !== language) setLocale(language)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 px-5 py-2 shadow-sm backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <a
          href="#alpinnz"
          className="text-xl font-bold tracking-tight text-neutral-900 transition-colors hover:text-primary-800 sm:text-2xl"
        >
          Alpinnz
        </a>

        <nav
          id="primary-navigation"
          className={`${isOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 border-b border-neutral-200 bg-white px-5 py-3 shadow-lg sm:px-8 md:static md:ml-auto md:flex md:flex-row md:items-center md:gap-4 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navItems.map((item, idx) => (
            <NavButton
              key={idx}
              href={item.href}
              label={item.label}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <div
            role="group"
            aria-label={translations.language_label}
            className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 p-0.5"
          >
            {(['en', 'id'] as const).map((language) => (
              <button
                key={language}
                type="button"
                lang={language}
                aria-label={language === 'en' ? 'English' : 'Bahasa Indonesia'}
                aria-pressed={locale === language}
                onClick={() => selectLanguage(language)}
                className={`h-10 w-10 rounded-full text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
                  locale === language
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-primary-800'
                }`}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="group flex h-11 w-11 flex-col items-center justify-center rounded-xl transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 md:hidden"
            type="button"
            aria-label={isOpen ? translations.menu_close : translations.menu_open}
            aria-controls="primary-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`${genericHamburgerLine} ${
                isOpen
                  ? 'rotate-45 translate-y-3 opacity-70 group-hover:opacity-100'
                  : 'opacity-70 group-hover:opacity-100'
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? 'opacity-0' : 'opacity-70 group-hover:opacity-100'
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen
                  ? '-rotate-45 -translate-y-3 opacity-70 group-hover:opacity-100'
                  : 'opacity-70 group-hover:opacity-100'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  )
}

type NavButtonProps = {
  label: string
  href: string
  onClick: () => void
}

function NavButton({ label, href, onClick }: NavButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block rounded-lg py-2.5 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-primary-600 md:py-2"
    >
      {label}
    </a>
  )
}
