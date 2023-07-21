import React from 'react';
import Navbar from "./components/navbar";
import profile from './assets/png/profile.png';
import ic_android from './assets/svg/ic_android.svg';
import ic_back_end from './assets/svg/ic_back_end.svg';
import ic_front_end from './assets/svg/ic_front_end.svg';

export default function App(): React.ReactElement {
    return (
        <>
            <Navbar/>
            <Overview/>
            <Personal/>
            <Ability/>
        </>
    );
}

type OverviewItem = {
    title: string,
    subtitle: string,
    descriptions: string[],
}

function Overview(): React.ReactElement {
    const overviewItem: OverviewItem = {
        title: 'Hello, my name is Alfin Noviaji.',
        subtitle: 'Software Developer',
        descriptions: [
            'I am interested in technology and expertise in fullstack web and mobile development. work as Mobile Developer Officer at my current company at PT. Ada Ide Langsung Jalan',
        ],
    };
    return (
        <>
            <section id="personal" className='px-8 md:px-20 lg:px-24 py-4 gap-4'>
                <div className='md:flex flex-row justify-between'>
                    <div>
                        <div className='mt-2 font-bold text-4xl text-595260'>{overviewItem.title}</div>
                        <div className='mt-2 font-bold text-2xl text-595260'>{overviewItem.subtitle}</div>
                        {overviewItem.descriptions.map((item, index) => (
                                <div key={index} className='mt-1 font-light  text-2C2E43'>{item}</div>
                            )
                        )}
                        <button className="mt-4 mb-8 font-semibold px-5 py-2 border-1 rounded-full text-2C2E43">
                            Say Hello
                        </button>
                    </div>
                    <img src={profile} alt='profile' className='w-full max-w-sm md:w-1/2 rounded-xl m-auto md:m-0 '/>

                </div>
            </section>
        </>
    );
}

type PersonalItem = {
    title: string,
    descriptions: string[],
}

function Personal(): React.ReactElement {
    const personalItem: PersonalItem = {
        title: 'Hello, my name is Alfin Noviaji.',
        descriptions: [
            'I am 25 years old. Born in Malang, 21 November 1996. I live on Jalan Raya Losawi No. 15, Malang. My nationality is Indonesian, and my religion is Islam. This time, I have graduated from the Institut Teknologi dan Bisnis ASIA Malang majoring in Computer Science. My hobbies are Coding and Basketball.',
            'I am interested in technology so I have expertise in fullstack web and mobile development, the language most proficient on the javascript and dart platforms. I often use node.js and flutter in developing mobile applications, I always keep abreast of developing technologies.'
        ],
    };
    return (
        <>
            <section id="personal" className='mt-16 px-8 md:px-20 lg:px-24 py-4 gap-4'>
                <div className='text-center'>
                    <div className='mt-2 font-semibold text-4xl text-595260'>{personalItem.title}</div>
                    {personalItem.descriptions.map((item, index) => (
                            <div key={index} className='mt-4 font-light text-2C2E43'>{item}</div>
                        )
                    )}
                </div>
            </section>
        </>
    );
}

type AbilityItem = {
    title: string,
    description: string,
    tools: string[],
    ic: string,
}

function Ability(): React.ReactElement {
    const abilityItems: AbilityItem[] = [
        {
            ic: ic_android,
            title: 'Android Skill',
            description: 'While developing android application. i\'m able to use some library Flutter, and React Native\n',
            tools: ['Flutter', 'Dart', 'React Native', 'Javascript', 'Typescript', 'Android Studio', 'Java', 'Kotlin']
        },
        {
            ic: ic_front_end,
            title: 'Front-end Skill',
            description: 'I could make a good work using React.js using Javascript and Typescript\n',
            tools: ['React.js', 'Node.js', 'Express.js', 'Next.js', 'Tailwindcss', 'Bootstrap']
        },
        {
            ic: ic_back_end,
            title: 'Back-end Skill',
            description: 'At developing android system Rest API, i\'m able to use some library Node.js, Express.js\n',
            tools: ['Node.js', 'Express.js', 'MySQL', 'MongoDB']
        }
    ];

    return (
        <>
            <section id="ability" className='mt-16 px-8 md:px-20 lg:px-24 py-4 gap-4'>
                <div className='md:flex flex-row justify-between'>
                    {abilityItems.map((item, index) => {
                            const tools: string = item.tools.join(', ');

                            return (
                                <div key={index} className='w-full md:w-1/3 p-5'>
                                    <div className='flex flex-row justify-center'>
                                        <img src={item.ic} alt={item.title} className='w-1/4'/>
                                    </div>
                                    <div className='mt-2 font-bold text-xl text-595260 text-center'>{item.title}</div>
                                    <div
                                        className='mt-2 font-light  text-2C2E43 text-center'>{item.description}</div>
                                    <div className='mt-2 font-bold text-595260 text-center'>Dev Tools</div>
                                    <div className='mt-2 font-light  text-2C2E43 flex text-center'>{tools}</div>
                                </div>
                            )
                        }
                    )}
                </div>
            </section>
        </>
    );
}
