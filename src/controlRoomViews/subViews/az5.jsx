import axios from "axios";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";


export default function Az5() {
    const {key} = useKey()
    const {setMessage} = useModal()

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
            <div className={"columns "}>
                <div className={"column"}></div>
                <div className={"column has-text-centered is-maxed-within"}>
                        <div className={"button center is-1by1 is-large az-5"}
                             style={{ height:"50%", width:"50%"}}
                             onClick={pressAZ5}>
                            AZ-5
                        </div>
                </div>
                <div className={"column"}></div>
            </div>
        </div>
    )
}