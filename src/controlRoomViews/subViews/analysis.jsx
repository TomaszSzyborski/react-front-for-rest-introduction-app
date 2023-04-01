import {useState, useEffect} from "react";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import {Grid, Button, Modal, Box, Typography, Dialog} from '@mui/material';
import MessageModal from "../../utils/MessageModal";
import client from "client";


export default function Analysis() {
    const {key} = useKey()
    const {message, setMessage} = useModal();

   useEffect( () => {
        performAnalysis()
    },[])

    const performAnalysis = async () => {
        let msg = ""
        await client.apiClient.get(`/challenge/reactor/${key}/control_room/analysis`,
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
            <MessageModal/>
        </Grid>
    )
}