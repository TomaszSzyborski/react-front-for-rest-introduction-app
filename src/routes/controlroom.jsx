import axios from "axios";
import {Component, createElement, useContext, useEffect, useRef, useState} from "react";
import AsyncSelect from "react-select/async";
import Az5 from "../controlRoomViews/az5";
import Analysis from "../controlRoomViews/analysis";
import Rods from "../controlRoomViews/rods";
import Core from "../controlRoomViews/core";
import {KeyContextProvider, ModalContextProvider, useKey} from "../utils/contexts";

const welcomeText = "Busy night, Comrade, let's proceed with the test."
const noseyChapsArentYaFlag = '${nosey_chaps_arent_ya!}'


export const createOption = (text, ComponentClass, props = null) => {
    const item = ComponentClass(props)
    return {label: text, value: item}
}

export default function ControlRoom() {

    const [mainText] = useState(welcomeText)
    // const {key, setKey} = useKey()
    const [key, setKey] = useState("");
    const [text, setText] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [internalsVisibility, setInternalsVisibility] = useState(false)
    const [view, setView] = useState("");

    const optionsInTheRoom =
        [
            {value: Rods, label: "Reactor Rods Control Panel"},
            {value: Analysis, label: 'Reactor Core Analysis'},
            {value: Az5, label: 'AZ-5 Button'},
            {value: Core, label: 'Corridor to Reactor Hall'}
        ]
            .map((it) =>
                createOption(it.label, it.value, {key: {key}})
            )


    useEffect(() => {
            const matched = text?.match(/Hello, Comrade (.*)\. What would you like to see?/g)
            setInternalsVisibility(!!matched)
        },
        [text])

    const askForData = () => {
        if (key === "") {
            setText("Have you dropped the key somewhere?!")
        } else {
            axios.get(
                `http://localhost:9011/challenge/reactor/${key}/control_room`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': `application/json`
                    },
                })
                .then(response => {
                        setText(response.data.message)
                    }
                )
                .catch(error => {
                        setText(error.response.data.message)
                    }
                )
        }
    }


    return (
        <main style={{padding: "1rem 0"}}>
            <div>
                <div className={"has-retro-text has-text-centered is-size-3"}>
                    {mainText}
                    <div>
                        <span>Remember to keep they key with you, wherever you're going.</span>
                        <div className={"columns"}>
                            <div className={"column"}></div>
                            <div className={"column is-one-third"}>
                                <input id={"key"} type={"text"}
                                       className={"input"}
                                       placeholder={"Place your key here"}
                                       value={key}
                                       onChange={e => setKey(e.target.value.trim())}></input>
                                <button className={"button is-info"}
                                        onClick={async () => {
                                            await askForData()
                                        }}>
                                    Unlock the room
                                </button>
                            </div>
                            <div className={"column"}></div>

                        </div>
                        <div className={"has-retro-text is-size-2"}>
                            <div>
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
                {internalsVisibility &&
                    <div className={"columns"}
                         id={"control-room-internals"}>
                        <div className={"column"}></div>
                        <div className={"column"}>
                            <AsyncSelect
                                menuIsOpen={isMenuOpen}
                                blurInputOnSelect
                                onFocus={() => setIsMenuOpen(true)}
                                onMenuClose={() => {
                                    askForData()
                                }}
                                onSelectResetsInput={false}
                                onChange={
                                    (option) => {
                                        setIsMenuOpen(false)
                                        setView(option.value)
                                    }
                                }
                                defaultOptions={optionsInTheRoom}
                                isSearchable
                                noOptionsMessage={() => noseyChapsArentYaFlag}
                                placeholder={"Select control view"}
                            />
                        </div>
                        <div className={"column"}></div>
                    </div>
                }
            </div>
            <KeyContextProvider>
                <ModalContextProvider>
                    <div className="container" id={"view"}>
                        {internalsVisibility && view}
                        <button className={"button is-fullwidth"}></button>
                    </div>
                </ModalContextProvider>
            </KeyContextProvider>

        </main>
    );
}