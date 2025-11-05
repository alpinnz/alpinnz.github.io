import * as React from "react";

export function Navbar(): React.ReactElement {
    const [isOpen, setIsOpen] = React.useState(false);
    const [, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWidth(newWidth);
            if (newWidth > 768 && isOpen) setIsOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    const genericHamburgerLine =
        "h-1 w-6 my-1 rounded-full bg-neutral-800 transition ease transform duration-300";

    return (
        <header className="px-8 md:px-20 lg:px-24 py-4 shadow-sm bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex flex-row justify-between items-center">
                <a
                    href="#hero"
                    className="font-semibold text-3xl text-neutral-800 hover:text-neutral-600 transition-colors"
                >
                    Alpinnz
                </a>

                {/* Hamburger menu button */}
                <div className="block lg:hidden">
                    <button
                        className="flex flex-col h-12 w-12 rounded justify-center items-center group"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen
                                    ? "rotate-45 translate-y-3 opacity-70 group-hover:opacity-100"
                                    : "opacity-70 group-hover:opacity-100"
                            }`}
                        />
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen ? "opacity-0" : "opacity-70 group-hover:opacity-100"
                            }`}
                        />
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen
                                    ? "-rotate-45 -translate-y-3 opacity-70 group-hover:opacity-100"
                                    : "opacity-70 group-hover:opacity-100"
                            }`}
                        />
                    </button>
                </div>

                {/* Navigation items */}
                <nav
                    className={`${
                        isOpen
                            ? "absolute top-16 right-8 bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-neutral-100"
                            : "hidden lg:flex lg:flex-row lg:gap-8"
                    }`}
                >
                    <NavButton href="#about-me" label="About Me" onClick={() => setIsOpen(false)} />
                    <NavButton href="#skills" label="Skills" onClick={() => setIsOpen(false)} />
                    <NavButton href="#timeline" label="Timeline" onClick={() => setIsOpen(false)} />
                    <NavButton href="#portfolio" label="Portofolio" onClick={() => setIsOpen(false)} />
                    <NavButton href="#contact" label="Contact" onClick={() => setIsOpen(false)} />
                </nav>
            </div>
        </header>
    );
}

type NavButtonProps = {
    label: string;
    href: string;
    onClick: () => void;
};

function NavButton({ label, href, onClick }: NavButtonProps) {
    return (
        <a
            href={href}
            onClick={onClick}
            className="text-neutral-700 hover:text-blue-600 font-medium transition-colors duration-200"
        >
            {label}
        </a>
    );
}
``
