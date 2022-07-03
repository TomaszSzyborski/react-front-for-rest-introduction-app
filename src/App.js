import './App.css';
import {BrowserRouter, Link, Redirect, Route, Outlet, StaticRouter} from "react-router-dom";

import radioActiveIcon from './assets/images/radioactiveBasic.png'
import Home from "./routes/home";
import Information from "./routes/information";
import ControlRoom from "./routes/controlroom";
import ResetProgress from "./routes/resetprogress";
import Reception from "./routes/reception";

export const toggleActive = (element) => {
    element.classList.toggle('is-active')
}

export const toggleTransparentBackround = (element) => {
    element.style.toggle({background: "transparent"})
}

function App() {


    return (
        <div id={"main-application"}>
            <nav className="navbar is-dark top-bar engraved is-boxed">
                <div className="navbar-brand">
                    <div className="navbar-item"
                         onClick={(element) => {
                             toggleTransparentBackround(element)
                         }}
                    >
                        <Link className="navbar-item"
                              onClick={toggleActive}
                              to="/home">
                            <img src={radioActiveIcon}
                                 className={"radiation-hazard"}
                                 alt={"${just_chernobyl_things}"}
                            />
                        </Link>
                    </div>
                </div>

                <div className="navbar-menu has-text-centered">
                    <div className="navbar-start">

                        <div className={`navbar-item has-dropdown is-hoverable`}>
                            <a className="navbar-link navigation-option-button">
                                Navigate
                            </a>
                            <div className="navbar-dropdown ivory-background engraved">

                                <Link className="navbar-item navigation-option-button"
                                      onClick={toggleActive}
                                      to="/information">
                                    Information
                                </Link>
                                <Link className="navbar-item navigation-option-button"
                                      onClick={toggleActive}
                                      to="/reception">
                                    Reception
                                </Link>
                                <Link className="navbar-item navigation-option-button"
                                      onClick={toggleActive}
                                      to="/controlroom">
                                    Control Room
                                </Link>
                                <Link className="navbar-item navigation-option-button"
                                      onClick={toggleActive}
                                      to="/resetprogress">
                                    [REDACTED]
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>

    );
}

export default App;
