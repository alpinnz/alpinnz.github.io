import * as React from 'react'
import { useLocalization } from '@valfuse-node/react'
import { useLocalizedModule } from '../../locales/use-localized-module'

export function Navbar(): React.ReactElement {
  const { locale, setLocale } = useLocalization()
  const translations = useLocalizedModule('navbar')
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) setIsOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  React.useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const genericHamburgerLine =
    'h-1 w-6 my-1 rounded-full bg-neutral-800 transition ease transform duration-300'

  const navItems = translations.nav_items

  const selectLanguage = (language: 'en' | 'id') => {
    if (locale !== language) setLocale(language)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 px-5 py-3 shadow-sm backdrop-blur-sm sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-row items-center justify-between">
        <a
          href="#alpinnz"
          className="text-2xl font-semibold tracking-tight text-neutral-800 transition-colors hover:text-primary-700 sm:text-3xl"
        >
          Alpinnz
        </a>

        {/* Hamburger menu button */}
        <div className="block lg:hidden">
          <button
            className="flex flex-col h-12 w-12 rounded justify-center items-center group"
            type="button"
            aria-label={isOpen ? translations.menu_close : translations.menu_open}
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

        {/* Navigation items + Language selector */}
        <nav
          className={`${isOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 border-b border-neutral-100 bg-white px-5 py-4 shadow-md sm:px-8 lg:static lg:flex lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {navItems.map((item, idx) => (
            <NavButton
              key={idx}
              href={item.href}
              label={item.label}
              onClick={() => setIsOpen(false)}
            />
          ))}
          <div className="mt-2 flex w-full items-center justify-between border-t border-neutral-100 pt-4 lg:mt-0 lg:w-auto lg:border-0 lg:p-0">
            <span className="text-sm font-medium text-neutral-600 lg:hidden">
              {translations.language_label}
            </span>
            <div
              role="group"
              aria-label={translations.language_label}
              className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 p-1"
            >
              {(['en', 'id'] as const).map((language) => (
                <button
                  key={language}
                  type="button"
                  lang={language}
                  aria-label={language === 'en' ? 'English' : 'Bahasa Indonesia'}
                  aria-pressed={locale === language}
                  onClick={() => selectLanguage(language)}
                  className={`h-11 min-w-11 rounded-full px-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:h-7 lg:min-w-10 ${
                    locale === language
                      ? 'bg-primary-600 text-neutral-0 shadow-sm'
                      : 'text-neutral-600 hover:text-primary-700'
                  }`}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </nav>
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
      className="block rounded-lg py-3 font-medium text-neutral-700 transition-colors duration-200 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-primary-500 lg:py-0"
    >
      {label}
    </a>
  )
}
