import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import AsyncSelect from "react-select/async";


export default function Analysis(props) {
    const [text, setText] = useState("")
    const pressAZ5 = () => {
        axios.put(
            `http://localhost:9011/challenge/reactor/${props.key}/control_room/az_5`,
            {pressed: true},
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': `application/json`
                },

            })
            .then(response => {
                    debugger
                    setText(`${response.data.message} ${response.data.flag}`)
                }
            )
            .catch(error => {
                    setText(error.response.data.message)
                }
            )
    }
    return (
        <div>
            <div className={"button"}
                 onClick={pressAZ5}>Analysis
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}