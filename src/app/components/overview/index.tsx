import * as React from "react";
import { motion } from "framer-motion";
import profile from "../../../assets/png/profile.png";

type OverviewItem = {
    title: string;
    descriptions: string[];
    cta?: string;
};

export function Overview(): React.ReactElement {
    const overviewItem: OverviewItem = {
        title: "Hello, I’m Alfin — a Software Engineer",
        descriptions: [
            "I’m passionate about technology, specializing in full-stack web and mobile development..",
            "Currently, I work as a Lead Mobile Engineer at PT. Ada Ide Langsung Jalan.",
        ],
        cta: "Say Hello",
    };

    return (
        <section
            id="overview"
            className="px-8 md:px-20 lg:px-24 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10"
        >
            {/* Left: Text content */}
            <motion.div
                className="flex-1 text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h1 className="font-bold text-3xl md:text-4xl text-neutral-900 leading-snug">
                    {overviewItem.title}
                </h1>

                <div className="mt-4 space-y-3">
                    {overviewItem.descriptions.map((item, index) => (
                        <p
                            key={index}
                            className="text-neutral-700 font-light leading-relaxed max-w-xl"
                        >
                            {item}
                        </p>
                    ))}
                </div>

                {overviewItem.cta && (
                    <button
                        onClick={() =>
                            window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: "smooth",
                            })
                        }
                        className="mt-8 px-6 py-2.5 rounded-full border border-primary-500 text-primary-600 font-medium hover:bg-primary-500 hover:text-white transition-all duration-200"
                    >
                        {overviewItem.cta}
                    </button>
                )}
            </motion.div>

            {/* Right: Profile image */}
            <motion.div
                className="flex-1 flex justify-center md:justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <img
                    src={profile}
                    alt="Alfin Noviaji"
                    className="rounded-2xl shadow-lg w-64 md:w-80 lg:w-96 object-cover"
                />
            </motion.div>
        </section>
    );
}
