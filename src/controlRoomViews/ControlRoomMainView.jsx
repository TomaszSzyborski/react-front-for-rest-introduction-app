import axios from "axios";
import {useKey} from "../utils/contexts/keyContext";
import {useState} from "react";
import {useSubView} from "../utils/contexts/controlRoom/subViewContext";
import {Button, Grid, Input, Typography} from '@mui/material'
import { TextareaAutosize } from '@mui/base';

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
            <div className={"retro-text"}>
                {welcomeText}
                <div>
                    <span>Remember to keep they key with you, wherever you're going.</span>
                    <Grid size="2">
                        <Grid item>
                            <Input id={"key"}
                                className="has-retro-text"
                                   sx={{width: "38vw"}}
                                   placeholder={"Place your key here..."}
                                   value={key}
                                   onChange={e => setKey(e.target.value.trim())}/>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                className="has-retro-text"
                                onClick={unlockSubViews}>
                                Unlock the room
                            </Button>
                        </Grid>
                    </Grid>
                    <div className={"retro-text"}>
                            {text}
                    </div>
                </div>
            </div>
        </div>
    )
}