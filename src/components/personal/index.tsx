import React from "react";

type PersonalItem = {
    title: string,
    descriptions: string[],
}

export default function Personal(): React.ReactElement {
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