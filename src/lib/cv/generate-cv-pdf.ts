import PDFDocument from 'pdfkit'
import Helvetica from 'pdfkit/standard-fonts/Helvetica'
import en from '@/data/en'
import id from '@/data/id'
import { githubRepositories } from '@/data/github-repositories'
import { socialLinks } from '@/data/social-links'
import { siteName } from '@/app/site-config'

type Locale = 'en' | 'id'
type TimelineItem = {
  title: string
  descriptions: string
  date_start: string
  date_end: string | null
  currently: boolean
  icon: string
  link: string | null
  cv_section?: 'education' | 'certification'
}
type PortfolioItem = {
  title: string
  descriptions: string
  techStack: string[]
  repoUrl?: string
  webUrl?: string
  liveUrl?: string
  playStoreUrl?: string
  appStoreUrl?: string
}

const colors = {
  ink: '#1f2933',
  muted: '#52606d',
  primary: '#296081',
}

const regularFont = 'Sora-Regular'
const boldFont = 'Sora-Bold'

const labels = {
  en: {
    profile: 'Professional Profile',
    experience: 'Work Experience',
    projects: 'Selected Projects & Open Source',
    contributions: 'Public Contributions',
    education: 'Education',
    certification: 'Certification',
    present: 'Present',
  },
  id: {
    profile: 'Profil Profesional',
    experience: 'Pengalaman Kerja',
    projects: 'Proyek Pilihan & Sumber Terbuka',
    contributions: 'Kontribusi Publik',
    education: 'Pendidikan',
    certification: 'Sertifikasi',
    present: 'Saat ini',
  },
} as const

function ensureSpace(doc: PDFKit.PDFDocument, height: number) {
  if (doc.y + height > doc.page.height - doc.page.margins.bottom) doc.addPage()
}

function addText(
  doc: PDFKit.PDFDocument,
  value: string,
  tag: string,
  options: PDFKit.Mixins.TextOptions = {},
) {
  doc.addStructure(doc.struct(tag, {}, () => {
    doc.text(value, options)
  }))
}

function addSection(doc: PDFKit.PDFDocument, title: string) {
  ensureSpace(doc, 55)
  doc.moveDown(0.8).font(boldFont).fontSize(11).fillColor(colors.primary)
  addText(doc, title.toUpperCase(), 'H2', { characterSpacing: 0.5 })
  doc.moveDown(0.25)
}

function addEntry(
  doc: PDFKit.PDFDocument,
  title: string,
  description: string,
  detail?: string,
  url?: string,
) {
  ensureSpace(doc, 60)
  doc.font(boldFont).fontSize(9.5).fillColor(colors.ink)
  addText(doc, title, 'H3')
  if (detail) {
    doc.font(regularFont).fontSize(8.5).fillColor(colors.muted)
    addText(doc, detail, 'P')
  }
  doc.font(regularFont).fontSize(9.5).fillColor(colors.ink)
  addText(doc, description, 'P', { lineGap: 2 })
  if (url) {
    doc.fontSize(8.5).fillColor(colors.primary)
    addText(doc, url, 'P', { link: url, underline: true })
  }
  doc.moveDown(0.5)
}

function formatDate(date: string, locale: Locale) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function timelinePeriod(item: TimelineItem, locale: Locale) {
  const start = formatDate(item.date_start, locale)
  const end = item.currently
    ? labels[locale].present
    : item.date_end ? formatDate(item.date_end, locale) : ''
  return end ? `${start} - ${end}` : start
}

function createPdfBlob(doc: PDFKit.PDFDocument): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = []
    doc.on('data', (chunk: Uint8Array) => chunks.push(new Uint8Array(chunk)))
    doc.on('end', () => resolve(new Blob(chunks as BlobPart[], { type: 'application/pdf' })))
    doc.on('error', reject)
  })
}

export async function generateCvPdf(locale: Locale): Promise<Blob> {
  const content = locale === 'id' ? id : en
  const text = labels[locale]
  const items = content.timeline.items as TimelineItem[]
  const projects = content.portfolio.items as PortfolioItem[]
  const knownRepositories = new Set(projects.flatMap((project) => project.repoUrl ? [project.repoUrl] : []))
  const additionalProjects = githubRepositories.filter((repository) =>
    repository.portfolio &&
    !knownRepositories.has(repository.url) &&
    !projects.some((project) => project.repoUrl?.startsWith(`${repository.url}/`)),
  )

  const [regularResponse, boldResponse] = await Promise.all([
    fetch('/assets/fonts/Sora-Regular.ttf'),
    fetch('/assets/fonts/Sora-Bold.ttf'),
  ])
  if (!regularResponse.ok || !boldResponse.ok) throw new Error('CV fonts are unavailable')

  // PDFKit uses Helvetica while constructing the document; the content uses embedded Sora fonts.
  const pdfkit = await import('pdfkit') as unknown as {
    registerStdFonts: (...fonts: unknown[]) => void
  }
  pdfkit.registerStdFonts(Helvetica)

  const doc = new PDFDocument({
    size: 'A4',
    margin: 48,
    tagged: true,
    pdfVersion: '1.5',
    lang: locale === 'id' ? 'id-ID' : 'en-US',
    info: { Title: `CV - ${siteName}`, Author: siteName, Subject: 'Curriculum Vitae' },
  })
  const pdf = createPdfBlob(doc)

  doc.registerFont(regularFont, new Uint8Array(await regularResponse.arrayBuffer()))
  doc.registerFont(boldFont, new Uint8Array(await boldResponse.arrayBuffer()))

  doc.font(boldFont).fontSize(19).fillColor(colors.primary)
  addText(doc, siteName, 'H1')
  doc.font(regularFont).fontSize(10.5).fillColor(colors.ink)
  addText(doc, content.overview.title.split('—').at(-1)?.trim().replace(/^a /, '') ?? '', 'P')
  doc.moveDown(0.3)
  doc.fontSize(8.5).fillColor(colors.muted)
  const contact = content.footer.contactItems.map((item) => item.title).join('  |  ')
  addText(doc, contact, 'P')
  for (const social of socialLinks) {
    doc.fontSize(8.5).fillColor(colors.primary)
    addText(doc, `${social.label}: ${social.href}`, 'P', { link: social.href })
  }

  addSection(doc, text.profile)
  for (const description of content.about_me.descriptions) {
    doc.font(regularFont).fontSize(9.5).fillColor(colors.ink)
    addText(doc, description, 'P', { lineGap: 2 })
    doc.moveDown(0.35)
  }

  addSection(doc, content.skills.header.title)
  for (const skill of content.skills.skills) {
    addEntry(doc, skill.title, skill.description, skill.tools.join('  |  '))
  }

  addSection(doc, text.experience)
  for (const item of items.filter((entry) => entry.icon === 'ic_desktop' || entry.icon === 'ic_mobile')) {
    addEntry(doc, item.title, item.descriptions, timelinePeriod(item, locale))
  }

  addSection(doc, text.projects)
  for (const project of projects) {
    addEntry(
      doc,
      project.title,
      project.descriptions,
      project.techStack.join('  |  '),
      project.repoUrl ?? project.webUrl ?? project.liveUrl ?? project.playStoreUrl ?? project.appStoreUrl,
    )
  }
  for (const repository of additionalProjects) {
    addEntry(
      doc,
      repository.portfolio!.title[locale],
      repository.description[locale],
      repository.language ?? undefined,
      repository.url,
    )
  }

  const contributions = items.filter((item) => item.icon === 'ic_github' && item.link?.includes('/pull/'))
  if (contributions.length) {
    addSection(doc, text.contributions)
    for (const item of contributions) {
      addEntry(doc, item.title, item.descriptions, timelinePeriod(item, locale), item.link ?? undefined)
    }
  }

  for (const section of ['education', 'certification'] as const) {
    const entries = items.filter((item) => item.cv_section === section)
    if (entries.length) {
      addSection(doc, text[section])
      for (const item of entries) {
        addEntry(doc, item.title, item.descriptions, timelinePeriod(item, locale), item.link ?? undefined)
      }
    }
  }

  doc.end()
  return pdf
}
