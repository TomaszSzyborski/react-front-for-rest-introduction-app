import axios from "axios";
import {useEffect, useRef, useState, createContext, createElement, useContext} from "react";

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Switch from "react-switch";
import powerDownSound from '../assets/sounds/powerDown.mp3'
import alertSound from '../assets/sounds/mgsAlert.mp3'
import wrongSound from '../assets/sounds/wrong.mp3'
import ReactorResetHandle from "../resetProgressParts/ReactorResetHandle";
import ReactorResetUnlockHandle from "../resetProgressParts/ReactorResetUnlockHandle";
import MessageModal from "../resetProgressParts/MessageModal";
import ComradeStorageCleaner from "../resetProgressParts/ComradeStorageCleaner";
import {
    HandleContextProvider,
    KeyContextProvider,
    ModalContextProvider
} from "../utils/contexts";


export default function ResetProgress() {

    return (
        <main style={{padding: "1rem 0"}}>
            <KeyContextProvider>
                <ModalContextProvider>
                    <HandleContextProvider>
                        <ReactorResetUnlockHandle/>
                        <div className={"spacer-one-tenth-height"}></div>
                        <div className={"columns"}>
                            <div className={"column is-four-fifths"}>
                                <ReactorResetHandle/>
                            </div>
                            <div className={"column"}>
                                <ComradeStorageCleaner/>
                            </div>
                        </div>
                        {<MessageModal/>}
                    </HandleContextProvider>
                </ModalContextProvider>
            </KeyContextProvider>
        </main>
    )
}