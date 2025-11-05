import React from "react";
import { motion } from "framer-motion";

type PersonalItem = {
    title: string;
    descriptions: string[];
};

export function Personal(): React.ReactElement {
    const personalItem: PersonalItem = {
        title: "A little bit about me",
        descriptions: [
            "Born and raised in Malang, Indonesia, I hold a Bachelor’s degree in Computer Science from Institut Teknologi dan Bisnis ASIA Malang. Growing up, I’ve always been fascinated by how technology can simplify people’s lives — which led me to pursue a career in software development.",
            "I mainly work with Dart and JavaScript, focusing on building scalable mobile applications and implementing clean design patterns such as MVP, MVVM, DDD, and Clean Architecture. Since 2021, I’ve been leading a mobile engineering team, ensuring product quality, mentoring engineers, and exploring new technologies. Outside of work, I enjoy coding side projects and playing basketball.",
        ],
    };

    return (
        <section
            id="about-me"
            className="mt-12 md:mt-16 px-6 sm:px-8 md:px-20 lg:px-24 py-12 md:py-20 bg-neutral-0"
        >
            <div className="max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
                {/* Title */}
                <motion.h2
                    className="font-bold text-3xl md:text-4xl text-neutral-900 mb-6 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {personalItem.title}
                </motion.h2>

                {/* Descriptions */}
                <motion.div
                    className="space-y-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.2 } },
                    }}
                >
                    {personalItem.descriptions.map((desc, index) => (
                        <motion.p
                            key={index}
                            className="font-light text-neutral-700 leading-relaxed text-left md:text-justify text-base md:text-lg"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            {desc}
                        </motion.p>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
