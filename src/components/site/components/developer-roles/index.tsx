import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocalizedModule } from '../../locales/use-localized-module'

type SelectedWork = { label: string; url: string }

type DeveloperRole = {
  title: string
  description: string
  highlights: string[]
  tools: string[]
  icon: string
  isCurrent: boolean
  selectedWork: SelectedWork[]
}

export function DeveloperRoles(): React.ReactElement {
  const translations = useLocalizedModule('skills')
  const { header, skills } = translations
  const roles: DeveloperRole[] = skills

  return (
    <section
      id="developer-roles"
      aria-labelledby="developer-roles-title"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16 lg:px-10"
    >
      <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
          {header.eyebrow}
        </p>
        <h2 id="developer-roles-title" className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {header.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          {header.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {roles.map((role, index) => (
          <motion.article
            key={role.title}
            className="flex min-w-0 flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-primary-300 sm:p-6"
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded-xl bg-primary-50 p-2.5">
                <Image src={role.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold leading-snug text-neutral-900 sm:text-xl">
                  {role.title}
                </h3>
                {role.isCurrent && (
                  <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                    {header.current_label}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              {role.description}
            </p>

            <ul className="my-4 flex-1 space-y-2 text-sm leading-relaxed text-neutral-700">
              {role.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-neutral-100 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                {header.tools_label}
              </h4>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${role.title}: ${header.tools_label}`}>
                {role.tools.map((tool) => (
                  <li key={tool} className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-900">
                    {tool}
                  </li>
                ))}
              </ul>

              <h4 className="mb-1 mt-5 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                {header.selected_work_label}
              </h4>
              <ul className="space-y-1">
                {role.selectedWork.map((work) => (
                  <li key={work.url}>
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-primary-800 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      {work.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
