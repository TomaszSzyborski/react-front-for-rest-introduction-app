import axios from "axios";
import {useEffect, useRef, useState, createContext} from "react";

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Switch from "react-switch";
import powerDownSound from '../assets/sounds/powerDown.mp3'
import alertSound from '../assets/sounds/mgsAlert.mp3'
import wrongSound from '../assets/sounds/wrong.mp3'
import ReactorResetHandle from "../resetProgressParts/ReactorResetHandle";
import ReactorResetUnlock from "../resetProgressParts/ReactorResetUnlock";
import MessageModal from "../resetProgressParts/MessageModal";

const activeModalClasses = "is-active is-clipped"

export const KeyContext = createContext({
    key: "",
    setKey: () => {
    },
})

export const HandleContext = createContext({
        handleState: false,
        setHandleState: () => {
        }
    }
)

export const ModalContext = createContext({
        modalActive: false,
        setModalActive: () => {
        },
        message: "",
        setMessage: () => {
        }
    }
)


//TODO change it to be slider 1-100 think of something else for drag and drop handler

export default function ResetProgress() {
    const [key, setKey] = useState("")
    const [message, setMessage] = useState("")
    const [modalActive, setModalActive] = useState(false)
    const [handleState, setHandleState] = useState(false)

    const keyContextValue = {key, setKey};
    const handleContextValue = {handleState, setHandleState};
    const modalContextValue = {modalActive, setModalActive, message, setMessage};
    //TODO wydzielić flagę i axsiosa, połączyć kontekstem
    //"${[REDACTED]_of_[CLASSIFIED]_experimental_machine}"

    //     axios.get(`http://localhost:9011/challenge/reactor/${key}/reset_progress`)
    //     .then(response =>
    //         setMessage(response.data.message)
    //     )
    //     .catch(response =>
    //         setMessage(response.data.flag)
    //     ).finally(() => {
    //         setModalActive(activeModalClasses)
    //     }
    // )


    return (
        <main style={{padding: "1rem 0"}}>
            <KeyContext.Provider value={keyContextValue}>
                <ModalContext.Provider value={modalContextValue}>
                    <HandleContext.Provider value={handleContextValue}>
                        <ReactorResetUnlock/>
                        <div className={"spacer-one-tenth-height"}></div>
                        <div className={"columns"}>
                            <div className={"column is-four-fifths"}>
                                <ReactorResetHandle/>
                            </div>
                            <div className={"column"}>
                                <button className={"button is-warning is-large resetProgressButton"}
                                        onClick={() => {
                                            localStorage.clear()
                                            sessionStorage.clear()
                                            setMessage("Time Variance Branching merged and reset to 18:17:24 25-04-1986")
                                            setModalActive(activeModalClasses)
                                        }}>
                                    Reset<br/>Progress<br/>for<br/>Information<br/>Gathering
                                </button>
                            </div>

                        </div>
                        <MessageModal/>
                    </HandleContext.Provider>
                </ModalContext.Provider>
            </KeyContext.Provider>
        </main>
    )
}