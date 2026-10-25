"use client";

import React from 'react'
import { LocalizationProvider } from '@valfuse-node/react'
import { MotionConfig } from 'framer-motion'
import manifest from '@/generated/localizations/localization.manifest.json'
import { Overview } from './components/overview'
import { Navbar } from './components/navbar'
import { AboutMe } from './components/about_me'
import { Timeline } from './components/timeline'
import { Skill } from './components/skills'
import { Portfolio } from './components/portfolio'
import { Footer } from './components/footer'

export function App({ locale }: { locale: 'en' | 'id' }): React.ReactElement {
  return (
    <LocalizationProvider manifest={manifest} initialLocale={locale}>
      <MotionConfig reducedMotion="user">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-neutral-900 focus:shadow-lg focus:outline-2 focus:outline-primary-600"
        >
          {locale === 'id' ? 'Lewati ke konten utama' : 'Skip to main content'}
        </a>
        <div id="alpinnz">
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Overview />
            <AboutMe />
            <Skill />
            <Timeline />
            <Portfolio />
            <Footer />
          </main>
        </div>
      </MotionConfig>
    </LocalizationProvider>
  )
}
