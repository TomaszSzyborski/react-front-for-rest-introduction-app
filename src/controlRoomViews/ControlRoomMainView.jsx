import axios from "axios";
import {useKey} from "../utils/contexts/keyContext";
import {useState} from "react";
import {useSubView} from "../utils/contexts/controlRoom/subViewContext";

const welcomeText = "Busy night, Comrade, let's proceed with the test."

export default function ControlRoomMainView() {
    const {key, setKey} = useKey()
    const {setInternalVisibility} = useSubView();

    const [text, setText] = useState("");

    const unlockSubViews = async () => {
        let unlockText = "";
        let visible = false;
        setText("")
        if (key === "") {
            unlockText = "Have you dropped the key somewhere?!"
        } else {
            await axios.get(`http://localhost:9011/challenge/reactor/check_key/${key}`)
                .then(_ => {
                    visible = true
                }).catch(error => {
                    unlockText = error.response.data.message
                })
        }
        await setInternalVisibility(visible)
        setText(unlockText)
    }


    return (
        <div>
            <div className={"has-retro-text has-text-centered is-size-3"}>
                {welcomeText}
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
                                    onClick={unlockSubViews}>
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
        </div>
    )
}