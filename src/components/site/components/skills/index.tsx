import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { useLocalizedModule } from '../../locales/use-localized-module'

type SkillHeader = {
  title: string
  subtitle: string
  tools_label: string
}

type SkillItem = {
  title: string
  description: string
  tools: string[]
}

export function Skill(): React.ReactElement {
  const translations = useLocalizedModule('skills')
  const header: SkillHeader = translations.header
  const skills: SkillItem[] = translations.skills

  const icons: string[] = [
    '/assets/icons/ic_android.svg',
    '/assets/icons/ic_front_end.svg',
    '/assets/icons/ic_back_end.svg',
  ]

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16 lg:px-10">
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.6 }}
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

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {skills.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-md sm:p-6"
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="shrink-0 rounded-xl bg-primary-50 p-2.5">
                <Image
                  src={icons[index]}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {item.title}
              </h3>
            </div>

            <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-700">
              {item.description}
            </p>

            <div className="border-t border-neutral-100 pt-4 text-xs sm:text-sm">
              <p className="mb-1 font-semibold text-primary-700">
                {header.tools_label}:
              </p>
              <p className="leading-relaxed text-neutral-600">
                {item.tools.join(', ')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
