import * as React from 'react'
import Image from 'next/image'
import { useLocalizedModule } from '../../locales/use-localized-module'

type OverviewItem = {
  title: string
  descriptions: string[]
  cta?: string
  downloadCta?: string
}

export function Overview(): React.ReactElement {
  const translations = useLocalizedModule('overview')

  const overviewItem: OverviewItem = {
    title: translations.title,
    descriptions: translations.descriptions,
    cta: translations.cta,
    downloadCta: translations.download_cta,
  }

  return (
    <section
      id="overview"
      className="mx-auto flex max-w-6xl scroll-mt-24 flex-col-reverse items-center gap-7 px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:gap-10 md:py-16 lg:px-10"
    >
      {/* Left: Text content */}
      <div className="min-w-0 flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
          {overviewItem.title}
        </h1>

        <div className="mt-4 space-y-3">
          {overviewItem.descriptions.map((item, index) => (
            <p
              key={index}
              className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base md:mx-0"
            >
              {item}
            </p>
          ))}
        </div>

        {(overviewItem.cta || overviewItem.downloadCta) && (
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            {overviewItem.cta && (
              <button
                type="button"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary-500 px-6 py-2.5 font-medium text-primary-700 transition-colors duration-200 hover:bg-primary-500 hover:text-white"
              >
                {overviewItem.cta}
              </button>
            )}
            {overviewItem.downloadCta && (
              <a
                href="/CV%20Alfin%20Noviaji%20-%20FullStack.pdf"
                download="CV Alfin Noviaji - FullStack.pdf"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-700"
              >
                {overviewItem.downloadCta}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Right: Profile image */}
      <div className="flex flex-1 justify-center md:justify-end">
          <Image
          src={'/assets/images/profile.png'}
          alt="Portrait of Alfin Noviaji"
          width={384}
          height={384}
          preload
          className="h-auto w-48 rounded-[2rem] object-cover shadow-xl ring-1 ring-neutral-200/60 sm:w-56 md:w-64 lg:w-72"
        />
      </div>
    </section>
  )
}
