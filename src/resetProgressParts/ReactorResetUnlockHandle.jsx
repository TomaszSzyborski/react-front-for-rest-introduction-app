import axios from "axios";
import {useKey} from "../utils/contexts/keyContext";
import {useModal} from "../utils/contexts/modalContext";
import {useHandle} from "../utils/contexts/reactorReset/resetReactorHandleContext";
import {Grid, Input, Button} from '@mui/material';


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
        <Grid container maxWidth direction="column" alignItems="center" className="retro-text">
            <Grid item>
                <Input
                sx={{width: "auto"}}
                className="retro-text"
                type="text"
                placeholder="Place your key here..."
                value={key}
                onChange={e => setKey(e.target.value)}/>
            </Grid>
            <Grid item>
                <Button
                 className="retro-text"
                 variant="contained"
                 onClick={unlockHandle}>
                    Unlock Timeline Lever
                </Button>
            </Grid>
        </Grid>
    );
}
