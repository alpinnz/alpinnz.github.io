import React from "react";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import ic_address from "../../../assets/svg/ic_address.svg";
import ic_email from "../../../assets/svg/ic_email.svg";
import ic_github from "../../../assets/svg/ic_github.svg";

const iconMap: Record<string, string> = {
    "ic_address": ic_address,
    "ic_email": ic_email,
    "ic_github": ic_github,
};

interface InputProps {
    name: string;
    placeholder: string;
}

interface TextAreaProps {
    name: string;
    placeholder: string;
}

interface ButtonProps {
    label: string;
}

function Input({name, placeholder}: InputProps) {
    return (
        <input
            className="h-11 w-full border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-0 text-neutral-800
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 transition-all duration-200"
            placeholder={placeholder}
            name={name}
        />
    );
}

function TextArea({name, placeholder}: TextAreaProps) {
    return (
        <textarea
            className="border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-0 text-neutral-800
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 transition-all duration-200"
            rows={4}
            placeholder={placeholder}
            name={name}
        />
    );
}

function Button({label}: ButtonProps) {
    return (
        <button
            className="bg-primary-500 text-neutral-0 font-medium py-2.5 px-8 rounded-full
                 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400
                 transition-all duration-200 shadow-md"
        >
            {label}
        </button>
    );
}

export function Footer(): React.ReactElement {
    const {t} = useTranslation("footer");

    const contactItems = t("contactItems", {returnObjects: true}) as Array<{
        title: string;
        icon: string;
        link?: string;
    }>;

    return (
        <section
            id="footer"
            className="mt-24 px-8 md:px-20 lg:px-28 py-16 bg-neutral-50 border-t border-neutral-200"
        >
            <motion.div
                className="flex flex-col lg:flex-row gap-10 lg:gap-16"
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                viewport={{once: true}}
            >
                {/* Contact Info */}
                <div className="flex flex-col lg:w-1/3 gap-5">
                    <h2 className="font-bold text-3xl text-neutral-900 text-center lg:text-left">
                        {t("header.title")}
                    </h2>
                    <p className="text-neutral-600 font-light text-center lg:text-left">
                        {t("header.subtitle")}
                    </p>
                    <div className="flex flex-col gap-4 mt-2">
                        {contactItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3"
                                initial={{opacity: 0, x: -30}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{delay: 0.1 * index}}
                                viewport={{once: true}}
                            >
                                <img
                                    src={iconMap[item.icon]}
                                    alt={item.title}
                                    className="w-5 h-5 opacity-80"
                                />
                                {item.link ? (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-neutral-700 hover:text-primary-600 transition-all font-light"
                                    >
                                        {item.title}
                                    </a>
                                ) : (
                                    <div className="text-neutral-700 font-light">{item.title}</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div id="contact"
                     className="flex flex-col lg:w-2/3 gap-4 bg-neutral-0 p-6 rounded-2xl shadow-sm border border-neutral-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input name="name" placeholder={t("form.name")}/>
                        <Input name="email" placeholder={t("form.email")}/>
                    </div>
                    <Input name="phone" placeholder={t("form.phone")}/>
                    <TextArea name="message" placeholder={t("form.message")}/>
                    <div className="mt-2">
                        <Button label={t("form.submit")}/>
                    </div>
                </div>
            </motion.div>

            {/* Copyright */}
            <div className="mt-16 text-center text-sm text-neutral-500 font-light">
                {t("copyright", {year: "2025"})}
            </div>
        </section>
    );
}
