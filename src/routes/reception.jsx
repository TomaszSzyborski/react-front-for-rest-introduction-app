import axios from "axios";
import {useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import {faker} from '@faker-js/faker/locale/uk';
import {keyLocalStorageItemName} from "../utils/constants";
import {Button, Grid, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { TextareaAutosize } from '@mui/base';


const greeting = "Evening, Comrade!\n" +
    "Let me fetch the keys, while you write your name in the workbook"

const alreadyAtWork = "Akimov, Aleksandr Fyodorovich\n" +
    "Baranov, Anatoly Ivanovich\n" +
    "Sitnikov, Anatoly Andreyevich\n" +
    "Toptunov, Leonid Fedorovych\n"

const fakeNames = () => {
    let people;
    people = Array(12).fill("")
        .map(() => {
                return `${faker.name.findName()}`
            }
        ).join("\n")
    return people
}


export default function Reception() {
    const [text, setText] = useState(greeting)
    const [name, setName] = useState("");
    const [key, setKey] = useState("");
    const [multitudeOfFakeSovietNames] = useState(fakeNames())
    useMemo(()=>{
        localStorage.setItem(keyLocalStorageItemName, key)
    },[key])
    const registerAtDesk = (event) => {
        event.preventDefault();
        setKey("")
        if (!name) {
            setText("Write your name in the Registrar Book down there, Comrade...")
        } else {
            axios.post(
                "http://0.0.0.0:9011/challenge/reactor/desk",
                {"name": name},
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': `application/json`
                    },
                })
                .then(response => {
                        setText(`Get your key from the tray, Commander ${name}...`)
                        setKey(response.data.key)
                    }
                ).catch(error =>
                setText(error.response.data.message)
            )
        }
    }
    return (
        <main>
            <Grid   height="30rem"
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    id="mainGrid">
                 <Grid item xs={2} id="obsolete-column-left"></Grid>
                 <Grid item xs={8} sx={{height:"100vh"}}>
                    <Typography id={"message"} className={"retro-text"}>
                        {text}
                    </Typography>
                    <Grid container
                        id="registrar"
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing="12"
                        >
                         <Grid item className={"registrar-pages"}>
                               <div>Day Shift</div>
                               <TextareaAutosize className={"textarea signature-area is-fullwidth readonly"}
                                         defaultValue={multitudeOfFakeSovietNames}>
                               </TextareaAutosize>
                         </Grid>
                         <Grid item className={"registrar-pages"}>
                            <div>Night Shift</div>
                                <TextareaAutosize
                                    className={"textarea signature-area is-fullwidth"}
                                    placeholder={alreadyAtWork}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                         </Grid>
                    </Grid>
                 </Grid>
                 <Grid item xs={2} id="obsolete-column-right"></Grid>
            </Grid>
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing="24">
                   <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className="retro-text"
                        name="Register"
                        onClick={registerAtDesk}>
                            Write in registrar book
                        </Button>
                             {key ?
                               <Grid
                                item
                                id={"tray"}
                                className="retro-text">
                                     <Grid item >Pick it up</Grid>
                                     <br/><br/>
                                     <Grid item
                                        sx={{
                                            fontSize: "4rem",
                                        }}>
                                         {key}
                                     </Grid>
                                     <br/><br/>
                                     <Grid item>Keep it safe, and always wih you!</Grid>
                                </Grid>
                             : null}
             </Grid>
        </main>
    )
        ;
}