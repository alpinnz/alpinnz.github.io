import * as React from 'react'
import Image from 'next/image'
import { useLocalization } from '@valfuse-node/react'
import { useLocalizedModule } from '../../locales/use-localized-module'

type TimelineItem = {
  title: string
  descriptions: string
  date_start: string
  date_end: string | null
  icon: string
  currently?: boolean
  link?: string | null
}

const initialTimelineItems = 5

const iconMap: Record<string, string> = {
  ic_school: '/assets/icons/ic_school.svg',
  ic_mobile: '/assets/icons/ic_mobile.svg',
  ic_desktop: '/assets/icons/ic_desktop.svg',
  ic_github: '/assets/icons/ic_github.svg',
}

export function Timeline(): React.ReactElement {
  const { locale } = useLocalization()
  const translations = useLocalizedModule('timeline')
  const [showAll, setShowAll] = React.useState(false)
  const items = translations.items as TimelineItem[]
  const visibleItems = showAll ? items : items.slice(0, initialTimelineItems)

  return (
    <section
      id="timeline"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      <div className="mx-auto mb-7 max-w-3xl text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
          {translations.header.eyebrow}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {translations.header.title}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          {translations.header.subtitle}
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary-200 via-neutral-200 to-transparent"
        />
        <ol className="space-y-3">
          {visibleItems.map((item) => (
            <TimelineCard
              key={`${item.date_start}-${item.title}`}
              data={item}
              compact={!showAll}
              locale={locale}
              now={translations.now}
              viewLink={translations.view_link}
            />
          ))}
        </ol>
      </div>

      {items.length > initialTimelineItems && (
        <div className="mt-5 text-center">
          <button
            type="button"
            aria-expanded={showAll}
            onClick={() => setShowAll((current) => !current)}
            className="min-h-11 rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 transition-colors hover:border-primary-400 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {showAll ? translations.show_less : translations.show_all}
          </button>
        </div>
      )}
    </section>
  )
}

type TimelineCardProps = {
  data: TimelineItem
  compact: boolean
  locale: string
  now: string
  viewLink: string
}

function TimelineCard({ data, compact, locale, now, viewLink }: TimelineCardProps): React.ReactElement {
  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute left-0 top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-primary-600 shadow-sm ring-1 ring-primary-200"
      />
      <article className="grid gap-2 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm sm:p-5 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-6">
        <p className="pt-0.5 text-xs font-semibold uppercase tracking-wide text-primary-800 md:text-sm">
          {formatTimelineDate(data, locale, now)}
        </p>
        <div className="min-w-0">
          <div className="flex items-start gap-2.5">
            <Image
              src={iconMap[data.icon]}
              alt=""
              width={18}
              height={18}
              className="mt-0.5 h-[18px] w-[18px] shrink-0 opacity-65"
            />
            <h3 className="min-w-0 break-words text-sm font-semibold leading-snug text-neutral-900 sm:text-base">
              {data.title}
            </h3>
          </div>
          <p className={`mt-1.5 text-sm leading-relaxed text-neutral-600 ${compact ? 'line-clamp-3' : ''}`}>
            {data.descriptions}
          </p>
          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-primary-800 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {viewLink} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </article>
    </li>
  )
}

function formatTimelineDate(item: TimelineItem, locale: string, now: string): string {
  const start = formatDate(item.date_start, locale)
  if (item.currently) return `${start} – ${now}`
  if (!item.date_end) return start
  return `${start} – ${formatDate(item.date_end, locale)}`
}

function formatDate(dateString: string, locale: string): string {
  const date = new Date(`${dateString}T12:00:00`)
  const year = date.getFullYear()
  const month = date.toLocaleDateString(locale, { month: 'short' })
  return `${month} ${year}`
}
