import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import AsyncSelect from "react-select/async";

const welcomeText = "Busy night, Comrade, let's proceed with the test."

const optionsInTheRoom = [
    {value: 'rods', label: 'Reactor Rods Control Panel'},
    {value: 'analysis', label: 'Reactor Core Analysis'},
    {value: 'az5', label: 'AZ-5 Button'},
    {value: 'core', label: 'Corridor to Turbine Hall'},
]

const flag = '${nosey_chaps_arent_ya!}'

export default function ControlRoom() {
    const [mainText] = useState(welcomeText)
    const [key, setKey] = useState("")
    const [text, setText] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [internalsVisibility, setInternalsVisibility] = useState(false)

    useEffect(() => {
        const matched = text?.trim().match(/Hello (.*)\. What would you like to see?/g)
            setInternalsVisibility(!!matched)
        },
        [text])

    const changeCommanderView = () => {
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
                                            await changeCommanderView()
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
                                blurInputOnSelect={true}
                                onChange={() => {
                                    setIsMenuOpen(false)
                                }}
                                onFocus={() => setIsMenuOpen(true)}
                                onMenuClose={() => {
                                    changeCommanderView()
                                }}
                                onSelectResetsInput={false}
                                cacheOptions
                                defaultOptions={optionsInTheRoom}
                                isSearchable={true}
                                noOptionsMessage={() => flag}
                                placeholder={"Select control view"}
                            />
                        </div>
                        <div className={"column"}></div>
                        <div id={"view"}></div>
                    </div>
                }
            </div>
        </main>
    );
}