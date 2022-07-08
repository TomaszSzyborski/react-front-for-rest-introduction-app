import {useContext} from "react";
import {HandleContext, KeyContext, ModalContext} from "../routes/resetprogress";
import axios from "axios";


export default function ReactorResetUnlock() {
    const {key, setKey} = useContext(KeyContext);
    const {setHandleState} = useContext(HandleContext);
    const {setModalActive, setMessage} = useContext(ModalContext);

    const activeModalClasses ="is-active is-clipped"

    const unlockHandle = async () => {
        if (key) {
            axios.get(`http://localhost:9011/challenge/reactor/check_key/${key}`)
                .then(response => {
                    setHandleState(true)
                    setMessage(`${response.data.message} ${response.data.flag}`)
                }).catch(response => {
                setHandleState(false)
                setMessage(response.response.data.message)
            })
        } else {
            setHandleState(false)
            setModalActive(activeModalClasses)
            setMessage("You have to unlock the handle first... With... you know... They key?")
        }
    }

    return (
        <form className={"field has-addons"} style={{
            margin: "0 auto",
            width: "50%",
            padding: "1rem"
        }}>
            <div className={"control"} style={{width: "30vw"}}>
                <input className="input" type="text" placeholder="Put your key here, Comrade..."
                       value={key}
                       onChange={e => setKey(e.target.value)}/>
            </div>
            <div className={"control"}>
                <a className={"button is-info"} onClick={unlockHandle}>
                    Unlock Timeline Lever
                </a>
            </div>
        </form>
    );
}
