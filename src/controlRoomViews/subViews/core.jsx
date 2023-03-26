import axios from "axios";
import {useState, useEffect} from "react";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import {Grid, Button, Modal, Box, Typography, Dialog} from '@mui/material';
import MessageModal from "../../utils/MessageModal";

export default function Core(props) {
    const {key} = useKey()
    const {message, setMessage} = useModal();

    useEffect( () => {
        checkTheCore()
    },[])

    const checkTheCore = async () => {
        let msg = ""
        await axios.get(
            `http://localhost:9011/challenge/reactor/${key}/reactor_core`,
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