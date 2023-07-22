import React from "react";
import profile from "../../assets/png/profile.png";

type OverviewItem = {
    title: string,
    subtitle: string,
    descriptions: string[],
}

export default function Overview(): React.ReactElement {
    const overviewItem: OverviewItem = {
        title: 'Hello, I`am Alfin',
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