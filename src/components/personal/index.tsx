import React from "react";

type PersonalItem = {
    title: string,
    descriptions: string[],
}

export default function Personal(): React.ReactElement {
    const personalItem: PersonalItem = {
        title: 'Hello, my name is Alfin Noviaji.',
        descriptions: [
            'I am born in Malang, \'96. I live on Jalan Raya Losawi No. 15, Malang. My nationality is Indonesian, and my religion is Islam. This time, I have graduated from the Institut Teknologi dan Bisnis ASIA Malang majoring in Computer Science. My hobbies are Coding and Basketball.',
            'I code using dart and javascript language, for design architecture i could use both MVP, MVVM, DDD, and Clean Architecture, Because of restructuring, since June \'21 i work as Android Enginner Lead (Flutter) at my current company , I always keep abreast of developing technologies.'
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