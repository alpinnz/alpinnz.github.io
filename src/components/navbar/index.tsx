import React, {useEffect, useState} from 'react';

export default function Navbar(): React.ReactElement {

    const [isOpen, setIsOpen] = useState(false);

    const {width} = useWindowSize();


    useEffect(() => {
        if (width > 768) {
            setIsOpen(false);
        }
    }, [width]);

    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

    return (
        <header className='px-8 md:px-20 lg:px-24 py-4'>
            <div className="flex flex-row justify-between items-center">
                <div className='font-semibold text-3xl hover:text-gray-500'>
                    Alpinnz
                </div>
                <div className='block lg:hidden'>
                    <button
                        className="flex flex-col h-12 w-12 border-black rounded justify-center items-center group"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen
                                    ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                            }`}
                        />
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                            }`}
                        />
                        <div
                            className={`${genericHamburgerLine} ${
                                isOpen
                                    ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                            }`}
                        />
                    </button>
                </div>
                <div
                    className={`block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"} ${isOpen ? "absolute -right-0 mx-8 md:mx-20 lg:mx-24 mt-20" : ""}`}>
                    <div className="text-sm lg:flex-grow text-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className="block mt-4 lg:inline-block lg:mt-0 font-semibold hover:text-gray-500 mr-4">
                            About Me
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className="block mt-4 lg:inline-block lg:mt-0 font-semibold hover:text-gray-500 mr-4">
                            Portofolio
                        </button>
                    </div>
                </div>

            </div>
        </header>
    );
}


const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    React.useEffect(() => {
        const handleResize = () =>
            setWindowSize({width: window.innerWidth, height: window.innerHeight});

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};