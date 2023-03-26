import {useSubView} from "../utils/contexts/controlRoom/subViewContext";
import AsyncSelect from "react-select/async";
import {useEffect, useState, render} from "react";
import Rods from "./subViews/rods";
import Analysis from "./subViews/analysis";
import Az5 from "./subViews/az5";
import Core from "./subViews/core";
import {createOption} from "../utils/constants";
import {useKey} from "../utils/contexts/keyContext";
import axios from "axios";
import {ModalContextProvider, useModal} from "../utils/contexts/modalContext";
import {Button, Grid, Input, Typography, Select} from '@mui/material'

const noseyChapsArentYaFlag = '${nosey_chaps_arent_ya!}'


export default function ControlRoomSubView() {
    const {key} = useKey()
    const {subView, setSubView, internalVisibility} = useSubView()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [text, setText] = useState("")
//     const [szmelc, setSzmelc] = useState(()=>null)

    useEffect(() => {
        if (internalVisibility) {
            setSubView(null)
        }
    }, [internalVisibility])

    const [option, setOption] = useState(null)
    useEffect(() =>{
        if (option) {
            const component = {
                "Reactor Rods Control Panel": <Rods/>,
                 'Reactor Core Analysis': <Analysis/>,
                 'AZ-5 Button': <Az5/>,
                 'Corridor to Reactor Hall': <Core/>,
            }[option.label]
            setSubView(
               component
            )
        }
        return () => {setSubView(null)}
    },[option])

    const askForData = async () => {
        if (key === "") {
            setText("Have you dropped the key somewhere?!")
        } else {
            await axios.get(
                `http://localhost:9011/challenge/reactor/${key}/control_room`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': `application/json`
                    },
                })
                .then(response => {
                        //TODO think of something when everything is good
                        // setText(response.data.message)
                    }
                )
                .catch(error => {
                        setText(error.response.data.message)
                    }
                )
        }
    }

    const optionsInTheRoom =
        [
            {label:'Reactor Rods Control Panel'},
            {label:'Reactor Core Analysis'},
            {label:'AZ-5 Button'},
            {label:'Corridor to Reactor Hall'},
        ]
//             .map((it) =>
//                 createOption(it.label, it.value, {key: {key}})
//             )

    return (internalVisibility &&
        <>
            <Grid container
                 direction="row"
                 justifyContent="center"
                 alignItems="center"
                id={"control-room-internals"}>
                <Grid item xs={4}>
                    <AsyncSelect
                        menuIsOpen={isMenuOpen}
                        blurInputOnSelect
                        onFocus={() => setIsMenuOpen(true)}
                        onMenuClose={async () => {
                            await askForData()
                        }}
                        onSelectResetsInput={false}
                        onChange={
                            (menuOption) => {
                                 setIsMenuOpen(false)
                                 setOption(menuOption)
                            }
                        }
                        defaultOptions={optionsInTheRoom}
                        isSearchable
                        noOptionsMessage={() => noseyChapsArentYaFlag}
                        placeholder={"Select control view"}
                    />
                </Grid>
            </Grid>
            <div>
                <ModalContextProvider>
                    <div className={"retro-text"}>{text}</div>
                    <div>{subView}</div>
                </ModalContextProvider>
            </div>
        </>
    )
}