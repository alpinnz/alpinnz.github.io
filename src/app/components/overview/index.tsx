import * as React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

type OverviewItem = {
  title: string
  descriptions: string[]
  cta?: string
  downloadCta?: string
}

export function Overview(): React.ReactElement {
  const { t } = useTranslation('overview')

  const overviewItem: OverviewItem = {
    title: t('title'),
    descriptions: t('descriptions', { returnObjects: true }) as string[],
    cta: t('cta'),
    downloadCta: t('download_cta'),
  }

  return (
    <section
      id="overview"
      className="px-8 md:px-20 lg:px-24 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10"
    >
      {/* Left: Text content */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="font-bold text-3xl md:text-4xl text-neutral-900 leading-snug">
          {overviewItem.title}
        </h1>

        <div className="mt-4 space-y-3">
          {overviewItem.descriptions.map((item, index) => (
            <p
              key={index}
              className="text-neutral-700 font-light leading-relaxed max-w-xl"
            >
              {item}
            </p>
          ))}
        </div>

        {(overviewItem.cta || overviewItem.downloadCta) && (
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            {overviewItem.cta && (
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                  })
                }
                className="rounded-full border border-primary-500 px-6 py-2.5 font-medium text-primary-600 transition-all duration-200 hover:bg-primary-500 hover:text-white"
              >
                {overviewItem.cta}
              </button>
            )}
            {overviewItem.downloadCta && (
              <a
                href="/CV%20Alfin%20Noviaji%20-%20FullStack.pdf"
                download="CV Alfin Noviaji - FullStack.pdf"
                className="rounded-full bg-primary-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-600"
              >
                {overviewItem.downloadCta}
              </a>
            )}
          </div>
        )}
      </motion.div>

      {/* Right: Profile image */}
      <motion.div
        className="flex-1 flex justify-center md:justify-end"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <img
          src={'/assets/images/profile.png'}
          alt="Alfin Noviaji"
          className="rounded-2xl shadow-lg w-64 md:w-80 lg:w-96 object-cover"
        />
      </motion.div>
    </section>
  )
}
