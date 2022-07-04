import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import AsyncSelect from "react-select/async";

const welcomeText = "Busy night, Comrade, let's proceed with the test. Open the Control room, please..."

const optionsInTheRoom = [
    {value: 'rods', label: 'Reactor Rods Control Panel'},
    {value: 'analysis', label: 'Reactor Core Analysis'},
    {value: 'az5', label: 'AZ-5 Button'},
    {value: 'core', label: 'Corridor to Turbine Hall'},
]

const flag = '${nosey_chaps_arent_ya!}'

export default function ControlRoom() {
    const [mainText, setMainText] = useState(welcomeText)
    const [key, setKey] = useState("")
    const [text, setText] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
                <div>
                    {mainText}
                </div>
                <div>
                    {text}
                </div>

            </div>
            <div>
                Remember to keep they key with you, wherever you're going.
                <input id={"key"} type={"text"}
                       value={key}
                       onChange={e => setKey(e.target.value)}></input>
            </div>
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
            <div id={"view"}></div>
        </main>
    );
}