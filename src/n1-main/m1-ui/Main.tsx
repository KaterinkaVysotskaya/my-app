import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from "./header/Header";
import Routes from "./routes/Routes";

function Main() {
    return (
        <div className="main">
            <HashRouter>

                <Header/>

                <Routes/>

            </HashRouter>
        </div>
    );
}

export default Main;
