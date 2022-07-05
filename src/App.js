import './App.css';
import {BrowserRouter, Link, Redirect, Route, Outlet, StaticRouter} from "react-router-dom";

import radioActiveIcon from './assets/images/radioactiveBasic.png'
import Home from "./routes/home";
import Office from "./routes/office";
import ControlRoom from "./routes/controlroom";
import ResetProgress from "./routes/resetprogress";
import Reception from "./routes/reception";
import uuid from 'react-uuid'

export const toggleActive = (element) => {
    element.classList.toggle('is-active')
}

export const toggleTransparentBackground = (element) => {
    element.style.toggle({background: "transparent"})
}


const navigationOptions = [
    {link: "/office", name: "Office"},
    {link: "/reception", name: "Reception"},
    {link: "/controlroom", name: "Control Room"},
    {link: "/resetprogress", name: "[REDACTED]"},
    {link: "/test", name: "[test]"},
]

function App() {
    return (
        <div id={"main-application"}>
            <nav className="navbar is-dark top-bar engraved is-boxed">
                <div className="navbar-brand">
                    <div className="navbar-item is-flex">
                        <a href={"/"} className={"radiation-hazard fill-container"}></a>
                    </div>
                </div>
                <div className="navbar-menu has-text-centered">
                    <div className="navbar-start">
                        <div className={`navbar-item has-dropdown is-hoverable`}>
                            <a className="navbar-link navigation-option-button">
                                Navigate
                            </a>
                            <div className="navbar-dropdown has-transparent-background engraved">
                                {navigationOptions.map(element =>
                                    <Link className="navbar-item navigation-option-button"
                                          onClick={toggleActive}
                                          key={uuid()}
                                          to={element.link}>
                                        {element.name}
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className={"navbar-item navigation-option-button"} id={"where-am-i"}>
                            {navigationOptions.find((it) =>
                                it.link === window.location.pathname)?.name || "Prypiat"}
                        </div>
                    </div>
                    <div className={"navbar-end"}>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>

    );
}

export default App;
