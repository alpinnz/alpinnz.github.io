import * as React from "react";
import {motion} from "framer-motion";
import {Dialog, Transition} from "@headlessui/react";
import {useTranslation} from "react-i18next";

type PortfolioHeader = {
    title: string;
    subtitle: string;
};

type PortfolioItem = {
    title: string;
    descriptions: string;
    details: string;
    thumbnail: string;
    gallery: string[];
    category: "mobile" | "frontend" | "backend" | "design";
    techStack: string[];
    liveUrl?: string;
    repoUrl?: string;
    webUrl?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
};

export function Portfolio(): React.ReactElement {
    const {t} = useTranslation("portfolio");

    const header: PortfolioHeader = t("header", {returnObjects: true}) as PortfolioHeader;
    const categories = ["all", "mobile", "frontend", "backend", "design"];
    const [activeCategory, setActiveCategory] = React.useState(categories[0]);
    const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentGalleryIndex, setCurrentGalleryIndex] = React.useState(0);
    const [isImageModalOpen, setIsImageModalOpen] = React.useState(false); // 🆕 state baru
    const portfolioItems: PortfolioItem[] = t("items", {returnObjects: true}) as PortfolioItem[];

    const filteredItems =
        activeCategory === "all"
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === activeCategory);

    const openModal = (item: PortfolioItem) => {
        setSelectedItem(item);
        setCurrentGalleryIndex(0);
        setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);

    const nextGallery = () => {
        if (!selectedItem) return;
        setCurrentGalleryIndex((prev) => (prev + 1) % selectedItem.gallery.length);
    };
    const prevGallery = () => {
        if (!selectedItem) return;
        setCurrentGalleryIndex(
            (prev) => (prev - 1 + selectedItem.gallery.length) % selectedItem.gallery.length
        );
    };

    return (
        <section id="portfolio" className="mt-16 px-8 md:px-20 lg:px-24 py-20 bg-neutral-0">
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                viewport={{once: true}}
            >
                <h2 className="font-bold text-3xl md:text-4xl text-neutral-900 mb-3">{header.title}</h2>
                <p className="text-neutral-600 font-light max-w-2xl mx-auto">{header.subtitle}</p>
                <div className="mt-4 w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeCategory === cat
                                ? "bg-primary-600 text-neutral-0 shadow-sm"
                                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                    >
                        {t(`categories.${cat}`)}
                    </button>
                ))}
            </div>

            {/* Cards Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                    <motion.div
                        key={index}
                        layout
                        className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-neutral-100 hover:border-primary-400 transition-all duration-300 cursor-pointer"
                        initial={{opacity: 0, y: 40}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: index * 0.15}}
                        viewport={{once: true}}
                        onClick={() => openModal(item)}
                    >
                        <div
                            className="h-56 bg-neutral-50 bg-center bg-cover"
                            style={{backgroundImage: `url(${item.thumbnail})`}}
                        />
                        <div
                            className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-center text-neutral-0 px-6">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm font-light mt-1">{item.descriptions}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Detail Modal */}
            <Transition show={isOpen} as={React.Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50" open={isOpen} onClose={closeModal}>
                    <div className="fixed inset-0 bg-black/50" aria-hidden="true"/>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="max-w-4xl w-full bg-neutral-0 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] p-6">
                                {selectedItem && (
                                    <>
                                        {/* Gallery */}
                                        <div className="relative">
                                            <img
                                                src={selectedItem.gallery[currentGalleryIndex]}
                                                alt={selectedItem.title}
                                                className="w-full h-64 md:h-96 object-cover rounded-lg mb-4 cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
                                                onClick={() => setIsImageModalOpen(true)}
                                            />
                                            <div
                                                className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-zoom-in"
                                                onClick={() => setIsImageModalOpen(true)}>
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
                                        <Dialog.Title className="text-2xl font-bold text-neutral-900 mb-2">
                                            {selectedItem.title}
                                        </Dialog.Title>
                                        <Dialog.Description className="text-neutral-700 mb-4">
                                            {selectedItem.descriptions}
                                        </Dialog.Description>
                                        <p className="mb-4 text-neutral-600">{selectedItem.details}</p>

                                        {/* Tech Stack */}
                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">Tech Stack:</h4>
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
                                                        Live
                                                    </a>
                                                )}
                                                {selectedItem.repoUrl && (
                                                    <a
                                                        href={selectedItem.repoUrl}
                                                        target="_blank"
                                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-neutral-0 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                                                    >
                                                        Repository
                                                    </a>
                                                )}
                                                {selectedItem.webUrl && (
                                                    <a
                                                        href={selectedItem.webUrl}
                                                        target="_blank"
                                                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-neutral-0 rounded-lg hover:from-purple-600 hover:to-purple-700 transition"
                                                    >
                                                        Website
                                                    </a>
                                                )}
                                                {selectedItem.playStoreUrl && (
                                                    <a
                                                        href={selectedItem.playStoreUrl}
                                                        target="_blank"
                                                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-neutral-0 rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
                                                    >
                                                        Play Store
                                                    </a>
                                                )}
                                                {selectedItem.appStoreUrl && (
                                                    <a
                                                        href={selectedItem.appStoreUrl}
                                                        target="_blank"
                                                        className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-neutral-0 rounded-lg hover:from-gray-600 hover:to-gray-700 transition"
                                                    >
                                                        App Store
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
                        <img
                            src={selectedItem?.gallery[currentGalleryIndex]}
                            alt={selectedItem?.title}
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                        />
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
    );
}
