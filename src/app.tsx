import React from 'react';
import Navbar from "./components/navbar";
import Overview from "./components/overview";
import Personal from "./components/personal";
import Ability from "./components/ability";
import Timeline from "./components/timeline";
import Portofolio from "./components/protofolio";

export default function App(): React.ReactElement {
    return (
        <>
            <Navbar/>
            <Overview/>
            <Personal/>
            <Ability/>
            <Timeline/>
            <Portofolio />
        </>
    );
}






