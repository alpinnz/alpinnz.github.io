import * as React from 'react'
import { useLocalization } from '@valfuse-node/react'
import { useLocalizedModule } from '../../locales/use-localized-module'

type ColorTheme = 'light' | 'dark'

const colorThemeChangeEvent = 'site-color-theme-change'

function subscribeToColorTheme(onStoreChange: () => void): () => void {
  const root = document.documentElement
  root.addEventListener(colorThemeChangeEvent, onStoreChange)
  return () => root.removeEventListener(colorThemeChangeEvent, onStoreChange)
}

function getColorThemeSnapshot(): ColorTheme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function getServerColorThemeSnapshot(): ColorTheme {
  return 'light'
}

function setColorTheme(theme: ColorTheme): void {
  const root = document.documentElement
  root.dataset.themeTransition = 'true'
  root.dataset.theme = theme

  try {
    window.localStorage.setItem('site-theme', theme)
  } catch {
    // The active theme still changes when browser storage is unavailable.
  }

  root.dispatchEvent(new Event(colorThemeChangeEvent))
}

export function Navbar(): React.ReactElement {
  const { locale } = useLocalization()
  const translations = useLocalizedModule('navbar')
  const [isOpen, setIsOpen] = React.useState(false)
  const theme = React.useSyncExternalStore(
    subscribeToColorTheme,
    getColorThemeSnapshot,
    getServerColorThemeSnapshot,
  )

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  const themeToggleLabel = theme === 'dark'
    ? translations.enable_light_mode
    : translations.enable_dark_mode

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setColorTheme(nextTheme)
  }

  const genericHamburgerLine =
    'my-1 h-0.5 w-5 rounded-full bg-neutral-800 transition duration-200 ease-in-out'

  const navItems = translations.nav_items

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-neutral-0/90 px-5 py-2 shadow-sm backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <a
          href="#alpinnz"
          className="text-xl font-bold tracking-tight text-neutral-900 transition-colors hover:text-primary-800 sm:text-2xl"
        >
          Alpinnz
        </a>

        <nav
          id="primary-navigation"
          className={`${isOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 border-b border-neutral-200 bg-neutral-0 px-5 py-3 shadow-lg sm:px-8 md:static md:ml-auto md:flex md:flex-row md:items-center md:gap-4 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
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
          <a
            href={locale === 'en' ? '/id/' : '/'}
            hrefLang={locale === 'en' ? 'id' : 'en'}
            lang={locale === 'id' ? 'id' : 'en'}
            aria-label={`${translations.language_label}: ${locale.toUpperCase()}. ${translations.switch_language}`}
            title={translations.switch_language}
            className="group inline-flex h-11 w-12 shrink-0 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 md:h-10"
          >
            <span className="inline-flex h-8 w-12 items-center justify-center gap-1 rounded-lg border border-neutral-200 bg-neutral-0 text-xs font-semibold text-primary-800 transition-colors group-hover:border-primary-300 group-hover:bg-primary-50">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-3.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
              </svg>
              {locale === 'id' ? 'ID' : 'EN'}
            </span>
          </a>

          <button
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-neutral-700 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            type="button"
            aria-label={themeToggleLabel}
            aria-pressed={theme === 'dark'}
            title={themeToggleLabel}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M20.2 15.3A8.7 8.7 0 0 1 8.7 3.8 8.7 8.7 0 1 0 20.2 15.3Z" />
              </svg>
            )}
          </button>

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
