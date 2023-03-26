import axios from "axios";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import MessageModal from "../../utils/MessageModal";
import {useRef, useState, useEffect} from "react";
import {Grid, Button, Modal, Box, Typography, Dialog} from '@mui/material';

export default function Az5() {
    const {key} = useKey()
    const [seal, setSeal] = useState(true)
    const {setMessage} = useModal();

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
                    msg = `${error.response.data.message} ${error.response.data.flag}`
                }
            )
        await setMessage(msg)
    }
    return (
    <Grid container direction="column" alignItems="center">
        <Grid item>
            <Button
                 variant={"contained"}
                 className={"retro-text"}
                 onClick={()=>setSeal(false)}>
                Break the AZ-5 safety seal
            </Button>
        </Grid>
        <Grid item>
            <Button
                 disabled={seal}
                 variant={"contained"}
                 className={"retro-text"}
                 onClick={async () => {
                    await pressAZ5()
                 }}>
                AZ-5
            </Button>
        </Grid>
        <MessageModal/>
    </Grid>
    )
}