import React from "react";
import ic_school from "../../../assets/svg/ic_school.svg";
import ic_mobile from "../../../assets/svg/ic_mobile.svg";
import ic_desktop from "../../../assets/svg/ic_dekstop.svg";

type TimelineItem = {
    title: string,
    descriptions: string,
    date_start: Date,
    date_end: Date,
    icon: string,
    currently?: boolean,
    link?: string,
}

export function Timeline(): React.ReactElement {
    const timelineItem: TimelineItem[] = [
        {
            title: 'Mobile Engineer Lead at PT. Ada Ide Langsung Jalan',
            descriptions: 'Lead a Mobile Engineer team focused on Product Owner and Cashier, User Management at Smartllink. Breaking down tasks, managing team resources, communicating well with CO, providing solutions for the team, doing one on one and other good things for the team, Work across module, create some technical base, and do code review for team..',
            date_start: new Date(2022, 0),
            date_end: new Date(),
            icon: ic_mobile,
            currently: true,
            link: "https://smartlink.id"
        },
        {
            title: 'Mobile Engineer at PT. Ada Ide Langsung Jalan',
            descriptions: 'Helping Smartlink to build awesome features for Cashier, We use DDD, Clean Architecture, Write reusable modular code and other.',
            date_start: new Date(2021, 5),
            date_end: new Date(2021, 12),
            icon: ic_mobile,
            link: "https://smartlink.id"
        },
        {
            title: 'Back End Engineer at Stellarlab',
            descriptions: 'Work here in partime, using Node Js. New features to learn, tryout, discussion with the best Teacher and improve their skill for the higher degree\n',
            date_start: new Date(2021, 9),
            date_end: new Date(2022, 9,),
            icon: ic_desktop,
            link: "https://www.linkedin.com/company/stellarlabid/posts/?feedView=all"
        },
        {
            title: 'Full Stack Engineer at CV. Gumcode',
            descriptions: 'Working in several projects, collaboration such as, using flutter and codeigniter',
            date_start: new Date(2021, 2),
            date_end: new Date(2020, 4),
            icon: ic_desktop,
        },
        {
            title: 'Android Engineer at PT. Aku Peduli Indonesia',
            descriptions: 'Internship, Focus on learning to develop android applications using kotlin and flutter, I contributed to the IzzyResto App project, IzzyIventory App, and Rema App.',
            date_start: new Date(2020, 1),
            date_end: new Date(2020, 7),
            icon: ic_mobile,
        },
        {
            title: 'Institut Teknologi & Bisnis ASIA',
            descriptions: 'Computer Science (GPA : 3,66)',
            date_start: new Date(2017, 7),
            date_end: new Date(2020, 1),
            icon: ic_school,
            link: "https://asia.ac.id"
        },
        {
            title: 'System Administrator at Star Nt Game Center',
            descriptions: 'Managing ERP application to handle product, financial and employee scheduling. Makes ure every game is up to date and have no issue.',
            date_start: new Date(2017, 7),
            date_end: new Date(2020, 1),
            icon: ic_desktop,
        }
    ];

    return (
        <>
            <section id="timeline" className='mt-16 px-8 md:px-20 py-4 lg:px-24 '>
                <div className='flex flex-row justify-center'>
                    <div className='font-bold text-2xl text-neutral-700'>Timeline</div>
                </div>
                <div className='m-1 sm:m-2 md:m-3'/>
                <div className="min-h-min flex flex-col justify-center">
                    {/*<div className="sm:max-w-xl sm:mx-auto w-full">*/}
                    <div className="w-full">
                        <div className="relative text-neutral-700 antialiased text-sm font-semibold">
                            {
                                timelineItem.map((item, index): React.ReactElement => (
                                        <Card data={item} key={index} index={index} is_last={(timelineItem.length - 1) == index}/>
                                    )
                                )
                            }
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

type CardProps = {
    data: TimelineItem,
    index: number,
    is_last: boolean,
}


function Card(props: CardProps): React.ReactElement {
    const [width, setWidth] = React.useState(window.innerWidth)
    const [heightElement, setHeight] = React.useState(0)
    const ref: React.RefObject<any> = React.createRef()

    React.useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, [ref, width])
    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const Line = () => {
        if (props.is_last) return (<></>);
        const css: string = 'hidden sm:block w-1 bg-neutral-300 absolute left-1/2 transform -translate-x-1/2';
        return (<div style={{height: heightElement + 48}} className={css}/>);
    }


    if (props.index % 2 === 0) {
        return (
            <div ref={ref} className="mt-6 sm:mt-0 sm:mb-12">
                <div className="hidden sm:block absolute bg-neutral-300 w-1/2 h-1">
                    <div className="flex justify-end me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 sm:w-14" viewBox="0 0 105 41"
                             fill="none">
                            <path d="M104.5 0H0V5H21.5L104.5 40.5V0Z" fill="#neutral-800"/>
                        </svg>
                    </div>
                </div>
                <Line/>
                <div className="flex flex-col sm:flex-row items-start">
                    <div className="flex justify-start w-full mx-auto items-center">
                        <div className="w-full sm:w-1/2 sm:pr-12">
                            <div className="p-4 bg-neutral-300 rounded shadow">
                                <p
                                    className="font-light text-neutral-800 text-xs">{format(props.data.date_start)} - {props.data.currently ? 'Now' : format(props.data.date_end)}</p>
                                <div
                                    className="mt-2 font-bold text-neutral-800">{props.data.title}</div>
                                <p className="mt-1 font-light">{props.data.descriptions}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="rounded-full bg-neutral-300 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                        <img className='w-4 h-4' src={props.data.icon} alt={props.data.title}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div ref={ref} className="mt-6 sm:mt-0 sm:mb-12">
                <div className="hidden sm:block absolute right-0 bg-neutral-300 w-1/2 h-1">
                    <div className="flex justify-start ms-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 sm:w-14" viewBox="0 0 105 41"
                             fill="none">
                            <path d="M0.5 0H105V5H83.5L0.5 40.5V0Z" fill="#neutral-800"/>
                        </svg>
                    </div>
                </div>
                <Line/>
                <div className="flex flex-col sm:flex-row items-start">
                    <div className="flex justify-end w-full mx-auto items-center">
                        <div className="w-full sm:w-1/2 sm:pl-12">
                            <div className="p-4 bg-neutral-300 rounded shadow">
                                <p
                                    className="font-light text-neutral-800 text-xs">{format(props.data.date_start)} - {format(props.data.date_end)}</p>
                                <div
                                    className="mt-2 font-bold text-neutral-800">{props.data.title}</div>
                                <p className="mt-1 font-light">{props.data.descriptions}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="rounded-full bg-neutral-300 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                        <img className='w-4 h-4' src={props.data.icon} alt={props.data.title}/>
                    </div>
                </div>
            </div>
        )
    }
}


function format(date: Date) {
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', {month: 'short'});

    return `${year} ${month}`;
}
