import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from "../header/Header";
import Routes from "../Routing/Routes";

function Main() {
    return (
        <div className="main">
                <Header/>
                <Routes/>
        </div>
    );
}

export default Main;
