import * as React from "react";
import { motion } from "framer-motion";

type PortfolioItem = {
    title: string;
    descriptions: string;
    thumbnail?: string;
    category: "Mobile" | "Web" | "Backend" | "Design";
};

export function Portfolio(): React.ReactElement {
    const categories = ["All", "Mobile", "Web", "Backend", "Design"];
    const [activeCategory, setActiveCategory] = React.useState("All");

    const portfolioItems: PortfolioItem[] = [
        {
            title: "Smartlink App",
            descriptions: "POS & Management System — Flutter, Node.js, MySQL",
            thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
            category: "Mobile",
        },
        {
            title: "Company Dashboard",
            descriptions: "Web dashboard built using React + Tailwind",
            thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
            category: "Web",
        },
        {
            title: "E-commerce App",
            descriptions: "Mobile commerce app with real-time synchronization — built with Flutter",
            thumbnail: "https://images.unsplash.com/photo-1607082349566-187342175e2b",
            category: "Mobile",
        },
        {
            title: "Portfolio Website",
            descriptions: "Next.js + Vite + Tailwind — personal website",
            thumbnail: "https://images.unsplash.com/photo-1605902711622-cfb43c4437e0",
            category: "Web",
        },
        {
            title: "Admin Panel",
            descriptions: "Modern UI for CMS — React + TypeScript",
            thumbnail: "https://images.unsplash.com/photo-1631868684056-184d06691a63",
            category: "Web",
        },
        {
            title: "API Services",
            descriptions: "Golang + Gin + PostgreSQL RESTful APIs",
            thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
            category: "Backend",
        },
    ];

    const filteredItems =
        activeCategory === "All"
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === activeCategory);

    return (
        <section
            id="portfolio"
            className="mt-16 px-8 md:px-20 lg:px-24 py-20 bg-neutral-0"
        >
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="font-bold text-3xl md:text-4xl text-neutral-900 mb-3">
                    Some Things I’ve Built
                </h2>
                <p className="text-neutral-600 font-light max-w-2xl mx-auto">
                    A showcase of selected projects that highlight my engineering and design capabilities.
                </p>
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
                                ? "bg-primary-600 text-white shadow-sm"
                                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Cards Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredItems.map((item, index) => (
                    <motion.div
                        key={index}
                        layout
                        className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-neutral-100 hover:border-primary-400 transition-all duration-300"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        viewport={{ once: true }}
                    >
                        <div
                            className="h-56 bg-neutral-200 bg-center bg-cover"
                            style={{
                                backgroundImage: `url(${item.thumbnail})`,
                            }}
                        />
                        <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-center text-neutral-0 px-6">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm font-light mt-1">
                                    {item.descriptions}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
