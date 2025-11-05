import React from "react";
import { motion } from "framer-motion";
import ic_school from "../../../assets/svg/ic_school.svg";
import ic_mobile from "../../../assets/svg/ic_mobile.svg";
import ic_desktop from "../../../assets/svg/ic_dekstop.svg";

type TimelineItem = {
    title: string;
    descriptions: string;
    date_start: Date;
    date_end: Date;
    icon: string;
    currently?: boolean;
    link?: string;
};

export function Timeline(): React.ReactElement {
    const timelineItem: TimelineItem[] = [
        {
            title: "Lead Mobile Engineer at PT. Ada Ide Langsung Jalan",
            descriptions:
                "Leading a mobile engineering team focused on Smartlink products, managing resources, conducting code reviews, and ensuring smooth cross-module collaboration.",
            date_start: new Date(2022, 0),
            date_end: new Date(),
            icon: ic_mobile,
            currently: true,
            link: "https://smartlink.id",
        },
        {
            title: "Mobile Engineer at PT. Ada Ide Langsung Jalan",
            descriptions:
                "Developed core features for the Smartlink cashier app using Flutter, following DDD and Clean Architecture principles.",
            date_start: new Date(2021, 5),
            date_end: new Date(2021, 12),
            icon: ic_mobile,
            link: "https://smartlink.id",
        },
        {
            title: "Back End Engineer at Stellarlab",
            descriptions:
                "Worked part-time with Node.js and MongoDB. Collaborated closely with mentors to improve scalable backend systems.",
            date_start: new Date(2021, 9),
            date_end: new Date(2022, 9),
            icon: ic_desktop,
            link: "https://www.linkedin.com/company/stellarlabid/posts/?feedView=all",
        },
        {
            title: "Full Stack Engineer at CV. Gumcode",
            descriptions:
                "Developed several small-scale projects using Flutter and CodeIgniter, focusing on efficient delivery and reusability.",
            date_start: new Date(2021, 2),
            date_end: new Date(2021, 4),
            icon: ic_desktop,
        },
        {
            title: "Android Engineer Intern at PT. Aku Peduli Indonesia",
            descriptions:
                "Developed Android apps using Kotlin and Flutter, including IzzyResto, IzzyInventory, and Rema.",
            date_start: new Date(2020, 1),
            date_end: new Date(2020, 7),
            icon: ic_mobile,
        },
        {
            title: "Institut Teknologi & Bisnis ASIA",
            descriptions: "Bachelor in Computer Science (GPA 3.66)",
            date_start: new Date(2017, 7),
            date_end: new Date(2020, 1),
            icon: ic_school,
            link: "https://asia.ac.id",
        },
    ];

    return (
        <section id="timeline" className="mt-24 px-8 md:px-20 lg:px-28 py-16">
            {/* Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="font-bold text-3xl md:text-4xl text-neutral-900 mb-3">
                    Journey Timeline
                </h2>
                <p className="text-neutral-600 font-light max-w-2xl mx-auto">
                    My professional and academic milestones along the way.
                </p>
                <div className="mt-4 w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Timeline Container */}
            <div className="relative text-neutral-700 antialiased text-sm font-semibold">
                {/* Center line (z-index rendah, di belakang) */}
                <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-500 transform -translate-x-1/2 z-0"></div>

                {/* Timeline cards */}
                {timelineItem.map((item, index) => (
                    <TimelineCard
                        key={index}
                        data={item}
                        index={index}
                        is_last={index === timelineItem.length - 1}
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

function TimelineCard({ data, index }: CardProps): React.ReactElement {
    const isLeft = index % 2 === 0;

    const cardBase = (
        <motion.div
            className="relative z-10 p-6 bg-neutral-0 rounded-xl shadow-md border border-neutral-100 hover:shadow-lg transition-all w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
        >
            <p className="text-xs text-neutral-500">
                {format(data.date_start)} – {data.currently ? "Now" : format(data.date_end)}
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
        <div className="z-20 rounded-full bg-primary-500 w-10 h-10 absolute left-1/2 transform -translate-x-1/2 -translate-y-2 sm:translate-y-0 flex items-center justify-center shadow-md">
            <img src={data.icon} alt={data.title} className="w-5 h-5 invert brightness-200" />
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

function format(date: Date) {
    const year = date.getFullYear();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return `${month} ${year}`;
}
