import './App.css';
import {BrowserRouter, Link, Redirect, Route, Outlet, StaticRouter} from "react-router-dom";

import radioActiveIcon from './assets/images/radioactiveBasic.png'
import Home from "./routes/home";
import Office from "./routes/office";
import ControlRoom from "./routes/controlroom";
import ResetProgress from "./routes/resetprogress";
import Reception from "./routes/reception";
import uuid from 'react-uuid'
import {useEffect, useMemo, useState} from "react";
import {keyLocalStorageItemName, toggleActive, trayOpeningsLocalStorageItemObject} from "./utils/constants";


const navigationOptions = [
    {link: "/office", name: "Office"},
    {link: "/reception", name: "Reception"},
    {link: "/controlroom", name: "Control Room"},
    {link: "/resetprogress", name: "[REDACTED]"},
    {link: "/test", name: "[test]"},
]

function App() {
    const [numberOfTrayOpenings, setNumberOfTrayOpenings] = useState(
        Number(localStorage.getItem(trayOpeningsLocalStorageItemObject.key)) || 0
    )
    const [trayText, setTrayText] = useState(0)
    const [whereAmI, setWhereAmI] = useState(null);
    const [isShown, setIsShown] = useState(false);
    useMemo(() => {
        setWhereAmI(navigationOptions.find((it) =>
            it.link === window.location.pathname)?.name || "Prypiat")
    }, [whereAmI]);

    useEffect(() => {
        //TODO fix number of tray openings in state
        if (Number(localStorage.getItem(trayOpeningsLocalStorageItemObject.key)) || numberOfTrayOpenings !== 0) {
            localStorage.setItem(trayOpeningsLocalStorageItemObject.key, numberOfTrayOpenings.toString())
        }

        const data = {
            1: "You've found my secret stash... ${random_scrap_discovery}\n",
            17: "You're really pertinacious, you know that? ${stubborn_as_a_donkey}\n"
        }

        let keyMessage = ""
        if(localStorage.getItem(keyLocalStorageItemName)){
            keyMessage = `Here's your key:\n ${localStorage.getItem(keyLocalStorageItemName)}`
        }
        const messageInStash = (data[numberOfTrayOpenings] || "")
            + (keyMessage || "")
        setTrayText(messageInStash)
    }, [numberOfTrayOpenings])

    return (
        <div id={"top-bar-component"}>
            <nav className="navbar is-dark top-bar engraved">
                <div className="navbar-brand">
                    <div className="navbar-item is-flex">
                        <a href={"/"} className={"radiation-hazard fill-container"}></a>
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <div className='navbar-item has-dropdown is-hoverable'
                         onMouseEnter={() => setIsShown(true)}>
                            <a className="navbar-link navigation-option-button has-custom-nav-style">
                                Navigate
                            </a>
                            {isShown && (
                            <div className="navbar-dropdown has-custom-nav-style has-text-centered">
                                {navigationOptions.map(element =>
                                    <Link className="navbar-item navigation-option-button is-size-3"
                                        onMouseEnter={(e) =>e.target.classList.add('is-active')}
                                        onMouseLeave={(e) =>e.target.classList.remove('is-active')}
                                          onClick={(event) =>{
                                                setWhereAmI(element.name)
                                                setIsShown(false)
                                          }}
                                          key={uuid()}
                                          to={element.link}>
                                        {element.name}
                                    </Link>
                                )}
                            </div>
                            )}
                        </div>
                        <div className={"navbar-item navigation-option-button has-text-centered has-background-transparent"}
                            id={"where-am-i"}>
                            {whereAmI}
                        </div>
                    </div>
                    <div className={"navbar-end navbar-item"}>
                        <div className={"radiation-hazard fill-container"}
                             data-target="quickviewDefault"
                             data-show="quickview"
                             onClick={() => {
                                 setNumberOfTrayOpenings(prevState => prevState + 1)
                             }
                             }>
                        </div>
                    </div>
                    <div>
                        <div id="quickviewDefault" className={"quickview"} data-dismiss="quickview">
                            <div className="quickview-body columns">
                                <div className={"column has-retro-text has-text-vertically-centered"}>
                                    <div>
                                        {trayText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
        ;
}

export default App;
