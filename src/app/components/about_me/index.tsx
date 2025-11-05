import * as React from "react";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";

type AboutMeItem = {
    title: string;
    descriptions: string[];
};

export function AboutMe(): React.ReactElement {
    const {t} = useTranslation('about_me');
    const aboutMeItem: AboutMeItem = {
        title: t('title'),
        descriptions: t('descriptions', {returnObjects: true}) as string[],
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
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    viewport={{once: true}}
                >
                    {aboutMeItem.title}
                </motion.h2>

                {/* Descriptions */}
                <motion.div
                    className="space-y-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    variants={{
                        hidden: {},
                        visible: {transition: {staggerChildren: 0.2}},
                    }}
                >
                    {aboutMeItem.descriptions.map((desc, index) => (
                        <motion.p
                            key={index}
                            className="font-light text-neutral-700 leading-relaxed text-left md:text-justify text-base md:text-lg"
                            variants={{
                                hidden: {opacity: 0, y: 20},
                                visible: {opacity: 1, y: 0},
                            }}
                            transition={{duration: 0.5}}
                        >
                            {desc}
                        </motion.p>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
