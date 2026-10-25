import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Dialog, Transition } from '@headlessui/react'
import { useLocalization } from '@valfuse-node/react'
import { useLocalizedModule } from '../../locales/use-localized-module'
import {
  githubRepositories,
  type PortfolioCategory,
} from '@/data/github-repositories'

const initialPortfolioItems = 6

type PortfolioHeader = {
  eyebrow: string
  title: string
  subtitle: string
}

type PortfolioCategoryWithAll = PortfolioCategory | 'all'

type PortfolioItem = {
  title: string
  descriptions: string
  details: string
  features?: string[]
  thumbnail: string
  gallery: string[]
  category: PortfolioCategory
  techStack: string[]
  created_at?: string
  liveUrl?: string
  repoUrl?: string
  webUrl?: string
  playStoreUrl?: string
  appStoreUrl?: string
}

type PortfolioProject =
  | {
      kind: 'case-study'
      id: string
      title: string
      descriptions: string
      category: PortfolioCategory
      createdAt?: string
      item: PortfolioItem
    }
  | {
      kind: 'repository'
      id: string
      title: string
      descriptions: string
      category: PortfolioCategory
      repositoryName: string
      url: string
      language: string | null
    }

export function Portfolio(): React.ReactElement {
  const { locale } = useLocalization()
  const translations = useLocalizedModule('portfolio')

  const header: PortfolioHeader = translations.header
  const categories: PortfolioCategoryWithAll[] = [
    'all',
    'packages',
    'mobile',
    'frontend',
    'fullstack',
    'backend',
    'design',
    'learning',
  ]
  const [activeCategory, setActiveCategory] = React.useState<PortfolioCategoryWithAll>('all')
  const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(
    null,
  )
  const [isOpen, setIsOpen] = React.useState(false)
  const [visiblePortfolioCount, setVisiblePortfolioCount] = React.useState(
    initialPortfolioItems,
  )
  const [currentGalleryIndex, setCurrentGalleryIndex] = React.useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false) // 🆕 state baru
  const portfolioItems: PortfolioItem[] = translations.items as PortfolioItem[]

  const linkedRepositoryUrls = new Set(
    portfolioItems.flatMap((item) => (item.repoUrl ? [item.repoUrl] : [])),
  )
  const caseStudyProjects: PortfolioProject[] = portfolioItems.map((item) => ({
    kind: 'case-study',
    id: `case-study:${item.title}`,
    title: item.title,
    descriptions: item.descriptions,
    category: item.category,
    createdAt: item.created_at,
    item,
  }))
  const repositoryProjects: PortfolioProject[] = githubRepositories.flatMap(
    (repository): PortfolioProject[] => {
      if (
        !repository.portfolio ||
        repository.detailsPending ||
        linkedRepositoryUrls.has(repository.url) ||
        portfolioItems.some((item) => item.repoUrl?.startsWith(`${repository.url}/`))
      ) {
        return []
      }

      const localeKey = locale === 'id' ? 'id' : 'en'

      return [
        {
          kind: 'repository',
          id: `repository:${repository.name}`,
          title: repository.portfolio.title[localeKey],
          descriptions: repository.description[localeKey],
          category: repository.portfolio.category,
          repositoryName: repository.name,
          url: repository.url,
          language: repository.language,
        },
      ]
    },
  )
  const sortedItems = [...caseStudyProjects, ...repositoryProjects].sort(
    (a, b) => {
      const aTime = a.kind === 'case-study' && a.createdAt
        ? Date.parse(a.createdAt)
        : 0
      const bTime = b.kind === 'case-study' && b.createdAt
        ? Date.parse(b.createdAt)
        : 0
      return bTime - aTime
    },
  )

  const filteredItems =
    activeCategory === 'all'
      ? sortedItems
      : sortedItems.filter((item) => item.category === activeCategory)
  const visibleItems = filteredItems.slice(0, visiblePortfolioCount)
  const remainingProjectCount = filteredItems.length - visibleItems.length

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item)
    setCurrentGalleryIndex(0)
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  const nextGallery = () => {
    if (!selectedItem) return
    setCurrentGalleryIndex((prev) => (prev + 1) % selectedItem.gallery.length)
  }
  const prevGallery = () => {
    if (!selectedItem) return
    setCurrentGalleryIndex(
      (prev) =>
        (prev - 1 + selectedItem.gallery.length) % selectedItem.gallery.length,
    )
  }

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      {/* Header */}
      <motion.div
        className="mb-6 text-center"
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
          {header.eyebrow}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {header.title}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          {header.subtitle}
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary-500"></div>
      </motion.div>

      {/* Category Tabs */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 sm:mb-6 sm:flex-wrap sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={activeCategory === cat}
            onClick={() => {
              setActiveCategory(cat)
              setVisiblePortfolioCount(initialPortfolioItems)
            }}
            className={`min-h-10 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
              activeCategory === cat
                ? 'bg-primary-600 text-neutral-0 shadow-sm'
                : 'border border-neutral-100 bg-neutral-50 text-neutral-700 hover:bg-primary-50'
            }`}
          >
            {translations.categories[cat as keyof typeof translations.categories]}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <motion.div
        id="portfolio-projects"
        layout
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
      >
        {visibleItems.map((project, index) =>
          project.kind === 'case-study' ? (
            <motion.button
              key={project.id}
              layout
              type="button"
              aria-label={translations.project_details_label.replace(
                '{title}',
                project.title,
              )}
              className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary-500"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: (index % 6) * 0.04 }}
              viewport={{ once: true }}
              onClick={() => openModal(project.item)}
            >
              <div className="relative aspect-[16/9] bg-neutral-50 sm:aspect-[16/8]">
                <Image
                  src={project.item.thumbnail}
                  alt={translations.project_preview_alt.replace('{title}', project.title)}
                  fill
                  loading="lazy"
                  className="object-contain p-3"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                  {translations.categories[project.category]}
                </span>
                <h3 className="mt-1 text-base font-semibold leading-snug text-neutral-900">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                  {project.descriptions}
                </p>
              </div>
            </motion.button>
          ) : (
            <RepositoryProjectCard
              key={project.id}
              project={project}
              index={index}
              categoryLabel={translations.categories[project.category]}
              repositoryLabel={translations.repository_label}
              openLabel={translations.project_repository_label.replace(
                '{title}',
                project.title,
              )}
            />
          ),
        )}
      </motion.div>
      {filteredItems.length === 0 && (
        <p className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-5 py-10 text-center text-sm text-neutral-600">
          {translations.empty_state}
        </p>
      )}
      {filteredItems.length > initialPortfolioItems && (
        <div className="mt-5 text-center">
          <button
            type="button"
            aria-expanded={visibleItems.length > initialPortfolioItems}
            aria-controls="portfolio-projects"
            onClick={() => {
              if (remainingProjectCount === 0) {
                setVisiblePortfolioCount(initialPortfolioItems)
                return
              }

              setVisiblePortfolioCount((current) =>
                Math.min(current + initialPortfolioItems, filteredItems.length),
              )
            }}
            className="min-h-11 rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 transition-colors hover:border-primary-400 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {remainingProjectCount === 0
              ? translations.show_less_projects
              : translations.load_more_projects.replace(
                  '{count}',
                  String(Math.min(initialPortfolioItems, remainingProjectCount)),
                )}
          </button>
        </div>
      )}

      {/* Detail Modal */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50"
          open={isOpen}
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-neutral-0 p-4 shadow-xl sm:p-6">
                {selectedItem && (
                  <>
                    <button type="button" onClick={closeModal} aria-label={translations.close_details_label} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-neutral-800 shadow-md hover:bg-neutral-50">
                      ×
                    </button>
                    {/* Gallery */}
                    <div className="relative mb-4 flex min-h-48 max-h-[55dvh] w-full items-center justify-center overflow-hidden rounded-2xl bg-neutral-50">
                      <button
                        type="button"
                        aria-label={translations.open_image_label}
                        onClick={() => setIsImageModalOpen(true)}
                        className="flex h-full w-full items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-600"
                      >
                        <Image
                          src={selectedItem.gallery[currentGalleryIndex]}
                          alt={selectedItem.title}
                          width={1200}
                          height={800}
                          unoptimized
                          loading="eager"
                          className="h-auto max-h-[55dvh] w-auto max-w-full cursor-zoom-in object-contain"
                        />
                      </button>

                      {selectedItem.gallery.length > 1 && (
                        <>
                          <button
                            type="button"
                            aria-label={translations.previous_image_label}
                            onClick={prevGallery}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            &#8592;
                          </button>
                          <button
                            type="button"
                            aria-label={translations.next_image_label}
                            onClick={nextGallery}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            &#8594;
                          </button>
                        </>
                      )}
                    </div>

                    {/* Info */}
                    <Dialog.Title className="mb-2 text-xl font-bold text-neutral-900 sm:text-2xl">
                      {selectedItem.title}
                    </Dialog.Title>
                    <Dialog.Description className="text-neutral-700 mb-4">
                      {selectedItem.descriptions}
                    </Dialog.Description>
                    <p className="mb-4 text-neutral-600">
                      {selectedItem.details}
                    </p>

                    {selectedItem.features && (
                      <div className="mb-5">
                        <h4 className="mb-2 font-semibold text-neutral-900">
                          {translations.features_label}
                        </h4>
                        <ul className="space-y-2">
                          {selectedItem.features.map((feature) => (
                            <li key={feature} className="flex gap-2 text-sm leading-relaxed text-neutral-700">
                              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                              <span className="min-w-0 break-words">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">{translations.tech_stack_label}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex flex-wrap gap-3">
                        {selectedItem.liveUrl && (
                          <a
                            href={selectedItem.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-neutral-0 rounded-lg hover:from-green-600 hover:to-green-700 transition"
                          >
                            {translations.live_label}
                          </a>
                        )}
                        {selectedItem.repoUrl && (
                          <a
                            href={selectedItem.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-neutral-0 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                          >
                            {translations.repository_label}
                          </a>
                        )}
                        {selectedItem.webUrl && (
                          <a
                            href={selectedItem.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-neutral-0 rounded-lg hover:from-purple-600 hover:to-purple-700 transition"
                          >
                            {translations.website_label}
                          </a>
                        )}
                        {selectedItem.playStoreUrl && (
                          <a
                            href={selectedItem.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-neutral-0 rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
                          >
                            {translations.play_store_label}
                          </a>
                        )}
                        {selectedItem.appStoreUrl && (
                          <a
                            href={selectedItem.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-neutral-0 rounded-lg hover:from-gray-600 hover:to-gray-700 transition"
                          >
                            {translations.app_store_label}
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Full image modal */}
      <Transition show={isImageModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[60]"
          open={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        >
          <Dialog.Title className="sr-only">
            {selectedItem?.title ?? translations.close_image_label}
          </Dialog.Title>
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
            {selectedItem && <Image
              src={selectedItem.gallery[currentGalleryIndex]}
              alt={selectedItem.title}
              width={1200}
              height={800}
              unoptimized
              className="max-h-[90dvh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            />}
            <button
              type="button"
              aria-label={translations.close_image_label}
              onClick={() => setIsImageModalOpen(false)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-white transition hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
            >
              ✕
            </button>
          </div>
        </Dialog>
      </Transition>
    </section>
  )
}

type RepositoryProjectCardProps = {
  project: Extract<PortfolioProject, { kind: 'repository' }>
  index: number
  categoryLabel: string
  repositoryLabel: string
  openLabel: string
}

function RepositoryProjectCard({
  project,
  index,
  categoryLabel,
  repositoryLabel,
  openLabel,
}: RepositoryProjectCardProps): React.ReactElement {
  return (
    <motion.a
      layout
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={openLabel}
      className="group block overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary-500"
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.04 }}
      viewport={{ once: true }}
    >
      <div className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-50 via-white to-slate-100 p-4 sm:aspect-[16/8] sm:p-5">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-7 select-none text-[8rem] font-bold leading-none text-primary-100/80"
        >
          {project.title.slice(0, 1)}
        </span>
        <div className="relative flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-800 shadow-sm">
            {categoryLabel}
          </span>
          <span className="rounded-full border border-white/80 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
            {project.language ?? 'GitHub'}
          </span>
        </div>
        <div className="relative flex min-w-0 items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-neutral-600">
              alpinnz/{project.repositoryName}
            </p>
            <div className="mt-2 h-1 w-12 rounded-full bg-primary-500 transition-all group-hover:w-16" />
          </div>
          <span aria-hidden="true" className="shrink-0 text-xl text-primary-700">
            ↗
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold leading-snug text-neutral-900">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
          {project.descriptions}
        </p>
        <div className="mt-3 border-t border-neutral-100 pt-2.5 text-xs font-semibold text-primary-800">
          {repositoryLabel}
        </div>
      </div>
    </motion.a>
  )
}
