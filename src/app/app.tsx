import React from 'react';
import {Overview} from "./components/overview";
import {Navbar} from "./components/navbar";
import {Personal} from "./components/personal";
import {Timeline} from "./components/timeline";
import {Ability} from "./components/ability";
import {Portofolio} from "./components/protofolio";

export function App(): React.ReactElement {
    return (
        <>
            <Navbar/>
            <Overview/>
            <Personal/>
            <Ability/>
            <Timeline/>
            <Portofolio/>
            {/*<Footer/>*/}
        </>
    );
}






