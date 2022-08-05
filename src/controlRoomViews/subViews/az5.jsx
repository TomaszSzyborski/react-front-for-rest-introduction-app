import axios from "axios";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import {useRef} from "react";


export default function Az5() {
    const {key} = useKey()
    const {setMessage} = useModal()
    const modalRef = useRef();

    const pressAZ5 = async () => {
        let msg = ""
        await axios.put(
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
        await setMessage(msg)
    }
    return (
        <div>
            <div className={"columns "}>
                <div className={"column"}></div>
                <div className={"column has-text-centered is-maxed-within"}>
                    {/*<button className={" button az-5 has-retro-text"}*/}
                    {/*        onSubmit={pressAZ5}>*/}
                    {/*    AZ-5*/}
                    {/*</button>*/}
                    <div className={"button is-primary has-retro-text"}
                         ref={modalRef}
                            onClick={pressAZ5}>
                        AZ-5
                    </div>
                </div>
                <div className={"column"}></div>
            </div>
        </div>
    )
}