import React from "react";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import ic_school from "../../../assets/svg/ic_school.svg";
import ic_mobile from "../../../assets/svg/ic_mobile.svg";
import ic_desktop from "../../../assets/svg/ic_dekstop.svg";

type TimelineIHeader = {
    title: string;
    subtitle: string;
};

type TimelineItem = {
    title: string;
    descriptions: string;
    date_start: string;
    date_end: string;
    icon: string;
    currently?: boolean;
    link?: string;
};


const iconMap: Record<string, string> = {
    "ic_school": ic_school,
    "ic_mobile": ic_mobile,
    "ic_desktop": ic_desktop,
};


export function Timeline(): React.ReactElement {
    const {t} = useTranslation('timeline');
    const header: TimelineIHeader = t('header', {returnObjects: true}) as TimelineIHeader;
    const items: TimelineItem[] = t('items', {returnObjects: true}) as TimelineItem[];

    return (
        <section id="timeline" className="mt-24 px-8 md:px-20 lg:px-28 py-16">
            {/* Header */}
            <motion.div
                className="text-center mb-16"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
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

            {/* Timeline Container */}
            <div className="relative text-neutral-700 antialiased text-sm font-semibold">
                {/* Center line (z-index rendah, di belakang) */}
                <div
                    className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-500 transform -translate-x-1/2 z-0"></div>

                {/* Timeline cards */}
                {items.map((item, index) => (
                    <TimelineCard
                        key={index}
                        data={item}
                        index={index}
                        is_last={index === items.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}

type CardProps = {
    data: TimelineItem;
    index: number;
    is_last: boolean;
};

function TimelineCard({data, index}: CardProps): React.ReactElement {
    const {i18n, t} = useTranslation('timeline');
    const isLeft = index % 2 === 0;

    const cardBase = (
        <motion.div
            className="relative z-10 p-6 bg-neutral-0 rounded-xl shadow-md border border-neutral-100 hover:shadow-lg transition-all w-full"
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            viewport={{once: true}}
        >
            <p className="text-xs text-neutral-500">
                {format(data.date_start, i18n.language)} – {data.currently ? t("now") : format(data.date_end, i18n.language)}
            </p>
            <h3 className="text-lg font-semibold text-neutral-900 mt-1">{data.title}</h3>
            <p className="text-neutral-700 font-light mt-2 leading-relaxed">
                {data.descriptions}
            </p>
            {data.link && (
                <a
                    href={data.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                    View Project →
                </a>
            )}
        </motion.div>
    );




    const iconBase = (
        <div
            className="z-20 rounded-full bg-primary-500 w-10 h-10 absolute left-1/2 transform -translate-x-1/2 -translate-y-2 sm:translate-y-0 flex items-center justify-center shadow-md">
            <img src={iconMap[data.icon]} alt={data.title} className="w-5 h-5 invert brightness-200"/>
        </div>
    );

    return (
        <div className="mb-12 flex flex-col sm:flex-row items-start relative">
            {/* MOBILE (full width) */}
            <div className="flex sm:hidden w-full">{cardBase}</div>

            {/* DESKTOP zig-zag */}
            {isLeft ? (
                <>
                    <div className="hidden sm:flex justify-end w-1/2 pr-12">{cardBase}</div>
                    {iconBase}
                    <div className="hidden sm:flex w-1/2"></div>
                </>
            ) : (
                <>
                    <div className="hidden sm:flex w-1/2"></div>
                    {iconBase}
                    <div className="hidden sm:flex justify-start w-1/2 pl-12">{cardBase}</div>
                </>
            )}
        </div>
    );
}

function format(dateStr: string | null, locale: string = "en-US") {

    if (!dateStr) return "now";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.toLocaleDateString(locale, {month: "short"});
    return `${month} ${year}`;
}
