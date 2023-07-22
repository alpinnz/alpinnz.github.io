import React from "react";
import ic_school from "../../assets/svg/ic_school.svg";
import ic_mobile from "../../assets/svg/ic_mobile.svg";
import ic_desktop from "../../assets/svg/ic_dekstop.svg";

type TimelineItem = {
    title: string,
    descriptions: string,
    date_start: Date,
    date_end: Date,
    icon: string,
}

export default function Timeline(): React.ReactElement {
    const timelineItem: TimelineItem[] = [
        {
            title: 'Mobile Developer Officer at \nPT. Ada Ide Langsung Jalan',
            descriptions: 'Developing POS And Laundry Management Apps, \nNew Features, UI Changing and Write reusable modular code',
            date_start: new Date(),
            date_end: new Date(),
            icon: ic_mobile,
        },
        {
            title: 'Fullstack Developer at \nCV. Gumcode',
            descriptions: 'Working in several projects, collaboration such as, using flutter and codeigniter',
            date_start: new Date(),
            date_end: new Date(),
            icon: ic_desktop,
        },
        {
            title: 'Back End Developer at \nStellarlab',
            descriptions: 'Work here in partime, using Node Js. New features to learn, tryout, discussion with the best Teacher and improve their skill for the higher degree\n',
            date_start: new Date(),
            date_end: new Date(),
            icon: ic_desktop,
        },
        {
            title: 'Mobile Developer at \nPT. Aku Peduli Indonesia',
            descriptions: 'Internship, also worked on several collaboration projects',
            date_start: new Date(),
            date_end: new Date(),
            icon: ic_mobile,
        },
        {
            title: 'Institut Teknologi \n& Bisnis ASIA',
            descriptions: 'Computer Science (GPA : 3,66)',
            date_start: new Date(),
            date_end: new Date(),
            icon: ic_school,
        }
    ];

    return (
        <>
            <section id="personal" className='mt-16 px-8 md:px-20 lg:px-24 py-4'>
                <div className="min-h-screen flex flex-col justify-center">
                    <div className="sm:max-w-xl sm:mx-auto w-full">

                        <div className="relative text-gray-700 antialiased text-sm font-semibold">

                            <div
                                className="hidden sm:block w-1 bg-2C2E43 absolute h-full left-1/2 transform -translate-x-1/2"></div>

                            {
                                timelineItem.map((item, index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <div className="mt-6 sm:mt-0 sm:mb-12">
                                                <div className="flex flex-col sm:flex-row items-center">
                                                    <div className="flex justify-start w-full mx-auto items-center">
                                                        <div className="w-full sm:w-1/2 sm:pr-8">
                                                            <div className="p-4 bg-5952601A rounded shadow">
                                                                <p
                                                                    className="font-light text-2C2E43 text-xs">{format(item.date_start)} - {format(item.date_end)}</p>
                                                                <div
                                                                    className="mt-2 font-bold text-2C2E43">{item.title}</div>
                                                                <p className="mt-1 font-light">{item.descriptions}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="rounded-full bg-2C2E43 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                                                        <img className='w-4 h-4' src={item.icon} alt={item.title}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="mt-6 sm:mt-0 sm:mb-12">
                                                <div className="flex flex-col sm:flex-row items-center">
                                                    <div className="flex justify-end w-full mx-auto items-center">
                                                        <div className="w-full sm:w-1/2 sm:pl-8">
                                                            <div className="p-4 bg-5952601A rounded shadow">
                                                                <p
                                                                    className="font-light text-2C2E43 text-xs">{format(item.date_start)} - {format(item.date_end)}</p>
                                                                <div
                                                                    className="mt-2 font-bold text-2C2E43">{item.title}</div>
                                                                <p className="mt-1 font-light">{item.descriptions}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="rounded-full bg-2C2E43 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                                                        <img className='w-4 h-4' src={item.icon} alt={item.title}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }

                            {/*<div className="mt-6 sm:mt-0 sm:mb-12">*/}
                            {/*    <div className="flex flex-col sm:flex-row items-center">*/}
                            {/*        <div className="flex justify-start w-full mx-auto items-center">*/}
                            {/*            <div className="w-full sm:w-1/2 sm:pr-8">*/}
                            {/*                <div className="p-4 bg-white rounded shadow">*/}
                            {/*                    Now this is a story all about how,*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div*/}
                            {/*            className="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">*/}
                            {/*            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white"*/}
                            {/*                 fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>*/}
                            {/*            </svg>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className="mt-6 sm:mt-0 sm:mb-12">*/}
                            {/*    <div className="flex flex-col sm:flex-row items-center">*/}
                            {/*        <div className="flex justify-end w-full mx-auto items-center">*/}
                            {/*            <div className="w-full sm:w-1/2 sm:pl-8">*/}
                            {/*                <div className="p-4 bg-white rounded shadow">*/}
                            {/*                    My life got flipped turned upside down,*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div*/}
                            {/*            className="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">*/}
                            {/*            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white"*/}
                            {/*                 fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>*/}
                            {/*            </svg>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className="mt-6 sm:mt-0 sm:mb-12">*/}
                            {/*    <div className="flex flex-col sm:flex-row items-center">*/}
                            {/*        <div className="flex justify-start w-full mx-auto items-center">*/}
                            {/*            <div className="w-full sm:w-1/2 sm:pr-8">*/}
                            {/*                <div className="p-4 bg-white rounded shadow">*/}
                            {/*                    And I'd like to take a minute, just sit right there,*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div*/}
                            {/*            className="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">*/}
                            {/*            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white"*/}
                            {/*                 fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>*/}
                            {/*            </svg>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className="mt-6 sm:mt-0">*/}
                            {/*    <div className="flex flex-col sm:flex-row items-center">*/}
                            {/*        <div className="flex justify-end w-full mx-auto items-center">*/}
                            {/*            <div className="w-full sm:w-1/2 sm:pl-8">*/}
                            {/*                <div className="p-4 bg-white rounded shadow">*/}
                            {/*                    I'll tell you how I became the Prince of a town called Bel Air.*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div*/}
                            {/*            className="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">*/}
                            {/*            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white"*/}
                            {/*                 fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>*/}
                            {/*            </svg>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

function format(date: Date) {
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', {month: 'short'});

    return `${year} ${month}`;
}
