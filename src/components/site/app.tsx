"use client";

import React from 'react'
import { LocalizationProvider } from '@valfuse-node/react'
import manifest from '@/generated/localizations/localization.manifest.json'
import { Overview } from './components/overview'
import { Navbar } from './components/navbar'
import { AboutMe } from './components/about_me'
import { Timeline } from './components/timeline'
import { Skill } from './components/skills'
import { Portfolio } from './components/portfolio'
import { Footer } from './components/footer'

export function App(): React.ReactElement {
  return (
    <LocalizationProvider manifest={manifest} initialLocale="en">
    <div id="alpinnz">
      <Navbar />
      <Overview />
      <AboutMe />
      <Skill />
      <Timeline />
      <Portfolio />
      <Footer />
    </div>
    </LocalizationProvider>
  )
}
