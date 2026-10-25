import * as React from 'react'
import Image from 'next/image'
import { useLocalization } from '@valfuse-node/react'
import { useLocalizedModule } from '../../locales/use-localized-module'

type CvStatus = 'idle' | 'generating' | 'success' | 'error'

export function Overview(): React.ReactElement {
  const translations = useLocalizedModule('overview')
  const { locale } = useLocalization()
  const [cvStatus, setCvStatus] = React.useState<CvStatus>('idle')
  const statusTimeout = React.useRef<number | null>(null)

  React.useEffect(() => () => {
    if (statusTimeout.current !== null) window.clearTimeout(statusTimeout.current)
  }, [])

  async function downloadCv() {
    if (cvStatus === 'generating') return
    if (statusTimeout.current !== null) window.clearTimeout(statusTimeout.current)
    setCvStatus('generating')

    try {
      const { generateCvPdf } = await import('@/lib/cv/generate-cv-pdf')
      const pdf = await generateCvPdf(locale === 'id' ? 'id' : 'en')
      const url = URL.createObjectURL(pdf)
      const link = document.createElement('a')
      link.href = url
      link.download = 'CV-Alfin-Noviaji.pdf'
      document.body.append(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
      setCvStatus('success')
    } catch (error) {
      console.error('CV generation failed', error)
      setCvStatus('error')
    }

    statusTimeout.current = window.setTimeout(() => setCvStatus('idle'), 5_000)
  }

  const statusText = cvStatus === 'generating'
    ? translations.cv_generating
    : cvStatus === 'success'
      ? translations.cv_success
      : translations.cv_error

  return (
    <section
      id="overview"
      className="mx-auto flex max-w-6xl scroll-mt-24 flex-col-reverse items-center gap-7 px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:gap-10 md:py-16 lg:px-10"
    >
      <div className="min-w-0 flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
          {translations.title}
        </h1>

        <div className="mt-4 space-y-3">
          {translations.descriptions.map((description, index) => (
            <p
              key={index}
              className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base md:mx-0"
            >
              {description}
            </p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          {translations.cta && (
            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-600 px-6 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {translations.cta}
            </button>
          )}
          <button
            type="button"
            onClick={downloadCv}
            disabled={cvStatus === 'generating'}
            aria-busy={cvStatus === 'generating'}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary-600 bg-white px-6 py-2.5 font-medium text-primary-800 transition-colors duration-200 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-wait disabled:opacity-60"
          >
            {cvStatus === 'generating' && (
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-primary-200 border-t-primary-700" />
            )}
            {cvStatus === 'generating' ? translations.cv_generating : translations.cv_cta}
          </button>
        </div>
      </div>

      <div className="flex flex-1 justify-center md:justify-end">
        <Image
          src="/assets/images/profile.webp"
          alt={translations.portrait_alt}
          width={340}
          height={340}
          preload
          fetchPriority="high"
          className="h-auto w-48 rounded-[2rem] object-cover shadow-xl ring-1 ring-neutral-200/60 sm:w-56 md:w-64 lg:w-72"
        />
      </div>

      {cvStatus !== 'idle' && (
        <div
          role={cvStatus === 'error' ? 'alert' : 'status'}
          className={`fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-lg sm:inset-x-auto sm:right-5 sm:mx-0 ${
            cvStatus === 'error'
              ? 'border-danger-200 bg-danger-50 text-danger-800'
              : cvStatus === 'success'
                ? 'border-success-200 bg-success-50 text-success-900'
                : 'border-primary-200 bg-white text-primary-900'
          }`}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {cvStatus === 'generating' ? '…' : cvStatus === 'success' ? '✓' : '!'}
          </span>
          <span>{statusText}</span>
        </div>
      )}
    </section>
  )
}
