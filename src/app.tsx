import React from 'react';
import Navbar from "./components/navbar";
import profile from './assets/png/profile.png';

export default function App(): React.ReactElement {
    return (
        <>
            <Navbar />
            <section id="personal" className='px-8 md:px-20 lg:px-24 py-4'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <div className='font-bold text-4xl'>Hi, I'm Alpin</div>
                        <div className='font-bold text-2xl'>I'm a Software Developer</div>
                    </div>
                    <img src={profile} alt='profile' className='w-52'/>
                </div>
            </section>
        </>
    );
}
