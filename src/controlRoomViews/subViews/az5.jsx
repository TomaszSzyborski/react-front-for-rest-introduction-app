import axios from "axios";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import {useBlownUp} from "../../utils/contexts/blownUpContext";
import MessageModal from "../../utils/MessageModal";
import {useRef, useState, useEffect} from "react";
import {Grid, Button, Modal, Box, Typography, Dialog} from '@mui/material';
// import geiger from '../../assets/sounds/geiger.mp3'
// import alarm from '../../assets/sounds/alarm.mp3'
// const geigerSound = new Audio(geiger)
// const alarmSound = new Audio(alarm)

export default function Az5() {
    const {key} = useKey()
    const [seal, setSeal] = useState(true)
    const {setMessage} = useModal();
    const {setBlownUp} = useBlownUp();


//     const playAudio = async (audio) => {
//         await new Promise(res => {
//             audio.play()
//             audio.onended = res
//         })
//     }
//
//     const loopAudio = async (audio) => {
//         await new Promise(res => {
//             audio.play()
//             audio.onended = () => audio.play()
//         })
//     }

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
        if (msg.includes('Do you taste metal')){
            setBlownUp(true)
//            playAudio(alarmSound)
//            loopAudio(geigerSound)
        }

        await setMessage(msg)
    }
    return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item>
            <Button
                 sx={{width:"60rem"}}
                 variant={"contained"}
                 className={"retro-text"}
                 onClick={()=>setSeal(false)}>
                Break the AZ-5 safety seal
            </Button>
        </Grid>
        <Grid item>
            <Button
                 sx={{width:"60rem"}}
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