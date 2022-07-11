import {useSubView} from "../utils/contexts/controlRoom/subViewContext";
import AsyncSelect from "react-select/async";
import {useState} from "react";
import Rods from "./subViews/rods";
import Analysis from "./subViews/analysis";
import Az5 from "./subViews/az5";
import Core from "./subViews/core";
import {createOption} from "../utils/constants";
import {useKey} from "../utils/contexts/keyContext";
import axios from "axios";


const noseyChapsArentYaFlag = '${nosey_chaps_arent_ya!}'


export default function ControlRoomSubView() {
    const {key} = useKey()
    const {subView, setSubView, internalVisibility} = useSubView()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [text, setText] = useState("")

    const askForData = () => {
        if (key === "") {
            setText("Have you dropped the key somewhere?!")
        } else {
            axios.get(
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
            {value: Rods, label: "Reactor Rods Control Panel"},
            {value: Analysis, label: 'Reactor Core Analysis'},
            {value: Az5, label: 'AZ-5 Button'},
            {value: Core, label: 'Corridor to Reactor Hall'}
        ]
            .map((it) =>
                createOption(it.label, it.value, {key: {key}})
            )

    return (internalVisibility &&
        <>
            <div className={"columns"}
                 id={"control-room-internals"}>
                <div className={"column"}></div>
                <div className={"column"}>
                    <AsyncSelect
                        menuIsOpen={isMenuOpen}
                        blurInputOnSelect
                        onFocus={() => setIsMenuOpen(true)}
                        onMenuClose={() => {
                            askForData()
                        }}
                        onSelectResetsInput={false}
                        onChange={
                            (option) => {
                                setIsMenuOpen(false)
                                setSubView(option.value)
                            }
                        }
                        defaultOptions={optionsInTheRoom}
                        isSearchable
                        noOptionsMessage={() => noseyChapsArentYaFlag}
                        placeholder={"Select control view"}
                    />
                </div>
                <div className={"column"}></div>
            </div>
            <div>
                <div className={"has-retro-text has-text-centered is-size-2"}>{text}</div>
                <div>{subView}</div>
            </div>
        </>
    )
}