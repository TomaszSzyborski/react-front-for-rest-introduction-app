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
import {useModal} from "../utils/contexts/modalContext";
import {Button, Grid, Input, Typography, Select} from '@mui/material'

const noseyChapsArentYaFlag = '${nosey_chaps_arent_ya!}'


export default function ControlRoomSubView() {
    const {key} = useKey()
    const {subView, setSubView, internalVisibility} = useSubView()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [text, setText] = useState("")

    useEffect(() => {
        if (internalVisibility) {
            setSubView(null)
        }
    }, [internalVisibility])

    const [option, setOption] = useState(null)
    useEffect(() =>{
        if (option) {
            setSubView(option.value)
        }
        return () => {setSubView(null)}
    },[option])

    const [subViewBackground, setSubViewBackground] = useState("controlRoomSubViewBackground")

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
            {value:<Rods/>, label:'Reactor Rods Control Panel'},
            {value:<Analysis/>, label:'Reactor Core Analysis'},
            {value:<Az5/>, label:'AZ-5 Button'},
            {value:<Core/>, label:'Corridor to Reactor Hall'},
        ]

    // ----------------------------------------------------------------
    //TODO think of setting subViewBackground by using default and options in rod/analysi/az5/core
    return (internalVisibility &&
        <>
        <div id={subViewBackground} className='background'/>
            <Grid container
                 direction="column"
                 justifyContent="center"
                 alignItems="center"
                 id={"control-room-internals"}>
                <Grid container justifyContent="center">
                    <Grid sx={{width: "60rem"}}>
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
                    <Grid item>
                        <Grid className={"retro-text"}>{text}</Grid>
                        <Grid>{subView}</Grid>
                    </Grid>
            </Grid>
        </>
    )
}