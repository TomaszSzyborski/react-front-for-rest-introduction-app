import {useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import {faker} from '@faker-js/faker/locale/uk';
import {keyLocalStorageItemName} from "../utils/constants";
import {Button, Grid} from '@mui/material'
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { TextareaAutosize} from '@mui/base';
import {reactorBackend} from "client";

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
            setText("Write your name in the Registrar Book first, Comrade...")
        } else {
            reactorBackend.client.post("/challenge/reactor/desk",
                {"name": name},
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': `application/json`
                    },
                })
                .then(response => {
                        setText(`Here's your key, Comrade ${name}...`)
                        setKey(response.data.key)
                    }
                ).catch(error =>
                    setText(error.response.data.message)
            )
        }
    }
    return (
        <>
        <main id="reception">
            <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                 <Grid item xs={2} id="obsolete-column-left"></Grid>
                 <Grid item xs={8} sx={{height:"80%"}}>
                    <Grid container
                        id="registrar"
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing="24"
                        >
                         <Grid item className={"registrar-pages"} sx={{height:"70%"}}>
                               <div>Day Shift</div>
                               <TextareaAutosize disabled
                                    sx={{width:"80%"}}
                                    className={"signature-area"}
                                    defaultValue={multitudeOfFakeSovietNames}>
                               </TextareaAutosize>
                         </Grid>
                         <Grid item className={"registrar-pages"} sx={{marginLeft:"2rem", height:"70%"}}>
                            <Grid container direction="column">
                                <Grid item>Night Shift</Grid>
                                <Grid item>
                                    <TextareaAutosize
                                        minRows={12}
                                        className={"signature-area"}
                                        placeholder={alreadyAtWork}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={2} alignItems="flex-end">
                                   <Button
                                         variant="outlined"
                                         color="primary"
                                         name="Register"
                                         onClick={registerAtDesk}>
                                             Sign
                                  </Button>
                                </Grid>
                            </Grid>
                         </Grid>
                    </Grid>
                 </Grid>
                 <Grid item xs={2} id="obsolete-column-right">
                 </Grid>
            </Grid>
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Typography id={"message"} className={"retro-text"}>
                    {text}
                </Typography>
                     {key ?
                       <Grid item id={"tray"} className="retro-text">
                             <Grid item
                                sx={{
                                    fontSize: "4rem",
                                }}>
                                 {key}
                             </Grid>
                             <Grid item>Keep it safe, and always wih you!</Grid>
                        </Grid>
                     : null}
             </Grid>
        </main>
        <div id="reception-background" className="background"></div>
        </>
    )
        ;
}