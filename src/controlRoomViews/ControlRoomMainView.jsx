import {useKey} from "../utils/contexts/keyContext";
import {useState} from "react";
import {useSubView} from "../utils/contexts/controlRoom/subViewContext";
import {Button, Grid, Input, Typography} from '@mui/material'
import { TextareaAutosize } from '@mui/base';
import client from "client";

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
            await client.apiClient.get(`/challenge/reactor/check_key/${key}`)
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
    <main>
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item className={"retro-text"}>
                {welcomeText}
            </Grid>
            <Grid item className={"retro-text"}>
                Remember to keep they key with you, wherever you're going.
            </Grid>
            <Grid item>
                <Input id={"key"}
                       className="retro-text"
                       sx={{width: "60rem"}}
                       placeholder={"Place your key here..."}
                       value={key}
                       onChange={e => setKey(e.target.value.trim())}/>
            </Grid>
            <Grid item>
                <Button
                    sx={{width: "60rem"}}
                    variant="contained"
                    color="primary"
                    className="retro-text"
                    onClick={unlockSubViews}>
                    Unlock the room
                </Button>
            </Grid>
            <Grid className={"retro-text"}>
                    {text}
            </Grid>
        </Grid>
    </main>
    )
}