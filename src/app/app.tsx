import React from 'react';
import {Overview} from "./components/overview";
import {Navbar} from "./components/navbar";
import {AboutMe} from "./components/about_me";
import {Timeline} from "./components/timeline";
import {Skill} from "./components/skills";
import {Portfolio} from "./components/portfolio";
import {Footer} from "./components/footer";

export function App(): React.ReactElement {
    return (
        <div id="alpinnz">
            <Navbar/>
            <Overview/>
            <AboutMe/>
            <Skill/>
            <Timeline/>
            <Portfolio/>
            <Footer/>
        </div>
    );
}






