import axios from "axios";
import {useState} from "react";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";


export default function Analysis() {
    const {key} = useKey()
    const {setMessage} = useModal()

    const pressAnalysis = () => {
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
                    msg = `${response.data.message} ${response.data.flag}`
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
            <div className={"columns "}>
                <div className={"column"}></div>
                <div className={"column has-text-centered"}>
                    <button className={"button is-primary has-retro-text"}
                            onClick={pressAnalysis}>
                        Perform Analysis
                    </button>
                </div>
                <div className={"column"}></div>
            </div>
        </div>
    )
}