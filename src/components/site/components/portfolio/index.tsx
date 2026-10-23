import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Dialog, Transition } from '@headlessui/react'
import { useLocalizedModule } from '../../locales/use-localized-module'

type PortfolioHeader = {
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
  const [currentGalleryIndex, setCurrentGalleryIndex] = React.useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false) // 🆕 state baru
  const portfolioItems: PortfolioItem[] = translations.items as PortfolioItem[]

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
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16 lg:px-10"
    >
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

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`min-h-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {filteredItems.map((item, index) => (
          <motion.button
            key={`${item.title}-${index}`}
            layout
            type="button"
            aria-label={translations.project_details_label.replace('{title}', item.title)}
            className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary-500"
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            onClick={() => openModal(item)}
          >
            <div className="relative aspect-video bg-neutral-50">
              <Image
                src={item.thumbnail}
                alt={`${item.title} project preview`}
                fill
                loading="lazy"
                className="object-contain"
              />
            </div>
            <div className="p-4 sm:p-5">
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
                    <div className="relative mb-4 flex min-h-48 max-h-[55dvh] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                      <Image
                        src={selectedItem.gallery[currentGalleryIndex]}
                        alt={selectedItem.title}
                        width={1200}
                        height={800}
                        unoptimized
                        loading="eager"
                        className="h-auto max-h-[55dvh] w-auto max-w-full cursor-zoom-in object-contain"
                        onClick={() => setIsImageModalOpen(true)}
                      />
                      <div
                        className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-zoom-in"
                        onClick={() => setIsImageModalOpen(true)}
                      >
                        <span className="text-white text-4xl">🔍</span>
                      </div>

                      {selectedItem.gallery.length > 1 && (
                        <>
                          <button
                            onClick={prevGallery}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
                          >
                            &#8592;
                          </button>
                          <button
                            onClick={nextGallery}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
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
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-neutral-0 rounded-lg hover:from-green-600 hover:to-green-700 transition"
                          >
                            {translations.live_label}
                          </a>
                        )}
                        {selectedItem.repoUrl && (
                          <a
                            href={selectedItem.repoUrl}
                            target="_blank"
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-neutral-0 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                          >
                            {translations.repository_label}
                          </a>
                        )}
                        {selectedItem.webUrl && (
                          <a
                            href={selectedItem.webUrl}
                            target="_blank"
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-neutral-0 rounded-lg hover:from-purple-600 hover:to-purple-700 transition"
                          >
                            {translations.website_label}
                          </a>
                        )}
                        {selectedItem.playStoreUrl && (
                          <a
                            href={selectedItem.playStoreUrl}
                            target="_blank"
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-neutral-0 rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
                          >
                            {translations.play_store_label}
                          </a>
                        )}
                        {selectedItem.appStoreUrl && (
                          <a
                            href={selectedItem.appStoreUrl}
                            target="_blank"
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

      {/* 🆕 Full Image Modal */}
      <Transition show={isImageModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[60]"
          open={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        >
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
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-primary-400 transition"
            >
              ✕
            </button>
          </div>
        </Dialog>
      </Transition>
    </section>
  )
}
