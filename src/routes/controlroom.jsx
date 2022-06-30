import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'

const welcomeText = "Busy night, Comrade, let's proceed with the test. Open the Control room, please..."

const optionsInTheRoom = [
  { value: 'rods', label: 'Reactor Rods Control Panel' },
  { value: 'analysis', label: 'Reactor Core Analysis' },
  { value: 'az5', label: 'AZ-5 Button' },
  { value: 'core', label: 'Corridor to Turbine Hall' },
]

const flag = '${nosey_chaps_arent_ya!}'

export default function ControlRoom() {
    const [getMainText, setMainText] = useState(welcomeText)
    const [getKey, setKey] = useState("")
    const [getText, setText] = useState("")

    const changeCommanderView = () => {
        axios.get(
    `http://localhost:9011/challenge/reactor/${getKey}/control_room`,
    {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': `application/json`
                    },
                })
                .then(response => {
                        setKey(response.data.message)
                    }
                ).catch(error =>
                    setText(error.response.data.message)
            )
    }
      return (
            <main style={{padding: "1rem 0"}}>
                <div>
                    {getMainText}
                </div>
                <div>
                    Remember to keep they key with you, wherever you're going.
                    <input id={"key"} type={"text"}
                           value={getKey}
                           onChange={e => setKey(e.target.value)}></input>
                </div>
                <Select
                    onChange={changeCommanderView}
                    options={optionsInTheRoom}
                    isSearchable={true}
                    noOptionsMessage={() => flag}
                    placeholder={"Select control view"}
                />
                <view id={"view"}></view>
            </main>
        );
}