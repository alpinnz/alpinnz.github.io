import React from 'react';
import {Overview} from "./components/overview";
import {Navbar} from "./components/navbar";
import {Personal} from "./components/about_me";
import {Timeline} from "./components/timeline";
import {Ability} from "./components/skills";
import {Portfolio} from "./components/portfolio";
import {Footer} from "./components/footer";

export function App(): React.ReactElement {
    return (
        <>
            <Navbar/>
            <Overview/>
            <Personal/>
            <Ability/>
            <Timeline/>
            <Portfolio/>
            <Footer/>
        </>
    );
}






