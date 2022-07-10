import axios from "axios";
import {useContext, useEffect, useRef, useState} from "react";
import Select from 'react-select'
import AsyncSelect from "react-select/async";
import {useKey, useModal} from "../utils/contexts";
// import {ModalContext} from "../utils/contexts";
// import {HandleContext, KeyContext, ModalContext} from "../utils/contexts";


export default function Az5() {
    const {key} = useKey()
    const {message, setMessage} = useModal()

    const pressAZ5 = () => {
        let msg = ""
        axios.put(
            `http://localhost:9011/challenge/reactor/${key}/control_room/az_5`,
            {pressed: true},
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': `application/json`
                },

            })
            .then(response => {
                    msg = (`${response.data.message} ${response.data.flag}`)
                }
            )
            .catch(error => {
                    msg = (error.response.data.message)
                }
            )
        setMessage(msg)
    }
    return (
        <div>
            <div className={"button"}
                 onClick={pressAZ5}>AZ-5
            </div>
        </div>
    )
}