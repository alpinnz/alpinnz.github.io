import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocalization } from '@valfuse-node/react'
import { useLocalizedModule } from '../../locales/use-localized-module'

type TimelineIHeader = {
  title: string
  subtitle: string
}

type TimelineItem = {
  title: string
  descriptions: string
  date_start: string
  date_end: string | null
  icon: string
  currently?: boolean
  link?: string | null
}

const iconMap: Record<string, string> = {
  ic_school: '/assets/icons/ic_school.svg',
  ic_mobile: '/assets/icons/ic_mobile.svg',
  ic_desktop: '/assets/icons/ic_desktop.svg',
  ic_github: '/assets/icons/ic_github.svg',
}

export function Timeline(): React.ReactElement {
  const { locale } = useLocalization()
  const translations = useLocalizedModule('timeline')
  const header: TimelineIHeader = translations.header
  const items: TimelineItem[] = translations.items

  return (
    <section id="timeline" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16 lg:px-10">
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {header.title}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          {header.subtitle}
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary-500"></div>
      </motion.div>

      <div className="relative mt-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-transparent via-primary-300 to-transparent md:left-1/2 md:w-0.5 md:-translate-x-1/2"
        />
        {items.map((item, index) => (
          <TimelineCard
            key={`${item.date_start}-${item.title}`}
            data={item}
            index={index}
            locale={locale}
            now={translations.now}
            viewLink={translations.view_link}
          />
        ))}
      </div>
    </section>
  )
}

type CardProps = {
  data: TimelineItem
  index: number
  locale: string
  now: string
  viewLink: string
}

function TimelineCard({ data, index, locale, now, viewLink }: CardProps): React.ReactElement {
  const isLeft = index % 2 === 0

  return (
    <motion.article
      className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 pb-6 last:pb-0 md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:gap-x-0 md:pb-8"
      initial={{ y: 30 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div
        className={`col-start-2 row-start-1 min-w-0 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 md:p-6 ${
          isLeft
            ? 'md:col-start-1 md:pr-8 md:text-right'
            : 'md:col-start-3 md:pl-8'
        }`}
      >
        <p className="text-xs font-semibold tracking-wide text-primary-700">
          {formatTimelineDate(data, locale, now)}
        </p>
        <h3 className="mt-2 break-words text-base font-semibold leading-snug text-neutral-900 sm:text-lg">
          {data.title}
        </h3>
        <p className="mt-2 break-words text-sm leading-relaxed text-neutral-700">
          {data.descriptions}
        </p>
        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 flex w-fit items-center text-sm font-semibold text-primary-700 hover:underline ${
              isLeft ? 'md:ml-auto' : ''
            }`}
          >
            {viewLink} <span aria-hidden="true" className="ml-1">→</span>
          </a>
        )}
      </div>
      <div
        aria-hidden="true"
        className="col-start-1 row-start-1 flex justify-center md:col-start-2"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary-600 shadow-md ring-1 ring-primary-200 md:h-11 md:w-11">
          <Image
            src={iconMap[data.icon]}
            alt=""
            width={20}
            height={20}
            className="h-4 w-4 brightness-0 invert"
          />
        </span>
      </div>
    </motion.article>
  )
}

function formatTimelineDate(item: TimelineItem, locale: string, now: string): string {
  const start = formatDate(item.date_start, locale)
  if (item.currently) return `${start} – ${now}`
  if (!item.date_end) return start
  return `${start} – ${formatDate(item.date_end, locale)}`
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = date.toLocaleDateString(locale, { month: 'short' })
  return `${month} ${year}`
}
