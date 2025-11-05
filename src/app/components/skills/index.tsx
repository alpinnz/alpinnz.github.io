import React from "react";
import {motion} from "framer-motion";

import ic_android from "../../../assets/svg/ic_android.svg";
import ic_front_end from "../../../assets/svg/ic_front_end.svg";
import ic_back_end from "../../../assets/svg/ic_back_end.svg";
import {useTranslation} from "react-i18next";

type SkillHeader = {
    title: string;
    subtitle: string;
};

type SkillItem = {
    title: string;
    description: string;
    tools: string[];
    ic: string;
};

export function Skill(): React.ReactElement {
    const {t} = useTranslation('skills');
    const header: SkillHeader = t('header', {returnObjects: true}) as SkillHeader;
    const skills: SkillItem[] = t('skills', {returnObjects: true}) as SkillItem[];

    const icons: string[] = [ic_android, ic_front_end, ic_back_end];

    return (
        <section
            id="skills"
            className="px-8 md:px-20 lg:px-24 py-20 bg-neutral-0"
        >
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                viewport={{once: true}}
            >
                <h2 className="font-bold text-3xl md:text-4xl text-neutral-900 mb-3">
                    {header.title}
                </h2>
                <p className="text-neutral-600 font-light max-w-2xl mx-auto">
                    {header.subtitle}
                </p>
                <div className="mt-4 w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skills.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center p-8 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg bg-white transition-all duration-300 hover:border-primary-400"
                        initial={{opacity: 0, y: 40}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: index * 0.2}}
                        viewport={{once: true}}
                    >
                        <div className="p-3 bg-primary-50 rounded-full mb-5">
                            <img
                                src={icons[index]}
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
