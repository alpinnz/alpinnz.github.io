import React from "react";
import ic_android from "../../../assets/svg/ic_android.svg";
import ic_front_end from "../../../assets/svg/ic_front_end.svg";
import ic_back_end from "../../../assets/svg/ic_back_end.svg";

type ContactItem = {
    title: string,
    ic: string,
}

export function Footer(): React.ReactElement {
    const contactItems: ContactItem[] = [
        {
            ic: ic_android,
            title: 'Jalan Raya Losawi\nNo. 15, Malang',
        },
        {
            ic: ic_front_end,
            title: 'mail\nemailkuyoemail@gmail.com',
        },
        {
            ic: ic_back_end,
            title: 'github\nhttps://github.com/alpinnz',
        }
    ];

    return (
        <>
            <section id="footer" className='mt-16 px-8 md:px-20 lg:px-24 py-4 gap-4'>
                <div className='md:flex flex-row justify-between'>
                    <div className='p-8'>
                        {contactItems.map((item: ContactItem, index: number) => {
                                return (
                                    <div key={index} className='flex flex-row'>
                                        <img src={item.ic} alt={item.title} className='w-5'/>
                                        <div className='ml-2 font-light  text-2C2E43'>{item.title}</div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <div className='p-8 w-100'>
                        <input
                            className="h-10 w-100 rounded-md border-none justify-start items-center text-2C2E43 text-xl"
                            placeholder={'Name'}
                        />
                        <input
                            className="h-10 w-100 rounded-md border-none justify-start items-center text-2C2E43 text-xl"
                            placeholder={'Name'}
                        />

                        <input
                            className="h-10 w-100 rounded-md border-none justify-start items-center text-2C2E43 text-xl"
                            placeholder={'Name'}
                        />

                        <input
                            className="h-10 w-100 rounded-md border-none justify-start items-center text-2C2E43 text-xl"
                            placeholder={'Name'}
                        />

                        <input
                            className="h-10 w-100 rounded-md border-none justify-start items-center text-2C2E43 text-xl"
                            placeholder={'Name'}
                        />

                    </div>
                </div>
            </section>
        </>
    );
}