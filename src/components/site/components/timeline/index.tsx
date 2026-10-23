import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
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

      <div className="relative mx-auto max-w-5xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-5 top-2 w-px bg-gradient-to-b from-primary-200 via-neutral-300 to-transparent md:left-1/2 md:-translate-x-1/2"
        />
        <ol className="space-y-3 md:space-y-5">
          {visibleItems.map((item, index) => (
            <TimelineCard
              key={`${item.date_start}-${item.title}`}
              data={item}
              index={index}
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
  index: number
  compact: boolean
  locale: string
  now: string
  viewLink: string
}

function TimelineCard({
  data,
  index,
  compact,
  locale,
  now,
  viewLink,
}: TimelineCardProps): React.ReactElement {
  const isLeft = index % 2 === 0

  return (
    <motion.li
      className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:gap-x-0"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, delay: (index % 5) * 0.04 }}
      viewport={{ once: true }}
    >
      <article
        className={`col-start-2 row-start-1 min-w-0 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md sm:p-4 ${
          isLeft
            ? 'md:col-start-1 md:pr-6 md:text-right'
            : 'md:col-start-3 md:pl-6'
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-800">
          {formatTimelineDate(data, locale, now)}
        </p>
        <h3 className="mt-1.5 break-words text-sm font-semibold leading-snug text-neutral-900 sm:text-base">
          {data.title}
        </h3>
        <p
          className={`mt-1.5 text-xs leading-relaxed text-neutral-600 sm:text-sm ${
            compact ? 'line-clamp-3' : ''
          }`}
        >
          {data.descriptions}
        </p>
        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-primary-800 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:text-sm ${
              isLeft ? 'md:ml-auto' : ''
            }`}
          >
            {viewLink} <span aria-hidden="true">↗</span>
          </a>
        )}
      </article>

      <div
        aria-hidden="true"
        className="col-start-1 row-start-1 flex justify-center pt-3 md:col-start-2 md:pt-2"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary-600 shadow-sm ring-1 ring-primary-200 sm:h-10 sm:w-10">
          <Image
            src={iconMap[data.icon]}
            alt=""
            width={18}
            height={18}
            className="h-3.5 w-3.5 brightness-0 invert sm:h-4 sm:w-4"
          />
        </span>
      </div>
    </motion.li>
  )
}

function formatTimelineDate(
  item: TimelineItem,
  locale: string,
  now: string,
): string {
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
