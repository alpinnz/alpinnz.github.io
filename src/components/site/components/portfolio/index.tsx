import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Dialog, Transition } from '@headlessui/react'
import { useLocalization } from '@valfuse-node/react'
import { useLocalizedModule } from '../../locales/use-localized-module'
import { githubRepositories, type RepositoryCategory } from '@/data/github-repositories'

const initialPortfolioItems = 6

type PortfolioHeader = {
  eyebrow: string
  title: string
  subtitle: string
}

type PortfolioItem = {
  title: string
  descriptions: string
  details: string
  features?: string[]
  thumbnail: string
  gallery: string[]
  category: 'mobile' | 'frontend' | 'fullstack' | 'backend' | 'design' | 'packages'
  techStack: string[]
  created_at?: string
  liveUrl?: string
  repoUrl?: string
  webUrl?: string
  playStoreUrl?: string
  appStoreUrl?: string
}

export function Portfolio(): React.ReactElement {
  const { locale } = useLocalization()
  const translations = useLocalizedModule('portfolio')

  const header: PortfolioHeader = translations.header
  const categories = [
    'all',
    'packages',
    'mobile',
    'frontend',
    'fullstack',
    'backend',
    'design',
  ]
  const [activeCategory, setActiveCategory] = React.useState(categories[0])
  const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(
    null,
  )
  const [isOpen, setIsOpen] = React.useState(false)
  const [showAllPortfolioItems, setShowAllPortfolioItems] = React.useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = React.useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false) // 🆕 state baru
  const [activeRepositoryCategory, setActiveRepositoryCategory] =
    React.useState<'all' | RepositoryCategory>('all')
  const [repositoryQuery, setRepositoryQuery] = React.useState('')
  const portfolioItems: PortfolioItem[] = translations.items as PortfolioItem[]
  const repositoryCategories: Array<'all' | RepositoryCategory> = [
    'all',
    'tools',
    'backend',
    'web',
    'mobile',
    'research',
    'learning',
    'profile',
  ]

  const sortedItems = React.useMemo(() => {
    return [...portfolioItems].sort((a, b) => {
      const aTime = a.created_at ? Date.parse(a.created_at) : 0
      const bTime = b.created_at ? Date.parse(b.created_at) : 0
      return bTime - aTime
    })
  }, [portfolioItems])

  const filteredItems =
    activeCategory === 'all'
      ? sortedItems
      : sortedItems.filter((item) => item.category === activeCategory)
  const visibleItems = showAllPortfolioItems
    ? filteredItems
    : filteredItems.slice(0, initialPortfolioItems)

  const filteredRepositories = React.useMemo(() => {
    const query = repositoryQuery.trim().toLocaleLowerCase()
    return githubRepositories.filter((repository) => {
      const matchesCategory =
        activeRepositoryCategory === 'all' ||
        repository.category === activeRepositoryCategory
      const description = repository.description[locale === 'id' ? 'id' : 'en']
      const searchableText = [repository.name, repository.language ?? '', description]
        .join(' ')
        .toLocaleLowerCase()
      return matchesCategory && (!query || searchableText.includes(query))
    })
  }, [activeRepositoryCategory, locale, repositoryQuery])

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
              setShowAllPortfolioItems(false)
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
        layout
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
      >
        {visibleItems.map((item, index) => (
          <motion.button
            key={`${item.title}-${index}`}
            layout
            type="button"
            aria-label={translations.project_details_label.replace('{title}', item.title)}
            className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary-500"
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            viewport={{ once: true }}
            onClick={() => openModal(item)}
          >
            <div className="relative aspect-[16/9] bg-neutral-50 sm:aspect-[16/8]">
              <Image
                src={item.thumbnail}
                alt={`${item.title} project preview`}
                fill
                loading="lazy"
                className="object-contain p-3"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                {translations.categories[item.category]}
              </span>
              <h3 className="mt-1 text-base font-semibold leading-snug text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                {item.descriptions}
              </p>
            </div>
          </motion.button>
        ))}
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
            aria-expanded={showAllPortfolioItems}
            onClick={() => setShowAllPortfolioItems((current) => !current)}
            className="min-h-11 rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 transition-colors hover:border-primary-400 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {showAllPortfolioItems
              ? translations.show_less_projects
              : translations.show_all_projects.replace(
                  '{count}',
                  String(filteredItems.length),
                )}
          </button>
        </div>
      )}

      <details className="group mt-8 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm open:shadow-md">
        <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-600 sm:px-6">
          <span className="min-w-0">
            <span className="block text-base font-semibold text-neutral-900 sm:text-lg">
              {translations.repository_index.title}
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-neutral-600">
              {translations.repository_index.description}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-800">
            {translations.repository_index.count.replace(
              '{count}',
              String(githubRepositories.length),
            )}
            <span
              aria-hidden="true"
              className="text-xl transition-transform group-open:rotate-180"
            >
              ⌄
            </span>
          </span>
        </summary>

        <div className="border-t border-neutral-100 p-4 sm:p-6">
          <label className="relative block">
            <span className="sr-only">{translations.repository_index.search_label}</span>
            <input
              type="search"
              value={repositoryQuery}
              onChange={(event) => setRepositoryQuery(event.target.value)}
              placeholder={translations.repository_index.search_placeholder}
              className="min-h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100"
            />
          </label>

          <div
            role="group"
            aria-label={translations.repository_index.filter_label}
            className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap"
          >
            {repositoryCategories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeRepositoryCategory === category}
                onClick={() => setActiveRepositoryCategory(category)}
                className={`min-h-9 shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:text-sm ${
                  activeRepositoryCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'border border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-800'
                }`}
              >
                {translations.repository_index.category_labels[category]}
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs font-medium text-neutral-500" role="status" aria-live="polite">
            {translations.repository_index.results_count
              .replace('{shown}', String(filteredRepositories.length))
              .replace('{total}', String(githubRepositories.length))}
          </p>

          {filteredRepositories.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredRepositories.map((repository) => (
                <li key={repository.name} className="min-w-0">
                  <a
                    href={repository.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${translations.repository_index.open_repository}: ${repository.name}`}
                    className="group block h-full rounded-2xl border border-neutral-200/80 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary-900">
                        {translations.repository_index.category_labels[repository.category]}
                      </span>
                      {repository.detailsPending && (
                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                          {translations.repository_index.details_pending}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 break-words text-sm font-semibold text-neutral-900">
                      {repository.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-600">
                      {repository.description[locale === 'id' ? 'id' : 'en']}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-neutral-100 pt-2.5 text-[11px] font-medium text-neutral-500">
                      <span>{repository.language ?? 'GitHub'}</span>
                      <span className="inline-flex items-center gap-1 text-primary-800">
                        {translations.repository_index.open_repository}
                        <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-neutral-200 px-5 py-8 text-center text-sm text-neutral-600">
              {translations.repository_index.empty_state}
            </p>
          )}
        </div>
      </details>

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
