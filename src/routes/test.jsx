import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import radioActiveIcon from "../assets/images/radioactiveBasic.png";
import bulmaSlider from "bulma-extensions/bulma-slider/src/js";
import bulmaQuickview from "bulma-extensions/bulma-quickview/src/js";
import Switch from "react-switch";
import {show} from "bulma-extensions/bulma-carousel/src/js/utils/css";

;

export default function Test() {
    useEffect(() => {
        bulmaQuickview.attach()
        // bulmaSlider.attach()
    },)
    return (
        <main>
            <div className="field">
                <input id="switchColorDefault" type="checkbox" name="switchColorDefault" className="switch"
                       onChange={(e) => e.target.classList.toggle("checked")}
                ></input>
                <label htmlFor="switchColorDefault">Switch default</label>
            </div>
            <div className>


                <form>
                    <input className="switch is-danger" id="s" type="checkbox" name="s"

                           onChange={(e) => e.target.classList.toggle("checked")}/>
                    <label htmlFor={"s"}> Switch danger</label>

                </form>
            </div>
            <div>
                <div id="quickviewDefault" className={"quickview "}>
                    <header className="quickview-header">
                        <p className="title">Quickview title</p>
                        <span className="delete" data-dismiss="quickview"></span>
                    </header>

                    <div className="quickview-body">
                        <div className="quickview-block">
                            ...
                        </div>
                    </div>

                    <footer className="quickview-footer">

                    </footer>
                </div>

                <button className="button is-primary"
                        data-show="quickview"
                        data-target="quickviewDefault"
                        // onClick={(element) => {
                        //     const cl = window.document.body.getElementsByClassName("quickview")[0]
                        //         .classList
                        //     console.log(cl)
                        //     if(cl.contains("is-active")){
                        //         cl.remove("is-active")
                        //     // } else {
                        //     //     cl.add("is-active")
                        //     }
                        // }
                        // }
                    >
                    Show
                    quickview
                </button>
            </div>
            <div className="bd-snippet-preview is-light has-background-info ">
                <div className="field">

                    <input id="switchRoundedOutlinedDanger" type="checkbox"
                           className="switch is-rounded is-danger"
                        // checked={false}
                    />
                    <label htmlFor="switchRoundedOutlinedDanger"></label>
                </div>
            </div>
        </main>
    );
}