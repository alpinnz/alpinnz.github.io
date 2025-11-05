import React from "react";
import { motion } from "framer-motion";

import ic_android from "../../../assets/svg/ic_android.svg";
import ic_front_end from "../../../assets/svg/ic_front_end.svg";
import ic_back_end from "../../../assets/svg/ic_back_end.svg";

type AbilityItem = {
    title: string;
    description: string;
    tools: string[];
    ic: string;
};

export function Ability(): React.ReactElement {
    const abilityItems: AbilityItem[] = [
        {
            ic: ic_android,
            title: "Mobile Development",
            description:
                "Experienced in building Android applications using Flutter and React Native, focusing on clean architecture and maintainable code.",
            tools: [
                "Flutter",
                "Dart",
                "React Native",
                "JavaScript",
                "TypeScript",
                "Android Studio",
                "Java",
                "Kotlin",
                "MVVM",
                "MVP",
                "Clean Architecture",
                "DDD",
            ],
        },
        {
            ic: ic_front_end,
            title: "Front-End Development",
            description:
                "Skilled in crafting responsive and dynamic interfaces using React.js and Next.js, emphasizing accessibility and user experience.",
            tools: [
                "React.js",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Bootstrap",
                "Node.js",
                "Express.js",
            ],
        },
        {
            ic: ic_back_end,
            title: "Back-End Development",
            description:
                "Capable of developing robust RESTful APIs using Node.js and Golang with frameworks like Express.js and Gin.",
            tools: [
                "Golang",
                "Node.js",
                "Express.js",
                "Gin",
                "GORM",
                "Sequelize",
                "MySQL",
                "MongoDB",
                "Mongoose",
            ],
        },
    ];

    return (
        <section
            id="skills"
            className="px-8 md:px-20 lg:px-24 py-20 bg-neutral-0"
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
                    My Core Skills
                </h2>
                <p className="text-neutral-600 font-light max-w-2xl mx-auto">
                    A blend of mobile, front-end, and back-end expertise to deliver fullstack solutions.
                </p>
                <div className="mt-4 w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {abilityItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center p-8 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg bg-white transition-all duration-300 hover:border-primary-400"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="p-3 bg-primary-50 rounded-full mb-5">
                            <img
                                src={item.ic}
                                alt={item.title}
                                className="w-12 h-12 object-contain"
                            />
                        </div>

                        <h3 className="font-semibold text-xl text-neutral-900 mb-3">
                            {item.title}
                        </h3>

                        <p className="text-neutral-700 font-light leading-relaxed mb-5">
                            {item.description}
                        </p>

                        <div className="text-sm">
                            <p className="text-primary-600 font-semibold mb-1">
                                Tools & Frameworks:
                            </p>
                            <p className="text-neutral-700 font-light leading-snug">
                                {item.tools.join(", ")}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
