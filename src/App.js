import './App.css';
import {Link} from "react-router-dom";

import {Outlet} from "react-router-dom";

import radioActiveIcon from './assets/images/radioactiveBasic.png'
import {useEffect, useState} from "react";

function App() {
    const toggleActive = (element) => {
        element.classList.toggle('is-active')
    }
    return (
        <div>
            <nav className="navbar is-transparent top-bar">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <img src={radioActiveIcon}
                             style={{width: "112", height: "112"}}/>
                    </a>
                </div>


                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="https://bulma.io/">
                            Home
                        </a>
                        <div className={`navbar-item has-dropdown is-hoverable`}>
                            <a className="navbar-link">
                                Navigate
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <Link className="navbar-item"
                                      onClick={toggleActive}
                                      to="/information">
                                    Information
                                </Link>
                                <Link className="navbar-item"
                                      onClick={toggleActive}
                                      to="/reception">
                                    Reception
                                </Link>
                                <Link className="navbar-item"
                                      onClick={toggleActive}
                                      to="/controlroom">
                                    Control Room
                                </Link>
                                <Link className="navbar-item"
                                      onClick={toggleActive}
                                      to="/resetprogress">
                                    [REDACTED] Machine
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
