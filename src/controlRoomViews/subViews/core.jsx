import {useState, useEffect} from "react";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import {Grid, Button, Modal, Box, Typography, Dialog} from '@mui/material';
import MessageModal from "../../utils/MessageModal";
import gatewayToHell from "../../assets/images/catastrophy/gatewayToHell.gif"
import fieryDeath from "../../assets/sounds/fieryDeath.mp3"
import {useBlownUp} from "../../utils/contexts/blownUpContext";
import {playAudio, loopAudio, mute} from "../../utils/audioHandler"
import {reactorBackend} from "client";


const fieryDeathSound = new Audio(fieryDeath)

export default function Core(props) {
    const {key} = useKey()
    const {setMessage} = useModal();
    const {blownUp} = useBlownUp();


    useEffect(() => {
        if(blownUp){
            playAudio(fieryDeathSound)
        }
        checkTheCore()
        return () => {
            mute(fieryDeathSound)
        }
    },[])

    const checkTheCore = async () => {
        let msg = ""
        await reactorBackend.client.get(`/challenge/reactor/${key}/reactor_core`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': `application/json`
                },

            })
            .then(response => {
                const flag = response.data.flag
                const message = response.data.message
                if (flag) {
                    msg = `${response.data.message} ${response.data.flag}`
                } else {
                    msg = `${response.data.message}`
                }
              }
            )
            .catch(error => {
                    msg = (error.response.data.message)
                }
            )
            await setMessage(msg)
    }

    return (
        <Grid container alignItems="center" direction="column">
            <MessageModal
                onClick={async () => await mute(fieryDeathSound)}
                backgroundImage={blownUp? gatewayToHell: null}
            />
        </Grid>
    )
}