import * as React from 'react'
import Image from 'next/image'
import { useLocalizedModule } from '../../locales/use-localized-module'

type OverviewItem = {
  title: string
  descriptions: string[]
  cta?: string
}

export function Overview(): React.ReactElement {
  const translations = useLocalizedModule('overview')

  const overviewItem: OverviewItem = {
    title: translations.title,
    descriptions: translations.descriptions,
    cta: translations.cta,
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

        {overviewItem.cta && (
          <button
            type="button"
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary-600 px-6 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {overviewItem.cta}
          </button>
        )}
      </div>

      {/* Right: Profile image */}
      <div className="flex flex-1 justify-center md:justify-end">
        <Image
          src="/assets/images/profile.png"
          alt={translations.portrait_alt}
          width={340}
          height={340}
          preload
          className="h-auto w-48 rounded-[2rem] object-cover shadow-xl ring-1 ring-neutral-200/60 sm:w-56 md:w-64 lg:w-72"
        />
      </div>
    </section>
  )
}
