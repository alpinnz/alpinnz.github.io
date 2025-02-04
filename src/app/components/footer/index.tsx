import React from "react";
import ic_android from "../../../assets/svg/ic_android.svg";
import ic_front_end from "../../../assets/svg/ic_front_end.svg";
import ic_back_end from "../../../assets/svg/ic_back_end.svg";

type ContactItem = {
    title: string,
    ic: string,
}

interface InputProps {
    label: string;
    name: string;
    placeholder: string;
}


interface TextAreaProps {
    label: string;
    name: string;
    placeholder: string;
}

function Input(props: InputProps) {
    return <input
        className="h-10 w-full border rounded-lg px-3 py-2 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={props.placeholder}
    />
}


interface ButtonProps {
    label: string;
}

function Button(props: ButtonProps) {
    return (
        <button className="bg-gray-800 text-white font-medium py-2 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
            {props.label}
        </button>
    );
};


function TextArea(props: TextAreaProps) {
    return <textarea
        className=" border rounded-lg px-3 py-2 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"

        rows={3}
        placeholder={props.placeholder}
    />
}

export function Footer(): React.ReactElement {
    const contactItems: ContactItem[] = [
        {
            ic: ic_android,
            title: 'Jalan Raya Losawi No. 15, Malang',
        },
        {
            ic: ic_front_end,
            title: 'alpinnz@gmail.com',
        },
        {
            ic: ic_back_end,
            title: 'https://github.com/alpinnz',
        }
    ];

    return (
        <>
            <section id="footer" className='mt-16 px-8 lg:px-20 py-4 gap-4'>
                <div className='flex flex-col lg:flex-row gap-4 px-8'>
                    <div className='flex flex-col lg:w-1/3 gap-3'>
                        <div className='font-bold text-2xl text-neutral-700 text-center lg:text-start'>Contact Me</div>
                        <div></div>
                        {contactItems.map((item: ContactItem, index: number) => {
                                return (
                                    <div key={index} className='lg:flex gap-3 hidden'>
                                        <img src={item.ic} alt={item.title} className='w-5'/>
                                        <div className='font-light  text-neutral-800'>{item.title}</div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <div className='flex flex-col lg:w-2/3 gap-2'>
                        <Input placeholder={'Name'} label={""} name={"name"}/>
                        <div className={'flex gap-2'}>
                            <Input placeholder={'Email'} label={""} name={"email"}/>
                            <Input placeholder={'Phone'} label={""} name={"phone"}/>
                        </div>
                        <TextArea placeholder={'Enter your message'} label={""} name={"message"}/>
                        <Button label={"Send"}/>
                    </div>
                </div>
            </section>
        </>
    );
}