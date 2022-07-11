import axios from "axios";
import {useKey} from "../utils/contexts/keyContext";
import {useModal} from "../utils/contexts/modalContext";
import {useHandle} from "../utils/contexts/reactorReset/resetReactorHandleContext";


export default function ReactorResetUnlockHandle() {
    const {key, setKey} = useKey()
    const {setHandleDisabled} = useHandle()
    const {setMessage} = useModal();

    const unlockHandle = async () => {
        let handleMessage = "";

        if (key) {
            await axios.get(`http://localhost:9011/challenge/reactor/check_key/${key}`)
                .then(response => {
                    setHandleDisabled(false)
                    handleMessage = response.data.message
                }).catch(error => {
                    handleMessage = error.response.data.message
                })
        } else {
            handleMessage = "You have to unlock the handle first...\nWith... you know...?\nThe key?"
        }
        await setMessage(handleMessage)
    }

    return (
        <form className={"field has-addons"} style={{
            margin: "0 auto",
            width: "50%",
            padding: "1rem"
        }}>
            <div className={"control"} style={{width: "100%"}}>
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
