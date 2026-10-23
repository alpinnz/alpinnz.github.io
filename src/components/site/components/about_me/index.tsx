import * as React from 'react'
import { motion } from 'framer-motion'
import { useLocalizedModule } from '../../locales/use-localized-module'

type AboutMeItem = {
  title: string
  descriptions: string[]
}

export function AboutMe(): React.ReactElement {
  const translations = useLocalizedModule('about_me')
  const aboutMeItem: AboutMeItem = {
    title: translations.title,
    descriptions: translations.descriptions,
  }

  return (
    <section
      id="about-me"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16 lg:px-10"
    >
      <div className="mx-auto max-w-3xl">
        {/* Title */}
        <motion.h2
          className="mb-6 text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl"
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {aboutMeItem.title}
        </motion.h2>

        {/* Descriptions */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {aboutMeItem.descriptions.map((desc, index) => (
            <motion.p
              key={index}
              className="text-left text-sm leading-relaxed text-neutral-700 sm:text-base"
              variants={{
                hidden: { y: 20 },
                visible: { y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              {desc}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
